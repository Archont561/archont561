---
id: github-data.synchronization-policy
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

# Synchronization and freshness specification

## Proposed triggers

Run synchronization during an explicit refresh workflow, on approved deploy events, and on a schedule chosen by the owner. Daily is a candidate, not an established requirement. Provide manual dispatch for recovery.

## Requirements

- SYNC-001: Record per-source retrieval time and overall successful snapshot time.
- SYNC-002: Build from one coherent promoted snapshot, not concurrent partial writes.
- SYNC-003: Display a truthful data-refreshed label in Explore.
- SYNC-004: Cache or retain a last-good snapshot using an explicitly chosen persistence mechanism.
- SYNC-005: Do not rely on a workflow cache as the only durable source of truth.
- SYNC-006: Concurrent runs cannot deploy an older snapshot over a newer one unintentionally.

## Proposed stages

Fetch → normalize → validate → merge editorial overlays → validate relationships → atomically promote snapshot → build → index → test → deploy.

## Failure behavior

Fail closed on public/private scope violations and malformed required data. Preserve the prior deployed site on build or sync failure. Retry with bounded backoff; surface actionable source diagnostics.

## Acceptance

A forced mid-sync failure leaves the last-good snapshot unchanged. A fresh deployment reports the actual source snapshot time, not merely its build time.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-006 task](../../backlog/tasks/bk-006%20-%20Define-the-promoted-snapshot-and-freshness-policy.md). This document remains the canonical source for the requirements and acceptance criteria.
