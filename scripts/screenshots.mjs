/**
 * screenshots.mjs — capture page snapshots of the portfolio.
 *
 * Usage:
 *   bun run shots                 # starts a dev server, screenshots, shuts it down
 *   bun run shots --base <url>    # screenshot an already-running server
 *   SHOTS_BASE=<url> bun run shots
 *
 * Chromium:
 *   - By default uses the bundled @sparticuz/chromium (works in CI/containers,
 *     no external download). Its shared libraries are extracted automatically.
 *   - Set PUPPETEER_EXECUTABLE_PATH=/path/to/chrome to use a system Chrome
 *     (recommended on macOS / when you already have Chrome installed).
 *
 * Output: PNGs in ./screenshots (override with --out <dir>).
 *
 * NOTE ON OG IMAGES: repo tiles load GitHub OpenGraph images from
 * opengraph.githubassets.com. When that host is unreachable (e.g. sandboxed CI),
 * requests are intercepted and a per-repo placeholder card is synthesized so the
 * mosaic still renders. Against the public internet the real images load.
 */
import { spawn, execFileSync } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import zlib from "node:zlib";

const require = createRequire(import.meta.url);

// ---- args ----
const argv = process.argv.slice(2);
const getArg = (flag) => {
  const i = argv.indexOf(flag);
  return i !== -1 ? argv[i + 1] : undefined;
};
const explicitBase = getArg("--base") || process.env.SHOTS_BASE;
const OUT = getArg("--out") || "screenshots";
const DEV_PORT = 4321;

// ---- pages to capture ----
const shots = [
  { name: "01-home", path: "/", full: true },
  { name: "02-mosaic", path: "/projects/mosaic/", full: true },
  { name: "03-mosaic-hover", path: "/projects/mosaic/", full: false, showOverlays: true },
  { name: "04-how-it-works", path: "/projects/how-it-works/", full: true },
  { name: "05-about", path: "/about/", full: true },
  { name: "06-home-dark", path: "/", full: true, dark: true },
  { name: "07-mosaic-dark", path: "/projects/mosaic/", full: true, dark: true },
];

function placeholderSvg(owner, repo) {
  let h = 0;
  for (let i = 0; i < repo.length; i++) h = (h * 31 + repo.charCodeAt(i)) % 360;
  const accent = `hsl(${h}, 70%, 55%)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1117"/><stop offset="1" stop-color="#161b22"/></linearGradient></defs>
    <rect width="1200" height="600" fill="url(#g)"/>
    <rect x="0" y="0" width="1200" height="10" fill="${accent}"/>
    <circle cx="90" cy="90" r="34" fill="none" stroke="${accent}" stroke-width="6"/>
    <text x="70" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#e6edf3">${repo}</text>
    <text x="72" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#8b949e">${owner}</text>
    <text x="72" y="540" font-family="monospace" font-size="24" fill="${accent}">github.com/${owner}/${repo}</text>
  </svg>`;
}

/** Extract @sparticuz/chromium's bundled shared libs and return the lib dir. */
async function extractChromiumLibs() {
  let brPath;
  try {
    brPath = require.resolve("@sparticuz/chromium/bin/al2023.tar.br");
  } catch {
    // Fall back to a known relative location.
    brPath = join(process.cwd(), "node_modules/@sparticuz/chromium/bin/al2023.tar.br");
  }
  if (!existsSync(brPath)) return null;
  const libDir = join(tmpdir(), "portfolio-chromium-libs");
  const marker = join(libDir, "lib", "libnss3.so");
  if (existsSync(marker)) return join(libDir, "lib");
  await mkdir(libDir, { recursive: true });
  const tarPath = join(libDir, "al2023.tar");
  await writeFile(tarPath, zlib.brotliDecompressSync(await readFile(brPath)));
  execFileSync("tar", ["xf", tarPath, "-C", libDir]);
  return join(libDir, "lib");
}

async function reachable(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function waitFor(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await reachable(url)) return true;
    await new Promise((r) => setTimeout(r, 800));
  }
  return false;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // Resolve the target base URL, starting a dev server if needed.
  let base = explicitBase;
  let devProc = null;
  if (!base) {
    base = `http://localhost:${DEV_PORT}`;
    if (!(await reachable(base))) {
      console.log("[shots] starting dev server…");
      devProc = spawn("bun", ["run", "dev", "--host", "0.0.0.0", "--port", String(DEV_PORT)], {
        stdio: "inherit",
        env: process.env,
      });
      if (!(await waitFor(base))) {
        devProc.kill("SIGTERM");
        throw new Error("dev server did not become ready in time");
      }
    }
  }
  console.log(`[shots] capturing ${base}`);

  // Resolve Chromium.
  const systemChrome = process.env.PUPPETEER_EXECUTABLE_PATH;
  const chromium = systemChrome ? null : (await import("@sparticuz/chromium")).default;
  if (!systemChrome) {
    const libDir = await extractChromiumLibs();
    if (libDir) {
      process.env.LD_LIBRARY_PATH = [libDir, tmpdir(), process.env.LD_LIBRARY_PATH]
        .filter(Boolean)
        .join(":");
    }
  }
  const puppeteer = (await import("puppeteer-core")).default;
  const executablePath = systemChrome || (await chromium.executablePath());
  const args = systemChrome
    ? ["--no-sandbox", "--disable-setuid-sandbox"]
    : [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"];

  const browser = await puppeteer.launch({ args, executablePath, headless: "shell" });

  try {
    for (const shot of shots) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
      if (shot.dark) {
        await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
      }
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (url.includes("opengraph.githubassets.com")) {
          const m = url.match(/opengraph\.githubassets\.com\/[^/]+\/([^/]+)\/([^/?]+)/);
          req.respond({
            status: 200,
            contentType: "image/svg+xml",
            body: placeholderSvg(m ? m[1] : "owner", m ? m[2] : "repo"),
          });
        } else {
          req.continue();
        }
      });

      await page.goto(base + shot.path, { waitUntil: "networkidle0", timeout: 60000 });
      await page.addStyleTag({ content: `astro-dev-toolbar{display:none !important}` });
      if (shot.showOverlays) {
        await page.addStyleTag({ content: `#mosaic-grid a > div{opacity:1 !important}` });
        await new Promise((r) => setTimeout(r, 400));
      }
      const file = join(OUT, `${shot.name}.png`);
      await page.screenshot({ path: file, fullPage: shot.full });
      console.log("[shots] saved", file);
      await page.close();
    }
  } finally {
    await browser.close();
    if (devProc) devProc.kill("SIGTERM");
  }
  console.log("[shots] done →", OUT);
}

main().catch((err) => {
  console.error("[shots] failed:", err);
  process.exit(1);
});
