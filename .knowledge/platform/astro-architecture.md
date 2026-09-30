---
id: platform.astro-architecture
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Astro application architecture

## Current implementation

The repository currently implements a smaller static site than the proposed catalog architecture below:

- `astro.config.mjs` configures Astro, Starlight, UnoCSS and WebCoreUI. It uses `/` in development and `/archont561` for the GitHub Pages project site.
- `src/content.config.ts` loads the Starlight `docs` collection from `src/content/docs/`.
- `scripts/scan-repos.ts` runs before development and production builds, producing `src/data/repos.json` and optional `public/og/` images.
- `src/components/RepoMosaic.astro` renders repository cards and a client-side language filter.
- `.github/workflows/deploy.yml` builds the static output and deploys it through GitHub Pages.

Pagefind, canonical project/package entities, editorial overlays and local repository detail routes are not implemented in the current codebase; the sections below describe future options.

## Proposed layers

1. External ingestion adapters.
2. Normalized snapshot and editorial content collections.
3. Astro routes/layouts/components rendering static HTML.
4. Pagefind build-time indexing.
5. Small browser controller for enhanced discovery.

## Planned structure

```text
src/content.config.ts
src/content/projects/
src/content/blog/
src/data/generated/
src/components/catalog/
src/layouts/
src/pages/
scripts/sync-github.ts
scripts/build-search.ts
```

These paths do not exist yet. Their presence in this document is not implementation evidence.

## Requirements

- ARCH-001: Static output; no production server is assumed on GitHub Pages.
- ARCH-002: Use Bun for dependency installation and scripts, committing its lockfile when created.
- ARCH-003: Add MDX only for reviewed source content.
- ARCH-004: Keep credentials and ingestion dependencies out of browser modules.
- ARCH-005: Use base-aware route and asset helpers consistently.
- ARCH-006: Lock and test compatible Astro, UnoCSS, Pagefind and optional integrations before declaring support.

## Runtime caveat

Bun package management does not prove every tool executes natively under Bun. Use a supported Node runtime for tools if their requirements demand it, and document the execution boundary. Validate Pagefind's installed indexing API/runtime before choosing its invocation.

## Acceptance

A clean install builds a static site from an approved fixture snapshot. No API secrets or backend runtime are required by visitors.
