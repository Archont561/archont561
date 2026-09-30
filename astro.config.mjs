// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import UnoCSS from "@unocss/astro";
import { webcore } from "webcoreui/integration";

// GitHub Pages project site for the repo `archont561/archont561`
// (the repo name isn't `archont561.github.io`, so it deploys under a sub-path).
const SITE = "https://archont561.github.io";
// Production (GitHub Pages project site) serves under /archont561; the local dev
// server serves at the root so the live preview isn't a 404.
const isDev = process.argv.includes("dev");
const BASE = isDev ? "/" : "/archont561";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  server: { host: true },
  vite: { server: { allowedHosts: true } },
  integrations: [
    UnoCSS({ injectReset: false }),
    webcore(),
    starlight({
      title: "archont561",
      description:
        "Portfolio of @archont561 — GIS, geospatial tooling, Rust & Python. A live mosaic of every public GitHub repository, built at deploy time.",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "archont561",
        replacesTitle: false,
      },
      favicon: "/favicon.svg",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/archont561" },
      ],
      customCss: ["./src/styles/webcore-tokens.css", "./src/styles/custom.css"],
      lastUpdated: true,
      pagination: false,
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Projects",
          items: [
            { label: "Repository mosaic", link: "/projects/mosaic/" },
            { label: "How the scan works", link: "/projects/how-it-works/" },
          ],
        },
        {
          label: "About",
          items: [{ label: "About me", link: "/about/" }],
        },
      ],
      components: {
        // Default to a dark colour scheme (design is dark-oriented).
        ThemeProvider: "./src/components/ThemeProvider.astro",
      },
      editLink: {
        baseUrl: "https://github.com/archont561/archont561/edit/main/",
      },
    }),
  ],
});
