---
id: ui.design-system
kind: spec
status: proposed
owner: maintainer
created_on: 2026-09-17
verification:
  state: unverified
---

# Design system and CSS ownership

## Established preference

UnoCSS supplies utilities rather than the Tailwind compiler. Actual Tailwind Preflight was requested. The exact preset and reset version must be chosen and locked during implementation.

## Requirements

- DESIGN-001: Use exactly one intended global reset; inspect third-party bundles for additional resets.
- DESIGN-002: Define shared colors, spacing, typography, radii and focus tokens before expanding components.
- DESIGN-003: Use static discoverable utility class strings; safelist only where justified.
- DESIGN-004: Give article content explicit typography after reset.
- DESIGN-005: Provide light/dark themes only if contrast and persistence behavior are tested.
- DESIGN-006: Avoid importing a UI framework merely for cards and checkboxes.

## Options requiring decision

Wind3 plus actual Tailwind Preflight preserves the earlier proposal. Wind4 can supply its own reset, but that changes the exact reset choice; disabling its reset allows an external one. Neither preset guarantees arbitrary Tailwind plugins/source libraries compile unchanged.

## Acceptance

Review prose, lists, code blocks, buttons, form fields and card borders after reset. Verify utility extraction in Astro and MDX. Test CSS ordering before adding third-party styles.

## References

[UI integration research](research/integrations.md). No dependency compatibility has been executed in this workspace.
