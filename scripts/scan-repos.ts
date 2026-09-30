/**
 * scan-repos.ts — build-time GitHub repository scanner.
 *
 * Runs automatically before `astro build` / `astro dev` (see the `prebuild` and
 * `predev` scripts in package.json). It:
 *   1. Lists every public repository for the configured GitHub user.
 *   2. Downloads each repo's GitHub "social preview" (OpenGraph) image into
 *      `public/og/` so the mosaic is fully self-hosted on the deployed site.
 *   3. Writes normalized metadata to `src/data/repos.json`, consumed by the
 *      Astro components that render the mosaic.
 *
 * Network strategy (portable across CI and restricted sandboxes):
 *   - Repo listing: try native `fetch` first, fall back to the `gh` CLI.
 *   - OG images: try to download; if the host is unreachable, store the remote
 *     URL instead so the browser loads it directly (graceful degradation).
 *
 * Env:
 *   GITHUB_USER   GitHub login to scan          (default: "archont561")
 *   GITHUB_TOKEN  / GH_TOKEN  token for the API  (optional, raises rate limits)
 *   INCLUDE_FORKS "true" to include forked repos (default: false)
 *   INCLUDE_SELF  "true" to include the profile repo itself (default: false)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const USER = process.env.GITHUB_USER ?? "archont561";
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? "";
const INCLUDE_FORKS = process.env.INCLUDE_FORKS === "true";
const INCLUDE_SELF = process.env.INCLUDE_SELF === "true";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA_OUT = join(ROOT, "src/data/repos.json");
const OG_DIR = join(ROOT, "public/og");

interface RawRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  is_template?: boolean;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  default_branch: string;
}

export interface Repo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  issues: number;
  topics: string[];
  archived: boolean;
  isTemplate: boolean;
  updatedAt: string;
  pushedAt: string;
  createdAt: string;
  /** Path relative to the site (local file) or an absolute remote URL. */
  image: string;
  /** true when the OG image was downloaded and self-hosted. */
  imageLocal: boolean;
}

/** Deterministic-ish cache token so the OG URL changes when the repo updates. */
function ogToken(repo: RawRepo): string {
  const seed = `${repo.pushed_at}:${repo.full_name}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16).padStart(8, "0");
}

function ogUrl(repo: RawRepo): string {
  return `https://opengraph.githubassets.com/${ogToken(repo)}/${repo.full_name}`;
}

/** Try native fetch (works in CI); return null on any transport/cert failure. */
async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": `${USER}-portfolio-scanner`,
        Accept: "application/vnd.github+json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    });
    if (!res.ok) {
      console.warn(`  ! fetch ${url} -> HTTP ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`  ! fetch failed (${(err as Error).message.split("\n")[0]}); trying gh CLI`);
    return null;
  }
}

/** Fallback: use the authenticated `gh` CLI, which handles proxies/certs. */
function ghApi<T>(path: string): T | null {
  try {
    const proc = Bun.spawnSync(["gh", "api", path, "--paginate"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    if (proc.exitCode !== 0) {
      console.warn(`  ! gh api ${path} exited ${proc.exitCode}: ${proc.stderr.toString().trim()}`);
      return null;
    }
    const text = proc.stdout.toString().trim();
    // `gh --paginate` concatenates JSON arrays as `][` — merge them.
    const merged = text.replace(/\]\s*\[/g, ",");
    return JSON.parse(merged) as T;
  } catch (err) {
    console.warn(`  ! gh CLI unavailable: ${(err as Error).message}`);
    return null;
  }
}

async function listRepos(): Promise<RawRepo[]> {
  const perPage = 100;
  const collected: RawRepo[] = [];

  for (let page = 1; page <= 10; page++) {
    const path = `users/${USER}/repos?per_page=${perPage}&page=${page}&sort=pushed`;
    let batch = await fetchJson<RawRepo[]>(`https://api.github.com/${path}`);
    if (batch === null && page === 1) {
      // fetch path failed entirely; grab everything via gh in one shot.
      const all = ghApi<RawRepo[]>(`users/${USER}/repos?per_page=${perPage}&sort=pushed`);
      if (all) return all;
      batch = [];
    }
    if (!batch || batch.length === 0) break;
    collected.push(...batch);
    if (batch.length < perPage) break;
  }
  return collected;
}

async function downloadOg(repo: RawRepo): Promise<{ image: string; local: boolean }> {
  const url = ogUrl(repo);
  const outPath = join(OG_DIR, `${repo.name}.png`);
  try {
    const res = await fetch(url, { headers: { "User-Agent": `${USER}-portfolio-scanner` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 1000) throw new Error("suspiciously small image");
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buf);
    return { image: `og/${repo.name}.png`, local: true };
  } catch (err) {
    console.warn(`  · ${repo.name}: OG download skipped (${(err as Error).message.split("\n")[0]}); using remote URL`);
    return { image: url, local: false };
  }
}

async function main() {
  console.log(`\n[scan-repos] scanning public repositories for @${USER}…`);
  const raw = await listRepos();

  if (raw.length === 0) {
    console.warn("[scan-repos] no repositories returned — writing empty dataset.");
  }

  const filtered = raw
    .filter((r) => INCLUDE_FORKS || !r.fork)
    .filter((r) => INCLUDE_SELF || r.name.toLowerCase() !== USER.toLowerCase())
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

  console.log(`[scan-repos] ${raw.length} fetched → ${filtered.length} after filtering. Resolving OG images…`);

  const repos: Repo[] = [];
  for (const r of filtered) {
    const { image, local } = await downloadOg(r);
    repos.push({
      name: r.name,
      fullName: r.full_name,
      description: r.description ?? "",
      url: r.html_url,
      homepage: r.homepage && r.homepage.trim() ? r.homepage.trim() : null,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      issues: r.open_issues_count,
      topics: r.topics ?? [],
      archived: r.archived,
      isTemplate: Boolean(r.is_template),
      updatedAt: r.updated_at,
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
      image,
      imageLocal: local,
    });
  }

  const payload = {
    user: USER,
    generatedAt: new Date().toISOString(),
    count: repos.length,
    languages: [...new Set(repos.map((r) => r.language).filter(Boolean))].sort() as string[],
    repos,
  };

  await mkdir(dirname(DATA_OUT), { recursive: true });
  await writeFile(DATA_OUT, JSON.stringify(payload, null, 2) + "\n");

  const localCount = repos.filter((r) => r.imageLocal).length;
  console.log(
    `[scan-repos] wrote ${repos.length} repos to src/data/repos.json ` +
      `(${localCount} images self-hosted, ${repos.length - localCount} remote).\n`,
  );
}

main().catch((err) => {
  console.error("[scan-repos] fatal:", err);
  process.exit(1);
});
