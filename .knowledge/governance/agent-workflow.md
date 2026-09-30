---
id: governance.agent-workflow
kind: runbook
status: active
owner: maintainer
created_on: 2026-09-17
---

# Agent task and handoff workflow

## Before work

1. Read the [Backlog.md task directory](../../backlog/) to identify the actionable item, if one exists.
2. Read root context and route through the index.
3. Read owning domain context and target specification.
4. Follow dependency links only as needed.
5. Inspect actual files and installed versions; knowledge is not proof code exists.
6. Identify whether the task changes a proposal, accepted behavior or implementation only.

## During work

Maintain single-source ownership. Record new unknowns and ask for approval on scope, publication or identity decisions. Never promote a proposed decision merely because implementation would be convenient.

## Before handoff

Run applicable application checks and `bun run knowledge:check`. Distinguish executed checks from planned checks. Update impacted contracts if behavior changed. External-source access dates advance only when the source was actually checked.

## Handoff template

- Changed files and domain IDs:
- Behavior added/changed:
- Decisions requiring approval:
- Commands executed and observed outcomes:
- Unverified assumptions or failures:
- Documentation freshness impact:
- Next steps:

## Recovery

When documentation conflicts with implementation, report both with evidence. Do not fabricate missing tests or claim all tests passed when only structural knowledge validation ran.
