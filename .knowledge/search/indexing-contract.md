---
id: search.indexing-contract
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
depends_on:
  - content.catalog-model
  - platform.build-deployment
---

# Pagefind indexing contract

## Current implementation boundary

Pagefind is not installed or invoked by the current build. There are no generated search records or search controller; the only discovery enhancement is the client-side language filter in `src/components/RepoMosaic.astro`.

## Record strategy

Propose one local detail page per independently discoverable item. Use custom Pagefind records only where a local page adds no value. A grid containing many cards is not automatically many independently filterable index records.

## Requirements

- IDX-001: Each catalog result has a stable item identity and destination.
- IDX-002: Index rendered editorial text plus approved README/documentation content.
- IDX-003: Exclude drafts, navigation noise, secret data and duplicate catalog listing content.
- IDX-004: Attach type, technology and status filters from canonical normalized fields.
- IDX-005: Attach card metadata and stable item ID, without duplicating entire HTML payloads.
- IDX-006: Generate indexes after Astro HTML generation.
- IDX-007: Load index assets and resolve result URLs under the configured base path.
- IDX-008: External documentation is linked by default until an ingestion/indexing scope is approved.

## Proposed separation

Use a catalog filter scope to prevent blog pages from appearing unexpectedly in Explore. A later global search can intentionally include both. Specify whether this is one index with scope filters or separate indexes before implementing.

## Failure behavior

A missing index produces a clear fallback linking the static catalog, not an empty silent interface. Fail CI if expected catalog entities are absent from the built index.

## Acceptance

Title search returns the correct entity; filters isolate it; a package and related repo remain distinct; draft/private fixtures never appear; `/Nick/` deployment resolves assets and destinations.

## References

[Pagefind research](research/pagefind.md). API compatibility still needs verification against the installed version.
