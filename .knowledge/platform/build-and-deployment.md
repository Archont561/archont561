---
id: platform.build-deployment
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Build and GitHub Pages deployment

## Current pipeline

The implemented workflow is:

1. GitHub Actions checks out the repository and installs Bun dependencies with `bun install --frozen-lockfile`.
2. The workflow supplies `GITHUB_TOKEN` and `GITHUB_USER` to the build.
3. The `prebuild` lifecycle invokes `scripts/scan-repos.ts`.
4. Astro/Starlight generates static output under `dist/`.
5. The Pages artifact is uploaded and deployed by `actions/deploy-pages`.

The workflow runs for pushes and pull requests to `main`, has a scheduled weekly run, supports manual dispatch, and uses deployment concurrency controls. Pagefind indexing is not currently part of the pipeline.

## Proposed pipeline

Install locked dependencies → sync or select a validated snapshot → Astro build → Pagefind index → static integrity/search tests → upload Pages artifact → deploy.

## Repository distinction

The GitHub profile repository `<Nick>/<Nick>` can also host a project Pages site, typically under `https://<Nick>.github.io/<Nick>/`. A user-site repository `<Nick>/<Nick>.github.io` uses the root URL. Custom domains alter the final configuration. Actual identity and repository choice must be confirmed before generating production URLs.

## Requirements

- DEPLOY-001: Configure Pages to deploy through GitHub Actions.
- DEPLOY-002: Pin a chosen toolchain and use frozen-lockfile installation once a lockfile exists.
- DEPLOY-003: Build the search index into the published artifact after HTML generation.
- DEPLOY-004: Test under the actual base path, not only localhost root.
- DEPLOY-005: Restrict workflow permissions per job; do not grant ingestion secrets to untrusted PR code.
- DEPLOY-006: Use deployment concurrency controls and preserve the last successful site on failures.
- DEPLOY-007: Keep generated build outputs out of source control unless explicitly required.

## Verification matrix

Root-path fixture; `/Nick/` fixture; custom-domain configuration if selected; missing search index; sync failure; internal asset/link check; private-data fixture scan.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-007 task](../../backlog/tasks/bk-007%20-%20Verify-and-pin-the-future-search-deployment-toolchain.md). This document remains the canonical source for the requirements and acceptance criteria.
