---
name: portfolio-development
description: Develop and maintain the archont561 Astro + Starlight portfolio (the self-updating GitHub repo mosaic site). Use when adding pages or components, changing styling, editing the repo-scan build step, adjusting theming, capturing screenshots, or deploying. Triggers on tasks touching astro.config.mjs, uno.config.ts, scripts/scan-repos.ts, RepoMosaic, Starlight content, or the GitHub Pages workflow.
metadata:
  author: archont561
  version: "1.0.0"
---

# Developing the archont561 portfolio

This is an **Astro + Starlight** portfolio, run with **Bun**, that builds a
**mosaic of every public GitHub repository** at deploy time and ships to
**GitHub Pages**. Styling is **UnoCSS**; a few UI primitives come from
**WebCoreUI**. This guide captures the architecture and the non-obvious rules
you must follow so changes don't regress.

## Commands

```bash
bun install          # install deps
bun run dev          # scan repos (predev) then start dev server at http://localhost:4321
bun run build        # scan repos (prebuild) then build to ./dist
bun run preview      # preview the production build
bun run scan         # re-scan GitHub -> src/data/repos.json (+ public/og images)
bun run tokens       # regenerate src/styles/webcore-tokens.css after upgrading webcoreui
bun run shots        # capture page screenshots to ./screenshots (auto-starts a dev server)
bun run skills        # the agent-skills CLI (list | find | add | update)
```

## Architecture map

| Path | Responsibility |
| --- | --- |
| `scripts/scan-repos.ts` | Prebuild GitHub scan → `src/data/repos.json` + `public/og/*.png` |
| `scripts/gen-tokens.ts` | Compile WebCoreUI Sass tokens → `src/styles/webcore-tokens.css` |
| `scripts/screenshots.mjs` | Headless-Chromium page snapshots (`bun run shots`) |
| `src/components/RepoMosaic.astro` | Renders the mosaic from `repos.json` (WebCoreUI + UnoCSS) |
| `src/components/ThemeProvider.astro` | Override that makes the site default to **dark** |
| `src/content/docs/` | Starlight pages: `index.mdx` (splash home), `projects/`, `about.md` |
| `src/lib/languageColors.ts` | Linguist-ish language → dot colour map |
| `astro.config.mjs` | Astro/Starlight/UnoCSS/WebCoreUI wiring, `site`/`base`, sidebar |
| `uno.config.ts` | UnoCSS presets, theme bridge to Starlight, shortcuts |
| `.github/workflows/deploy.yml` | Scan + build + deploy to GitHub Pages |

## ⚠️ Critical rules (don't regress these)

1. **UnoCSS reset must stay OFF.** In `uno.config.ts` use
   `presetWind4({ preflights: { reset: false } })`. Starlight ships its CSS in
   `@layer`; an *unlayered* UnoCSS reset overrides Starlight's responsive layout
   and collapses the desktop sidebar grid to the mobile stacked layout. If the
   whole site suddenly looks like content is hidden under the sidebar, this is why.

2. **No authored `.scss` files.** All styling is UnoCSS utilities + `src/styles/
   custom.css`. WebCoreUI's Sass stays only as its own build dependency; its
   `--w-*` design tokens are pre-compiled once to `src/styles/webcore-tokens.css`
   (regenerate with `bun run tokens`). The empty root `webcore.config.scss` is a
   mandatory WebCoreUI stub — leave it.

3. **`base` differs between dev and prod.** `astro.config.mjs` sets
   `base = process.argv.includes("dev") ? "/" : "/archont561"`. Dev serves at
   root (so the preview isn't a 404); production serves under `/archont561`
   (GitHub Pages project site). Therefore:
   - In components, resolve asset URLs with `import.meta.env.BASE_URL`.
   - In Markdown/MDX body links and Starlight hero `actions`, use **relative**
     links (e.g. `projects/mosaic/`, `../projects/mosaic/`) — Starlight does NOT
     prepend `base` to hero action links or raw Markdown links, but it DOES for
     sidebar entries.

4. **Dark by default.** `src/components/ThemeProvider.astro` seeds
   `localStorage['starlight-theme']='dark'` on first visit so both it and
   Starlight's `ThemeSelect` agree. Don't "fix" this back to system-follow unless
   you intend to change the default.

## The repo-scan pipeline

`package.json`'s `prebuild`/`predev` run `scripts/scan-repos.ts` before Astro:

- Lists public repos via the GitHub REST API, **falling back to the `gh` CLI**
  when `fetch` fails (cert/proxy sandboxes). Forks and the profile repo are
  filtered out by default.
- Downloads each repo's OpenGraph card from `opengraph.githubassets.com` into
  `public/og/`; if unreachable, stores the **remote URL** instead (the browser
  loads it directly).
- Writes normalized metadata to `src/data/repos.json` (git-ignored, regenerated).

Env: `GITHUB_USER` (default `archont561`), `GITHUB_TOKEN`/`GH_TOKEN` (rate limits;
CI provides it), `INCLUDE_FORKS`, `INCLUDE_SELF`.

## Common tasks

- **Add a docs page:** create a file under `src/content/docs/`, then add it to the
  `sidebar` in `astro.config.mjs`. Splash-style pages use `template: splash` +
  `hero:` frontmatter.
- **Change the mosaic look:** edit `src/components/RepoMosaic.astro`. It uses
  WebCoreUI `Badge`, `AspectRatio`, and a diagonal `Ribbon` (non-folded — the
  tile's `overflow-hidden` clips it into a clean corner banner; keep the class
  `tile-ribbon`). Grid columns are UnoCSS (`grid-cols-1 sm:grid-cols-2
  lg:grid-cols-3`), NOT WebCoreUI `Grid` (which can't do 1 column).
- **Restyle globally:** prefer UnoCSS utilities in markup; put unavoidable global
  rules in `src/styles/custom.css` (plain CSS only).
- **Verify visually:** `bun run shots` (light + dark, desktop). Set
  `PUPPETEER_EXECUTABLE_PATH` to use a system Chrome instead of the bundled one.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` scans, builds, and deploys to
GitHub Pages (weekly cron keeps the mosaic fresh). Ensure **Settings → Pages →
Build and deployment → GitHub Actions** is enabled. Always run `bun run build`
locally before shipping layout/config changes.
