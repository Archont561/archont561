---
id: search.context
kind: context
status: active
owner: maintainer
created_on: 2026-09-17
---

# Search context

## Owns

Index records, search metadata, filters, sorting and browser query state.

## Does not own

Upstream API synchronization, canonical entity definitions or brand styling.

## Working agreement

Read [the domain index](INDEX.md) and the target contract. Change the canonical owning document before adapting consumers. Flag cross-domain changes explicitly in the handoff. Proposals require maintainer approval before being treated as decisions.

## Project context

[Root context](../CONTEXT.md) is authoritative for established direction, current implementation and unresolved identity/deployment inputs. Specifications remain proposed unless their frontmatter says otherwise.

## Domain checks

One independently filterable record per discoverable item. Pagefind consumes rendered HTML or explicit custom records, not arbitrary cards on one page.
