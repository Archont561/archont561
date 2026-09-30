// A small subset of GitHub's Linguist language colors, plus a deterministic
// fallback so every language gets a stable dot color.
const COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  R: "#198CE7",
  Go: "#00ADD8",
  Astro: "#ff5a03",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dockerfile: "#384d54",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Makefile: "#427819",
  TeX: "#3D6117",
  Lua: "#000080",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

export function languageColor(language: string | null | undefined): string {
  if (!language) return "#8b949e";
  if (COLORS[language]) return COLORS[language];
  // Deterministic HSL fallback derived from the language name.
  let h = 0;
  for (let i = 0; i < language.length; i++) h = (h * 31 + language.charCodeAt(i)) % 360;
  return `hsl(${h}, 55%, 55%)`;
}
