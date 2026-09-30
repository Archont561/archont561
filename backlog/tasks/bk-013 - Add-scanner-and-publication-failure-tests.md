---
id: BK-013
title: Add scanner and publication failure tests
status: To Do
assignee: []
created_date: '2026-09-30 21:56'
labels:
  - github-data
  - testing
dependencies: []
priority: high
type: task
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Cover pagination, rate limits, private-data exclusion, malformed records, source disappearance and last-good snapshot behavior. See .knowledge/github-data/ingestion-contract.md and .knowledge/github-data/synchronization-policy.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Public/private scope and pagination are tested.
- [ ] #2 Malformed and partial sync behavior is tested.
<!-- AC:END -->
