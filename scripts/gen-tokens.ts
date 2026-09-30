/**
 * gen-tokens.ts — regenerate src/styles/webcore-tokens.css
 *
 * WebCoreUI components reference `var(--w-*)` custom properties that are normally
 * emitted by its Sass `setup()` mixin. Since this project styles everything with
 * UnoCSS (no authored .scss), we compile *only* those design tokens to plain CSS
 * once and commit the result. Run `bun run tokens` after upgrading webcoreui.
 */
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "src/styles/webcore-tokens.css");
const webcoreScss = join(ROOT, "node_modules/webcoreui/scss/index.scss");

const tmp = await mkdtemp(join(tmpdir(), "wc-tokens-"));
// Empty config stub required by webcoreui's internal @use.
await writeFile(join(tmp, "webcore.config.scss"), "// stub\n");
const genScss = join(tmp, "gen.scss");
await writeFile(
  genScss,
  `@use '${webcoreScss}' as *;\n` +
    `@include setup((\n` +
    `  includeResets: false,\n` +
    `  includeUtilities: false,\n` +
    `  includeScrollbarStyles: false,\n` +
    `  includeTooltip: false,\n` +
    `  includeBreakpoints: false\n` +
    `));\n`,
);

const out = join(tmp, "tokens.css");
const proc = Bun.spawnSync(
  [
    "bunx",
    "sass",
    "--no-source-map",
    `--load-path=${tmp}`,
    `--load-path=${join(ROOT, "node_modules")}`,
    genScss,
    out,
  ],
  { stdout: "inherit", stderr: "inherit" },
);

if (proc.exitCode !== 0) {
  await rm(tmp, { recursive: true, force: true });
  throw new Error("sass compilation failed");
}

const css = await readFile(out, "utf8");
const header =
  "/* Auto-generated WebCoreUI design tokens (compiled from its Sass theme once).\n" +
  "   Do not edit by hand. Regenerate with: bun run tokens */\n";
await writeFile(OUT, header + css);
await rm(tmp, { recursive: true, force: true });
console.log(`[gen-tokens] wrote ${OUT}`);
