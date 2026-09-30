---
id: ui.research.integrations
kind: research
status: current
owner: maintainer
created_on: 2026-09-17
sources:
  - url: https://docs.astro.build/en/guides/integrations-guide/alpinejs/
    accessed_on: 2026-09-17
  - url: https://basecoatui.com/installation/
    accessed_on: 2026-09-17
  - url: https://webcoreui.dev/docs/astro
    accessed_on: 2026-09-17
  - url: https://github.com/Frontendland/webcoreui
    accessed_on: 2026-09-17
  - url: https://starwind.dev/docs/getting-started/
    accessed_on: 2026-09-17
  - url: https://unocss.dev/presets/wind4
    accessed_on: 2026-09-17
review:
  after: 2026-10-17
  triggers:
    - dependency-upgrade
verification:
  state: unverified
---

# UI integration research notes

## Findings from official pages/repository accessed in this conversation

- Astro documents an Alpine integration with an entrypoint for extension and automatic page-wide loading.
- The current Basecoat installation page documents its own runtime/controllers and standalone CSS bundles; older Alpine-based descriptions should not determine a new integration.
- Basecoat's source workflow is authored for Tailwind. Standalone compiled CSS is an alternative to investigate for UnoCSS coexistence.
- Webcore provides native Astro imports, Sass styling and setup options including reset/utility controls.
- Starwind documents native Astro components styled with Tailwind v4.
- UnoCSS Wind4 documents an integrated Tailwind-4-aligned reset and compatibility caveats.

## Recommendation, not decision

Begin with custom Astro cards and a single small search controller. Alpine is optional. Webcore is a candidate if multiple complex widgets are needed. Do not add both a UI controller library and Alpine to control the same widget.

## Not verified

No integration combination has been built or benchmarked. Package versions, CSS export paths, resets, browser requirements and Astro client-navigation lifecycle compatibility must be checked before adoption. Do not present this comparison as a measured performance ranking.
