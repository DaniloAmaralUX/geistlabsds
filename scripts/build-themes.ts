/**
 * Gera, a partir de `constants/themes.ts`:
 * - `styles/palettes.css`: regras `:root[data-palette="<slug>"]` (claro) e
 *   `:root[data-palette="<slug>"].dark` (escuro) para trocar de tema ao vivo no site;
 * - `public/themes/<slug>.css`: um arquivo por tema no formato `:root { } .dark { }`,
 *   o mesmo que o shadcn, o tweakcn e o shadcn-theme-provider consomem.
 * Roda em `pnpm themes:build` (chamado por `dev` e `build`). Não edite os gerados.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { registryItemUrl } from "../constants/origin.ts";
import { SUPERNOVA_SHADCN_THEMES } from "../constants/themes.ts";
import type { ThemePreset, ThemeVars } from "../constants/themes.ts";
import { RADIUS, SEMANTIC } from "../constants/tokens.ts";

const root = join(import.meta.dirname, "..");

/**
 * Mesmo objeto de lib/theme-presets.ts, campo a campo; repetido aqui porque o
 * script roda no Node sem o alias @/. Mudou lá, mude aqui.
 */
const LAB_DESIGN_THEME: ThemePreset = {
  attribution: null,
  cssVars: {
    dark: SEMANTIC.dark,
    light: SEMANTIC.light,
    theme: { radius: RADIUS.base },
  },
  dependencies: [],
  description:
    "O tema do LAB / DESIGN: cinza neutro, azul para ação, raio de 6px. Gerado de constants/tokens.ts.",
  installUrl: registryItemUrl("lab-design-theme"),
  origin: "lab-design",
  slug: "lab-design",
  title: "LAB / DESIGN",
};

const THEMES: ThemePreset[] = [LAB_DESIGN_THEME, ...SUPERNOVA_SHADCN_THEMES];

/** Só cores e raio entram no CSS do site; fontes ficam com o site. */
const SITE_KEYS = new Set([
  "accent",
  "accent-foreground",
  "background",
  "border",
  "card",
  "card-foreground",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "destructive",
  "destructive-foreground",
  "foreground",
  "input",
  "muted",
  "muted-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "ring",
  "secondary",
  "secondary-foreground",
  "sidebar",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-ring",
]);

const lines = (vars: ThemeVars, filter?: (key: string) => boolean) =>
  Object.entries(vars)
    .filter(([key]) => (filter ? filter(key) : true))
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");

const siteBlock = (theme: ThemePreset) => {
  const radius = theme.cssVars.theme?.radius;
  const light = lines(theme.cssVars.light, (key) => SITE_KEYS.has(key));
  const dark = lines(theme.cssVars.dark, (key) => SITE_KEYS.has(key));

  return `:root[data-palette="${theme.slug}"] {
${radius ? `  --radius: ${radius};\n` : ""}${light}
}

:root[data-palette="${theme.slug}"].dark {
${dark}
}`;
};

const palettes = `/* Gerado por scripts/build-themes.ts a partir de constants/themes.ts. Não editar. */

${THEMES.map(siteBlock).join("\n\n")}
`;

writeFileSync(join(root, "styles/palettes.css"), palettes);

const themesDir = join(root, "public/themes");
mkdirSync(themesDir, { recursive: true });

for (const theme of THEMES) {
  const themeLevel = theme.cssVars.theme ? lines(theme.cssVars.theme) : "";
  const css = `/* ${theme.title} — gerado por scripts/build-themes.ts (LAB / DESIGN). Não editar. */
/* Formato: variáveis do shadcn em :root (claro) e .dark (escuro); serve ao shadcn-theme-provider. */

:root {
${themeLevel ? `${themeLevel}\n` : ""}${lines(theme.cssVars.light)}
}

.dark {
${lines(theme.cssVars.dark)}
}
`;
  writeFileSync(join(themesDir, `${theme.slug}.css`), css);
}

console.log(
  `themes: styles/palettes.css e public/themes/*.css (${THEMES.length} temas) atualizados`
);
