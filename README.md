<!--
  🎭 DUAL-AUDIENCE README
  This exact file is rendered in two places:
    • https://github.com/Archont561            → my profile card
    • https://github.com/Archont561/archont561 → the repository page
  GitHub serves the identical render to both pages (and proxies all images
  through Camo, so server-side tricks can't tell them apart either), so
  instead of swapping content the page is layered: profile intro first,
  repository docs below — with a router note that sends each audience
  straight to its section.
-->

<div align="center">

# 🗺️ Archont561

**GIS &amp; geospatial engineering — QGIS plugins, terrain tooling, and systems in Rust &amp; Python.**

This repository is my **GitHub profile card** *and* the source of a
self-updating portfolio that rebuilds a **mosaic of every public repository**
on each deploy.

[![Live site](https://img.shields.io/badge/live-archont561.github.io-ff5a03?style=for-the-badge&logo=githubpages&logoColor=white)](https://archont561.github.io/archont561/)
[![Profile](https://img.shields.io/badge/profile-github.com/Archont561-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Archont561)

![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![QGIS](https://img.shields.io/badge/QGIS-589632?logo=qgis&logoColor=white)
![R](https://img.shields.io/badge/R-276DC3?logo=r&logoColor=white)

</div>

> [!TIP]
> 🎭 **Two audiences, one README.**
>
> - 👋 **Browsing [my profile](https://github.com/Archont561)?** The short version is right below — [About me](#about-me).
> - 🛠️ **Here for the code?** Skip straight to the [repository docs](#repository-docs).

---

<a id="about-me"></a>

## 🧭 About me

*The profile-visitor short version — who I am and what I build.*

- 🗺️ **Geospatial first** — QGIS plugins, terrain tooling, and the data plumbing between them.
- 🦀 **Systems in Rust** · 🐍 **automation in Python** · 📊 **analysis in R**.
- ⚡ **Self-maintaining tooling** — even this profile is backed by a site that
  re-scans my public repositories on every deploy, so it never goes stale.
- 🌐 **See more** — [portfolio site](https://archont561.github.io/archont561/) ·
  [all repositories](https://github.com/Archont561?tab=repositories) · pinned repos below 👇

| | |
| --- | --- |
| 🌐 **Portfolio** | [archont561.github.io/archont561](https://archont561.github.io/archont561/) — a living mosaic of every public repo, regenerated on each deploy |
| 📦 **This repo** | Dual-purpose: my profile README **and** the source code of the portfolio site |
| 🛠️ **Docs for this repo** | [Jump to the technical docs ⤵](#repository-docs) |

---

<a id="repository-docs"></a>

## 📦 Repository docs — the portfolio site source

*Everything below is for people browsing the repository itself. 👋 Profile
visitors: you've seen the short version above — but you're welcome to keep
scrolling!*

> [!NOTE]
> You're looking at the source of **[archont561.github.io/archont561](https://archont561.github.io/archont561/)** —
> the same README that greets visitors on [my profile](https://github.com/Archont561).
> 👉 **[Visit the live site →](https://archont561.github.io/archont561/)**

<div align="center">

![Bun](https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![Starlight](https://img.shields.io/badge/Starlight-0.42-6D28D9?logo=astro&logoColor=white)
![UnoCSS](https://img.shields.io/badge/UnoCSS-66-333333?logo=unocss&logoColor=white)
![WebCoreUI](https://img.shields.io/badge/WebCoreUI-1.5-0ea5e9)
![Deploy](https://github.com/archont561/archont561/actions/workflows/deploy.yml/badge.svg)

</div>

### ✨ What this is

A portfolio site whose project list is **never hand-maintained**. A build step scans
the GitHub API for every public repo and renders each one's live **social-preview
image** into a filterable mosaic — so the site is always in sync with my work.

- 🧩 **Repository mosaic** — every tile is a repo's GitHub OpenGraph card.
- 🔎 **Filter by language** — Rust, Python, R, Astro, …
- ⚙️ **Self-updating** — regenerated on every deploy (and weekly via cron).
- ⚡ **Fast & static** — shipped as pre-rendered HTML to GitHub Pages.

### 🏗️ How the build works

```mermaid
flowchart LR
    A[bun run build] --> B[prebuild hook]
    B --> C[scan-repos.ts]
    C -->|GitHub REST API<br/>fetch → gh CLI fallback| D[List public repos]
    D --> E[Download OG images<br/>→ public/og/]
    E --> F[Write src/data/repos.json]
    F --> G[astro build]
    G --> H[RepoMosaic.astro<br/>WebCoreUI + UnoCSS]
    H --> I[Static site → GitHub Pages]
```

The `prebuild` npm lifecycle hook runs the scanner **before** Astro builds, so
`src/data/repos.json` and the OG images are always fresh when the site compiles.

### 🧰 Tech stack

| Layer            | Choice                                             |
| ---------------- | -------------------------------------------------- |
| Runtime / PM     | [Bun](https://bun.sh)                              |
| Framework        | [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) |
| Components       | [WebCoreUI](https://webcoreui.dev) (`Badge`, `AspectRatio`, `Ribbon`) |
| Styling          | [UnoCSS](https://unocss.dev) (WebCoreUI tokens pre-compiled to plain CSS) |
| Data source      | GitHub REST API (`fetch`, with `gh` CLI fallback)  |
| CI / Hosting     | GitHub Actions → GitHub Pages                      |

### 🚀 Local development

> [!TIP]
> Requires [Bun](https://bun.sh). In dev the site is served at the **root** (`/`);
> in production it's based under `/archont561` for the Pages project site.

```bash
bun install       # install dependencies
bun run dev       # scan repos, then start the dev server
bun run build     # scan repos, then build to ./dist
bun run preview   # preview the production build
```

Handy scripts:

```bash
bun run scan      # re-scan GitHub repos → src/data/repos.json
bun run tokens    # regenerate WebCoreUI design tokens (after upgrading webcoreui)
```

<details>
<summary>⚙️ <strong>Configuration (environment variables)</strong></summary>

<br/>

| Variable        | Default        | Purpose                                       |
| --------------- | -------------- | --------------------------------------------- |
| `GITHUB_USER`   | `archont561`   | Which GitHub login to scan.                   |
| `GITHUB_TOKEN`  | *(unset)*      | Raises API rate limits; provided by CI.       |
| `INCLUDE_FORKS` | `false`        | Set `true` to include forked repositories.    |
| `INCLUDE_SELF`  | `false`        | Set `true` to include this profile repo.      |

</details>

<details>
<summary>📁 <strong>Project structure</strong></summary>

<br/>

```text
.
├── scripts/
│   ├── scan-repos.ts     # prebuild: scan GitHub → repos.json + OG images
│   └── gen-tokens.ts     # compile WebCoreUI --w-* tokens to plain CSS
├── src/
│   ├── components/RepoMosaic.astro
│   ├── content/docs/     # Starlight pages (home, mosaic, about, how-it-works)
│   ├── data/repos.json   # generated (git-ignored)
│   ├── lib/languageColors.ts
│   └── styles/           # webcore-tokens.css (generated) + custom.css
├── public/og/            # generated OG images (git-ignored)
├── .github/workflows/deploy.yml
├── astro.config.mjs
└── uno.config.ts
```

</details>

### 🌐 Deployment

Pushing to `main` triggers **[the Pages workflow](.github/workflows/deploy.yml)**,
which runs the repo scan, builds with Astro, and deploys to GitHub Pages. A weekly
cron keeps the mosaic fresh even without new commits.

- [ ] Enable **Settings → Pages → Build and deployment → GitHub Actions**
- [x] Workflow, scanner, and site are ready to go

---

<div align="center">
<sub>🎭 One README, two audiences — <a href="#about-me">profile intro</a> · <a href="#repository-docs">repo docs</a> · <a href="https://archont561.github.io/archont561/">archont561.github.io/archont561</a></sub>
</div>
