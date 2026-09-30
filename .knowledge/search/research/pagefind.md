---
id: search.research.pagefind
kind: research
status: current
owner: maintainer
created_on: 2026-09-17
sources:
  - url: https://pagefind.app/docs/indexing/
    accessed_on: 2026-09-17
  - url: https://pagefind.app/docs/filtering/
    accessed_on: 2026-09-17
  - url: https://pagefind.app/docs/node-api/
    accessed_on: 2026-09-17
review:
  after: 2026-10-17
  triggers:
    - dependency-upgrade
verification:
  state: unverified
---

# Pagefind research notes

## Findings from sources accessed in this conversation

- The indexing guide says multiple `data-pagefind-body` regions on one page are combined. A grid is not automatically an index of independent items.
- Filters are attached to indexed pages and can carry multiple values.
- The indexing API documents `addCustomRecord` with URL, content, language, metadata, filters and sort fields.

## Project implication

Prefer real detail pages for catalog entities. Consider custom records for useful external destinations. Keep rendered content available at build time.

## Not verified

No Pagefind package is installed here. Exact API types, Bun execution compatibility, filtering counts, sorting defaults and empty-query behavior require testing against the selected version. Search snippets and documentation are not a runtime compatibility test.
