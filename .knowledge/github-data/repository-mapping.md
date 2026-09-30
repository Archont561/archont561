---
id: github-data.repository-mapping
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

# Repository field mapping

## Current generated mapping

The current `Repo` interface in `scripts/scan-repos.ts` produces these fields:

| Generated field | Source or behavior |
|---|---|
| `name`, `fullName` | GitHub repository name and `owner/name` |
| `description` | GitHub description, normalized to an empty string when absent |
| `url`, `homepage` | GitHub URL and optional trimmed homepage URL |
| `language`, `topics` | GitHub primary language and topics |
| `stars`, `forks`, `issues` | GitHub repository counters |
| `archived`, `isTemplate` | GitHub repository flags |
| `updatedAt`, `pushedAt`, `createdAt` | GitHub timestamps |
| `image`, `imageLocal` | Downloaded `public/og/<name>.png` path or remote OpenGraph URL |

The generated data is a repository mosaic snapshot, not yet the canonical multi-entity catalog proposed below. In particular, it has no editorial override layer, stable detail-page ID, package relation, README body, or maintenance-status inference.

## Proposed mapping

| Source concept | Canonical destination |
|---|---|
| Stable repository identity | `id` or source ID within provenance |
| Owner/name | Namespace and repository URL |
| Description | Fallback `summary` |
| Topics | Normalized `topics` |
| Language data | `technologies` with documented normalization |
| Star count | `stars` |
| Archived flag | `status: archived` unless conflict requires review |
| Activity timestamp | `sourceUpdatedAt`, not a maintenance guarantee |
| README | Sanitized detail/search text |
| Homepage URL | Candidate link requiring classification/override |

## Requirements

- MAP-001: A homepage URL is not assumed to be documentation or a live demo.
- MAP-002: Keep source identity stable across display-name changes where possible.
- MAP-003: Preserve editorial titles, descriptions, outcomes and featured ranking.
- MAP-004: Explicitly classify forks rather than quietly hiding or attributing all work as original.
- MAP-005: Document which source timestamp is used; do not mix push, metadata-update and sync times.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-005 task](../../backlog/tasks/bk-005%20-%20Finalize-repository-ingestion-mapping.md). This document remains the canonical source for the requirements and acceptance criteria.

## Acceptance

Mapping fixtures preserve provenance, handle absent descriptions/languages, and never manufacture docs links or professional claims.
