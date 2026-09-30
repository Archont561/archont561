/**
 * Validate the repository knowledge base without adding a runtime dependency.
 *
 * Checks the document contract in .knowledge/governance/documentation-contract.md:
 * required frontmatter, supported kind/status pairs, unique IDs, dependency IDs,
 * and relative Markdown links.
 */

import { readdir } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname, ".knowledge");
const REQUIRED = ["id", "kind", "status", "owner", "created_on"] as const;
const KINDS = new Set(["index", "context", "runbook", "spec", "decision", "research", "status"]);
const STATUS_BY_KIND: Record<string, Set<string>> = {
  index: new Set(["active", "archived"]),
  context: new Set(["active", "archived"]),
  runbook: new Set(["active", "archived"]),
  spec: new Set(["proposed", "accepted", "deprecated"]),
  decision: new Set(["proposed", "accepted", "superseded"]),
  research: new Set(["current", "needs-review", "superseded"]),
  status: new Set(["active", "archived"]),
};

type Document = {
  path: string;
  id: string;
  kind: string;
  status: string;
  dependencies: string[];
};

const errors: string[] = [];
const documents: Document[] = [];

async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(path)));
    else if (entry.isFile() && extname(entry.name) === ".md") files.push(path);
  }
  return files.sort();
}

function frontmatter(path: string, source: string): { values: Map<string, string>; dependencies: string[] } | null {
  const lines = source.split(/\r?\n/);
  if (lines[0] !== "---") {
    errors.push(`${relative(process.cwd(), path)}: missing YAML frontmatter`);
    return null;
  }
  const end = lines.indexOf("---", 1);
  if (end === -1) {
    errors.push(`${relative(process.cwd(), path)}: unterminated YAML frontmatter`);
    return null;
  }

  const values = new Map<string, string>();
  for (const line of lines.slice(1, end)) {
    const match = /^(\w[\w-]*):\s*(.*?)\s*$/.exec(line);
    if (match) values.set(match[1], match[2].replace(/^['"]|['"]$/g, ""));
  }

  const dependencies: string[] = [];
  const dependencyStart = lines.findIndex((line) => line.trim() === "depends_on:");
  if (dependencyStart >= 0) {
    for (const line of lines.slice(dependencyStart + 1, end)) {
      const match = /^\s*-\s+(.+?)\s*$/.exec(line);
      if (!match) break;
      dependencies.push(match[1]);
    }
  }
  return { values, dependencies };
}

function checkLinks(path: string, source: string): void {
  const body = source.split(/^---$/m).slice(2).join("---");
  for (const match of body.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    const raw = match[1];
    if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(raw)) continue;
    let decoded: string;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      errors.push(`${relative(process.cwd(), path)}: malformed relative link ${raw}`);
      continue;
    }
    const target = decoded.split(/[?#]/, 1)[0];
    if (!target) continue;
    const candidate = resolve(dirname(path), target);
    const candidates = [candidate, join(candidate, "INDEX.md")];
    if (!candidates.some((item) => item === path || Bun.file(item).size > 0)) {
      errors.push(`${relative(process.cwd(), path)}: broken relative link ${raw}`);
    }
  }
}

async function main(): Promise<void> {
  let paths: string[];
  try {
    paths = await markdownFiles(ROOT);
  } catch {
    errors.push(".knowledge: directory does not exist");
    paths = [];
  }

  for (const path of paths) {
    const source = await Bun.file(path).text();
    const parsed = frontmatter(path, source);
    if (!parsed) continue;

    const values = parsed.values;
    for (const key of REQUIRED) {
      if (!values.get(key)) errors.push(`${relative(process.cwd(), path)}: missing frontmatter field ${key}`);
    }

    const id = values.get("id") ?? "";
    const kind = values.get("kind") ?? "";
    const status = values.get("status") ?? "";
    if (id && !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(id)) {
      errors.push(`${relative(process.cwd(), path)}: invalid id ${id}`);
    }
    if (kind && !KINDS.has(kind)) errors.push(`${relative(process.cwd(), path)}: unsupported kind ${kind}`);
    if (kind && status && (!STATUS_BY_KIND[kind] || !STATUS_BY_KIND[kind].has(status))) {
      errors.push(`${relative(process.cwd(), path)}: status ${status} is not valid for kind ${kind}`);
    }

    documents.push({ path, id, kind, status, dependencies: parsed.dependencies });
    checkLinks(path, source);
  }

  const ids = new Map<string, string>();
  for (const document of documents) {
    if (!document.id) continue;
    const previous = ids.get(document.id);
    if (previous) {
      errors.push(`duplicate id ${document.id}: ${relative(process.cwd(), previous)} and ${relative(process.cwd(), document.path)}`);
    } else ids.set(document.id, document.path);
  }
  for (const document of documents) {
    for (const dependency of document.dependencies) {
      if (!ids.has(dependency)) {
        errors.push(`${relative(process.cwd(), document.path)}: unknown dependency ${dependency}`);
      }
    }
  }

  if (errors.length) {
    console.error(`Knowledge check failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Knowledge check passed: ${documents.length} documents, ${ids.size} unique IDs.`);
}

await main();
