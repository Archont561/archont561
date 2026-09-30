---
id: ui.interaction-accessibility
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Interaction and accessibility contract

## Baseline

Target WCAG 2.2 AA for relevant flows, subject to actual manual and automated assessment. This is a target, not a compliance claim.

## Requirements

- A11Y-001: Prefer native buttons, inputs, labels, fieldsets and details elements.
- A11Y-002: Every input has a persistent accessible label.
- A11Y-003: Filter groups expose names, selected state and clear reset behavior.
- A11Y-004: Search results announce status and do not unexpectedly steal focus.
- A11Y-005: Dialogs/menus, if introduced, implement keyboard/focus semantics rather than visual toggling alone.
- A11Y-006: Respect reduced motion; never encode state by color alone.
- A11Y-007: Essential navigation and initial catalog survive unavailable JavaScript.
- A11Y-008: Copy-to-clipboard actions confirm success/failure accessibly.

## Runtime guidance

Use small Astro scripts for isolated interactions. Alpine is an optional convenience for repeated local state, not an accessibility library. If using a UI library, let its controller own its widgets; do not also bind Alpine to the same stateful element.

## Acceptance

Keyboard-only, screen-reader spot checks, contrast checks, reduced motion, JS disabled and slow loading. Automated audits supplement but do not replace manual verification.
