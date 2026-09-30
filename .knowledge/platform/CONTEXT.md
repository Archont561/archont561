---
id: platform.context
kind: context
status: active
owner: maintainer
created_on: 2026-09-17
---

# Platform context

## Owns

Astro architecture, dependency execution, build, deployment and security.

## Does not own

Product positioning, project descriptions or registry-specific mappings.

## Working agreement

Read [the domain index](INDEX.md) and the target contract. Change the canonical owning document before adapting consumers. Flag cross-domain changes explicitly in the handoff. Proposals require maintainer approval before being treated as decisions.

## Project context

[Root context](../CONTEXT.md) is authoritative for established direction, current implementation and unresolved identity/deployment inputs. Specifications remain proposed unless their frontmatter says otherwise.

## Domain checks

Build for a static subpath deployment. Browser code uses relative/base-aware paths, never secrets or server-local URLs.
