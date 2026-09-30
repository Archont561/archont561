---
id: search.filters-sorting
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

# Filters, sorting and query semantics

## Current implementation boundary

The current site has no Pagefind index, text query, sort control, URL state or combined filter model. `RepoMosaic.astro` provides only an in-memory language filter for the rendered repository list. The filter is not shareable through browser history.

The following filters and URL semantics are proposed future behavior, not current functionality.

## Proposed filters

| Key | Values |
|---|---|
| `type` | project, repository, package, docs |
| `technology` | Canonical technology labels |
| `status` | maintained, experimental, archived, unknown |
| `topic` | Optional normalized topics after usability review |

## Requirements

- FILTER-001: OR within a multi-select group, AND between groups unless explicitly changed.
- FILTER-002: Empty query supports browsing with filters; verify the installed Pagefind API's null/empty-query behavior.
- FILTER-003: Default browsing order is editorial featured order followed by a deterministic tie-breaker.
- FILTER-004: Nonempty search defaults to relevance; explicit sorting is visibly labeled.
- FILTER-005: Optional sorts include recent source activity and stars, with missing values handled explicitly.
- FILTER-006: Unknown and stale are not conflated with zero or archived.
- FILTER-007: Encode query, filters and sort in a documented shareable URL.

## URL proposal

`/explore/?q=markdown&type=package&technology=TypeScript&sort=relevance`

Use repeated parameters for multiple selected values. Normalize invalid values and preserve valid selections. Browser Back/Forward must restore state.

## Failure behavior

Unknown URL parameters do not crash search. A filter combination with zero results shows selected filters and a clear reset action.

## Acceptance

Test combined filters, multiple values, empty queries, unknown values, missing metrics and URL round-tripping. Verify Pagefind sorting behavior rather than sorting only an already truncated result page.
