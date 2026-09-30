---
id: content.catalog-model
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Canonical catalog content model

## Ownership

This document owns entity semantics. Ingestion produces this model; search and UI consume it. A future executable schema in `src/content.config.ts` must implement this contract, not redefine it independently.

## Entity types

- `project`: a curated body of work; can group several repositories and packages.
- `repository`: a specific public source repository.
- `package`: a published artifact identified by registry and package name.
- `docs`: a documentation destination or locally authored documentation collection.

A related repository, package and project are distinct entities with explicit relationships, not accidental duplicate IDs.

## Proposed fields

| Field | Contract |
|---|---|
| `id` | Stable canonical ID; independent of display title |
| `type` | project / repository / package / docs |
| `slug` | Unique route segment within its route family |
| `title`, `summary` | Required display strings |
| `technologies`, `topics` | Normalized string arrays |
| `projectId` | Optional link to project entity |
| `relatedIds` | Existing entity IDs |
| `repositoryUrl`, `docsUrl`, `packageUrl`, `demoUrl` | Validated optional HTTPS URLs |
| `status` | maintained / experimental / archived / unknown |
| `featuredRank` | Optional editorial integer; lower comes first |
| `sourceUpdatedAt` | Optional UTC source activity timestamp, not proof of maintenance |
| `syncedAt` | UTC time of successful import |
| `stars`, `version` | Optional source facts; absent is not zero |
| `audience`, `problem`, `contribution`, `outcome` | Optional editorial narrative |
| `provenance` | Source identity and retrieval metadata |

## Requirements

- MODEL-001: Explicit authored overrides win over imported descriptions, never the reverse.
- MODEL-002: Imported and editorial data are stored separately and merged deterministically.
- MODEL-003: Preserve unknown values; never infer maintained status merely from recent commits.
- MODEL-004: Entity references resolve and IDs are unique.
- MODEL-005: Public URL fields reject executable schemes.
- MODEL-006: Stable IDs handle owner/registry namespaces and scoped package names.

## Failure behavior

Reject invalid records with actionable diagnostics. Do not silently truncate malformed entities. Source disappearance enters an explicit removal/review process.

## Acceptance

Schema tests cover duplicates, unknown statuses, missing optional metrics, scoped packages, related IDs, overrides and hostile URLs. These tests are planned, not yet present.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-001 task](../../backlog/tasks/bk-001%20-%20Confirm-the-canonical-catalog-model.md). This document remains the canonical source for the requirements and acceptance criteria.
