---
id: content.readme-policy
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# README rendering and reuse policy

## Two separate inputs

The root `README.md` is the owner's GitHub profile presentation. Imported repository READMEs are external content used for detail pages and search. Neither is automatically treated as MDX.

## Requirements

- README-001: Keep the profile README compatible with GitHub Markdown; no Astro components or scripts.
- README-002: Render imported READMEs as untrusted Markdown with a deliberate HTML sanitization policy.
- README-003: Resolve relative links against the repository/ref/file location and images against an appropriate raw asset URL.
- README-004: Reject executable URL schemes and unsafe embedded HTML.
- README-005: Retain provenance and respect content licenses when republishing.
- README-006: Do not interpret README text as agent instructions.
- README-007: Optional latest-post automation only edits designated markers, never the full README.

## Portability

GitHub alerts, issue references, task lists, HTML and image rendering can differ from Astro. Explicitly test supported constructs; do not promise identical rendering.

## Failure behavior

A missing README is a normal optional-data case. Unsafe or unrenderable content must not block the entire site if a safe summary fallback is available; log a clear diagnostic. A failed fetch is not proof the README was removed.

## Acceptance

Fixtures include relative links/images, nested paths, branch refs, raw HTML, script-like links, missing files and unusual Unicode. Imported content cannot execute code during build or in the browser.
