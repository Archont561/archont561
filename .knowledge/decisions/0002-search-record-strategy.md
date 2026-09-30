---
id: decision.0002
kind: decision
status: proposed
owner: maintainer
created_on: 2026-09-17
depends_on:
  - search.indexing-contract
verification:
  state: unverified
---

# ADR 0002 — Search record boundaries

## Status

Proposed; detail-page coverage and external documentation scope need approval.

## Context

The UI needs independently filterable cards. Indexing one page of cards does not inherently supply independent records for those cards.

## Proposed decision

Default to a local detail page per discoverable entity. Use explicit custom Pagefind records selectively for destinations where a local page has little value. Keep the listing page out of the catalog index to avoid duplicate results.

## Alternatives

An all-custom index provides flexibility but requires more custom indexing code. Page-level sub-results can surface headings but do not automatically provide the independent entity filter model required here.

## Consequences

Stable shareable pages and useful non-JS navigation, with more routes to generate. Avoid thin duplicated pages by enriching each with context and relationships or using a deliberate custom record.

## Approval needed

Which entities deserve local pages, catalog/global-search separation and whether external docs are fully ingested.

## Contracts

[Indexing](../search/indexing-contract.md), [content model](../content/content-model.md), [routes](../product/information-architecture.md).
