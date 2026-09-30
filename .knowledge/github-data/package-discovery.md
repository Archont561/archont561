---
id: github-data.package-discovery
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

# Package discovery specification

## Scope

Discover published artifacts from explicitly selected registries and link them to repositories/projects. A repository alone is not proof of a published package.

## Requirements

- PKG-001: Configure registry, namespace and package ownership scope explicitly.
- PKG-002: Support one repository publishing multiple packages.
- PKG-003: Treat versions and release timestamps as registry facts.
- PKG-004: Distinguish unknown publication state from unpublished or removed.
- PKG-005: Build install instructions from trusted registry-specific templates, not arbitrary fetched shell text.
- PKG-006: Associate packages through validated metadata or explicit editorial mapping.

## Initial discovery strategy

Begin with an owner-supplied package allowlist. Add automated discovery once ownership and registry API behavior are verified. GitHub Packages, npm, PyPI and crates.io are possible sources, not approved integrations.

## Failure behavior

A registry outage must not relabel packages as deleted. Retain previous facts with provenance or fail publication according to the synchronization policy.

## Acceptance

Fixtures include scoped names, multi-package repos, missing repository links, prereleases and removed packages. Version ordering uses registry semantics rather than lexical sorting.

## Backlog reference

Open decisions and implementation work for this contract are tracked in [BK-004 task](../../backlog/tasks/bk-004%20-%20Choose-package-discovery-scope.md). This document remains the canonical source for the requirements and acceptance criteria.
