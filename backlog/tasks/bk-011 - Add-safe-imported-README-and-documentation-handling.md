---
id: BK-011
title: Add safe imported README and documentation handling
status: To Do
assignee: []
created_date: '2026-09-30 21:56'
labels:
  - content
  - security
dependencies: []
priority: high
type: feature
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define sanitization, URL resolution, licensing and failure fallback before publishing external content. See .knowledge/content/readme-policy.md and .knowledge/platform/security-boundaries.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Unsafe HTML and URL schemes are rejected.
- [ ] #2 Relative links and images resolve safely.
<!-- AC:END -->
