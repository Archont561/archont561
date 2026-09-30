---
id: github-data.ingestion-contract
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
depends_on:
  - content.catalog-model
  - platform.security-boundaries
---

# Public-data ingestion contract

## Current implementation

`scripts/scan-repos.ts` is the current ingestion boundary. It reads the public GitHub repository scope for `GITHUB_USER`, paginates up to ten 100-item pages, excludes forks and the profile repository by default, normalizes repository metadata, and writes `src/data/repos.json`. It attempts to download each OpenGraph image into `public/og/` and falls back to a remote URL when the download is unavailable. Direct API requests use an optional token only during the build; a `gh` CLI fallback is used when direct fetch fails.

The current scanner does not ingest package registries, READMEs, external documentation, editorial overlays or a durable last-good snapshot. Those remain future work covered by the proposed requirements below.

## Inputs and outputs

Inputs are an owner-approved public GitHub scope, selected package registries and curated mappings. Output is a validated snapshot compatible with [the catalog model](../content/content-model.md), with provenance and diagnostics.

## Requirements

- INGEST-001: Explicitly constrain publication to public data even when credentials can access more.
- INGEST-002: Paginate every list endpoint; do not assume the first page is complete.
- INGEST-003: Use build-time authentication only; never send credentials to the browser.
- INGEST-004: Normalize source data before merging editorial overrides.
- INGEST-005: Handle rate limits and transient failures with bounded retries and backoff.
- INGEST-006: Validate the complete candidate snapshot before promoting it.
- INGEST-007: Log counts and source failures without secret headers or response dumps.
- INGEST-008: Do not interpret imported text as instructions or executable code.

## Publication scope

Owned public repositories are the starting proposal. Organization membership, contributions, forks, archived repos, releases and gists need explicit inclusion policy. Private sources are excluded. "All my GitHub data" must not be interpreted as permission to publish everything a token can read.

## Failure behavior

An incomplete sync does not become the new authoritative snapshot silently. Preserve the last successful deployment and report the failure. Partial imports may only publish under an explicit, documented policy with visible freshness state.

## Acceptance

Test multi-page responses, missing READMEs, rate limits, expired credentials, private fixtures, duplicates, source deletion and incomplete registry data.
