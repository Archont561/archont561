---
id: governance.documentation-contract
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Knowledge document contract

## Purpose

Keep agent context navigable, attributable and honest about its status.

## Required frontmatter

Every knowledge Markdown file has `id`, `kind`, `status`, `owner`, and `created_on`. IDs are stable, lowercase, dot/hyphen-separated identifiers. Filenames may move without changing IDs; update links and manifests when moving files.

Supported kinds and statuses:

| Kind | Status values |
|---|---|
| index, context, runbook | active, archived |
| spec | proposed, accepted, deprecated |
| decision | proposed, accepted, superseded |
| research | current, needs-review, superseded |
| status | active, archived |

Optional fields: `depends_on` (IDs), `implementation` (path/state entries), `verification` (state/date/commit/evidence), `review` (after/triggers), `sources` (URL/access date), and `superseded_by` (ID). Do not introduce bespoke synonyms for existing fields.

## Ownership and authority

`owner: maintainer` is a role placeholder, not an identified person. An accepted specification defines intended behavior; code describes actual behavior. When they conflict, report the discrepancy and seek a decision. Do not silently choose one as proof the other is correct. Research never overrides an accepted contract.

## Content structure

Specifications state scope, requirements, failure behavior, acceptance criteria and open questions. Use stable requirement prefixes. Indexes link rather than duplicate. Context is compact orientation, not a complete spec. Research stays under its owning domain.

## Acceptance

- DOC-001: Every document passes the schema and link validator.
- DOC-002: Every cross-domain contract has a single owning location.
- DOC-003: Planned code paths are explicitly marked planned.
- DOC-004: Unresolved proposals remain visibly proposed.

## Updating

Update substantive content first, then metadata if evidence justifies it. Git history is the edit history; avoid maintaining a duplicate hand-written history in every file.

## Backlog boundary

Keep actionable work, approvals and research tasks in the repository `backlog/tasks/` directory managed by Backlog.md. Knowledge documents keep the durable contract, rationale and evidence. A backlog task should link to its owning knowledge document rather than copying requirements; when the task changes intended behavior, update the knowledge document first.
