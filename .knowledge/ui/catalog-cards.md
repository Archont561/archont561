---
id: ui.catalog-cards
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Catalog card presentation

## Current implementation

`src/components/RepoMosaic.astro` currently renders one responsive card per generated repository. Cards show the repository OpenGraph image, repository name, optional star count, description, language and up to three topics. Archived and template repositories receive a visible ribbon. The current primary link opens GitHub in a new tab; local detail pages and separate Repository/Docs/Package/Demo actions are not implemented.

The language filter is progressive enhancement implemented in the component script. It does not currently persist to the URL or use Pagefind.

## Card anatomy

Type badge → title → concise human summary → technologies/status → optional metrics → clearly named destinations. A local Details link is the primary action; Repository, Docs, Package and Demo are distinct secondary links.

## Requirements

- CARD-001: Reuse the same semantic card contract for initial and searched results.
- CARD-002: Never nest interactive links inside an all-card anchor.
- CARD-003: Missing metrics are omitted or labeled unknown, not shown as zero.
- CARD-004: Distinguish related entity types without repeating indistinguishable summaries.
- CARD-005: Keep title and description readable at narrow widths and increased text size.
- CARD-006: Use explicit link labels and visible keyboard focus.
- CARD-007: Avoid presenting stars as evidence of business outcome or authorship.

## Responsive behavior

Use a fluid grid with a usable single-column layout. Avoid fixed-height cards that clip content. Reserve image dimensions when images exist; images are optional rather than mandatory filler.

## Acceptance

Fixtures cover long names, scoped package names, no description, many tags, archived status, absent metrics and multiple links. Test at 200% text zoom and with keyboard navigation.
