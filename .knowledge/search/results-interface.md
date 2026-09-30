---
id: search.results-interface
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

# Catalog search controller contract

## Ownership

One controller owns query state and rendering. Use TypeScript/custom elements or Alpine, not two competing owners of the same result subtree. Final choice remains open.

## State

Query, selected filters, sort, loading/error state, result count, current visible window and request sequence. Initial HTML contains a useful static catalog. Client enhancement must not hide it before initialization succeeds.

## Requirements

- RESULT-001: Debounce typing; execute filter changes predictably.
- RESULT-002: Discard stale asynchronous results using a request sequence or equivalent.
- RESULT-003: Load result details progressively; avoid resolving every result on each keystroke.
- RESULT-004: Provide loading, failure, empty and successful states.
- RESULT-005: Announce result counts accessibly without interrupting every keystroke.
- RESULT-006: Support keyboard navigation, Clear all and Load more/pagination.
- RESULT-007: Preserve focus during updates and URL restoration.
- RESULT-008: Escape metadata; never inject arbitrary source HTML as trusted markup.

## Acceptance

Simulate slow searches and rapidly changing queries. Only the newest query renders. Disable JS to verify initial browsing. Force index failure, use keyboard-only navigation and restore a filtered view via browser history.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-008 task](../../backlog/tasks/bk-008%20-%20Design-the-search-controller.md). This document remains the canonical source for the requirements and acceptance criteria.
