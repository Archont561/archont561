---
id: product.information-architecture
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Information architecture

## Proposed routes

All paths below are relative to Astro's configured base path.

| Route | Purpose |
|---|---|
| `/` | Narrative introduction and selected work |
| `/explore/` | Unified catalog and filters |
| `/work/[slug]/` | Curated project narratives |
| `/repos/[slug]/` | Repository landing pages |
| `/packages/[slug]/` | Package landing pages |
| `/docs/[slug]/` | Documentation landing pages where useful |
| `/blog/`, `/blog/[slug]/` | Article listing and articles |
| `/about/` | Optional longer biography |

## Requirements

- IA-001: Navigation prioritizes Home, Explore and Blog; About is optional.
- IA-002: Entity URLs are stable and collision-safe across owners and registries.
- IA-003: Type-specific navigation links open filtered Explore views rather than duplicate catalogs.
- IA-004: Detail pages link related entities and external destinations explicitly.
- IA-005: Missing items have an intentional handling policy; do not emit broken detail links.

## Failure behavior

An unavailable external destination does not remove the local explanation. A renamed slug needs an explicit static redirect or retained alias strategy before publishing.

## Acceptance

Walk from homepage to a project, its repository, package and docs without ambiguous duplicate cards. Test navigation under `/Nick/`, not only `/`.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-003 task](../../backlog/tasks/bk-003%20-%20Decide-the-future-information-architecture.md). This document remains the canonical source for the requirements and acceptance criteria.
