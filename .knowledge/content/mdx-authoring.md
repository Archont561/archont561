---
id: content.mdx-authoring
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# MDX authoring contract

## Current implementation

Starlight currently loads Markdown and MDX files from `src/content/docs/` through `docsLoader()` and `docsSchema()` in `src/content.config.ts`. Existing MDX uses reviewed local component imports such as `RepoMosaic` and Starlight components. This is trusted repository source, not imported GitHub content.

## Scope

MDX is proposed for trusted, locally reviewed project narratives and blog posts. Standard Markdown remains supported where no components are needed.

## Requirements

- MDX-001: Use Astro content collections to validate frontmatter.
- MDX-002: Link narratives to canonical entities by ID; do not duplicate imported metrics in prose automatically.
- MDX-003: Only trusted author-controlled files may execute MDX imports or expressions.
- MDX-004: Essential searchable content renders into HTML at build time.
- MDX-005: Editorial components have documented props and accessible HTML output.
- MDX-006: Use a dedicated typography wrapper for article prose, not the whole site.

## Proposed frontmatter

```yaml
title: "A project story"
description: "The problem this work solves."
entityId: "repository:Nick/my-tool"
pubDate: 2026-09-17
draft: true
```

This is illustrative; the executable collection schema must settle exact field names and date handling. Drafts must be excluded from production routes, feeds and indexes.

## Components

Start with callouts, project links, figures and related-work blocks. Interactive behavior is explicit; MDX itself is not a browser state framework. Component imports must be local/approved and pass the same review as application source.

## Acceptance

A trusted MDX page renders without unnecessary framework hydration, is indexed from its HTML, respects the base path and produces readable prose after the chosen reset.
