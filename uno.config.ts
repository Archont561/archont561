import { defineConfig, presetWind4, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    // NOTE: reset:false is important. Starlight ships its CSS inside @layer,
    // and an unlayered UnoCSS reset would override Starlight's responsive layout
    // (collapsing the desktop sidebar grid to the mobile stacked layout).
    presetWind4({ preflights: { reset: false } }),
    // Optional icon utilities (e.g. `i-mdi-github`) if collections are installed.
    presetIcons({ scale: 1.1, warn: false }),
  ],
  theme: {
    colors: {
      // Bridge to Starlight's accent so utilities and Starlight chrome agree.
      accent: "var(--sl-color-accent)",
      "accent-high": "var(--sl-color-accent-high)",
      "accent-low": "var(--sl-color-accent-low)",
    },
  },
  shortcuts: {
    // Reusable composition used across the mosaic + splash.
    "mosaic-chip":
      "inline-flex items-center gap-1.5 rounded-full border border-[var(--sl-color-gray-5)] bg-transparent px-3 py-1 text-sm cursor-pointer transition-colors hover:border-accent",
    "mosaic-chip-active": "border-accent bg-accent-low text-accent-high",
  },
});
