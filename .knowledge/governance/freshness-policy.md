---
id: governance.freshness-policy
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Freshness and verification policy

## Freshness model

Creation, source access, review, acceptance and implementation verification are different events. A recently edited file is not necessarily correct. Do not manufacture any of these events.

## Change-triggered review

| Changed area (planned application paths) | Review domains |
|---|---|
| `src/content.config.ts`, `src/content/**` | Content; Search for schema changes |
| `scripts/sync-github.ts` | GitHub data; Content; Platform security |
| `scripts/build-search.ts` | Search; Platform |
| `src/components/catalog/**` | UI; Search |
| `uno.config.ts`, global styles | UI; Content typography |
| `astro.config.mjs` | Platform; Search base paths |
| `.github/workflows/**` | Platform; GitHub data |
| `package.json`, `bun.lock` | Relevant integration research |

The validator performs structural checks and date warnings; it does not currently infer this change map from Git. PR authors must apply it manually.

## Scheduled reviews

External integration research starts with a 30-day review interval. API scope/deployment runbooks should be reviewed on dependency, permissions or workflow changes. Stable product intent does not need a ceremonial monthly edit. An overdue research item is a warning requiring review, not proof the fact is false.

## Verification evidence

Only use `verification.state: verified` after actual checks. Include `checked_on`, the implementation commit in `against_commit`, and evidence descriptions. Describe commands and observed outcomes in the body. A path to a test alone is not evidence of execution. This initial specification set is unverified against application code.

## Conflict procedure

1. Record the discrepancy and impacted IDs.
2. Preserve the last accepted behavior where practical.
3. Ask the maintainer when requirements or publication scope change.
4. Update the owning contract and consumers together.
5. Re-run relevant tests and structural validation.

## Acceptance

- FRESH-001: No date is advanced automatically to imply semantic review.
- FRESH-002: A dependency upgrade prompts review of affected integration research.
- FRESH-003: Handoffs state what was checked and what remains unverified.
