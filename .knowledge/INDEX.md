---
id: knowledge.index
kind: index
status: active
owner: maintainer
created_on: 2026-09-17
---

# Project knowledge index

## Start here

Read [CONTEXT.md](CONTEXT.md) for the product direction, confirmed implementation, proposals and unresolved inputs. Code and executed checks are the authority for implementation claims; specifications may describe future behavior.

## Domains

| Domain | Owns | Entry point |
|---|---|---|
| Knowledge governance | Document contracts, agent workflow, freshness and verification. | [governance](governance/INDEX.md) |
| Product | Audience, scope, information architecture and homepage narrative. | [product](product/INDEX.md) |
| Content | Documentation content, canonical catalog entities, editorial content and README handling. | [content](content/INDEX.md) |
| GitHub data | Public-data acquisition, normalization, repository mapping and refresh. | [github-data](github-data/INDEX.md) |
| Search | Proposed Pagefind records, filters, sorting and browser query state. | [search](search/INDEX.md) |
| User interface | Visual tokens, mosaic presentation, interaction and accessibility. | [ui](ui/INDEX.md) |
| Platform | Astro architecture, dependency execution, build, deployment and security. | [platform](platform/INDEX.md) |
| Decisions | Accepted and proposed architectural rationale. | [Decision log](decisions/INDEX.md) |

## Task routing

- Choose or sequence work → the [Backlog.md tasks](../backlog/); use the linked knowledge document as the contract.
- Homepage copy or positioning → Product.
- Starlight page or frontmatter change → Content and Product.
- Add or change repository ingestion → GitHub data and Platform security.
- Mosaic card, language filter or accessibility change → UI; Search if query/index behavior is introduced.
- Pagefind, filter ranking or URL state → Search; UI for presentation.
- Base path, build or deployment → Platform and Search.
- Change knowledge rules → Governance.

## Backlog boundary

`backlog/tasks/` contains actionable items only. The knowledge base contains durable context, requirements, decisions, research and verification evidence. Backlog tasks link to knowledge documents and must not copy their detailed requirements.

## Current implementation map

| Area | Source of truth |
|---|---|
| GitHub scan and generated repository data | `scripts/scan-repos.ts` and generated `src/data/repos.json` |
| Mosaic rendering and language filtering | `src/components/RepoMosaic.astro` |
| Documentation collection | `src/content.config.ts` and `src/content/docs/` |
| Astro, Starlight, base path and sidebar | `astro.config.mjs` |
| Deployment | `.github/workflows/deploy.yml` |
| Styling and tokens | `uno.config.ts`, `src/styles/custom.css`, `src/styles/webcore-tokens.css` |

## Core contracts

1. [Public ingestion](github-data/ingestion-contract.md)
2. [Homepage narrative](product/homepage-narrative.md)
3. [Build and deployment](platform/build-and-deployment.md)
4. [Catalog model](content/content-model.md) — proposed future model
5. [Search indexing](search/indexing-contract.md) — proposed future Pagefind model

## Maintenance

Run `bun run knowledge:check` from the repository root. See [freshness policy](governance/freshness-policy.md). Dates record actual activity; they do not imply approval, correctness or implementation.
