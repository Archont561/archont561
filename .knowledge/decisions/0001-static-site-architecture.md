---
id: decision.0001
kind: decision
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# ADR 0001 — Static portfolio and catalog architecture

## Status

Proposed. The user established Astro, GitHub Pages, Bun, UnoCSS and Pagefind preferences; the complete architecture below has not been approved as a package.

## Context

The site needs a personal narrative plus public-data discovery without a production backend.

## Proposed decision

Use build-time synchronization, a canonical catalog plus editorial overlays, Astro static generation and a Pagefind browser index. MDX is proposed for reviewed narratives. Keep the README Markdown-only.

## Alternatives

Live browser GitHub requests increase dependence on API availability and limits. A backend adds operations beyond GitHub Pages. A fully manual catalog minimizes ingestion complexity but does not meet broad browsing as well.

## Consequences

Fast static delivery and no visitor credentials; source data is only as fresh as the last successful sync. Build failures need explicit recovery and publication policy.

## Approval needed

Snapshot strategy, MDX adoption, runtime boundaries and actual identity/repository.

## Contracts

[Architecture](../platform/astro-architecture.md), [ingestion](../github-data/ingestion-contract.md), [catalog](../content/content-model.md).
