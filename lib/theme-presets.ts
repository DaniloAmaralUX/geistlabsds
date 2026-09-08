import { registryItemUrl } from "@/constants/origin";
import { SUPERNOVA_SHADCN_THEMES } from "@/constants/themes";
import type { ThemePreset } from "@/constants/themes";
import { RADIUS, SEMANTIC } from "@/constants/tokens";

/** O tema do LAB / DESIGN, composto dos tokens; é o padrão do site. */
export const LAB_DESIGN_THEME: ThemePreset = {
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

export const THEMES: ThemePreset[] = [
  LAB_DESIGN_THEME,
  ...SUPERNOVA_SHADCN_THEMES,
];

export const findTheme = (slug: string) =>
  THEMES.find((theme) => theme.slug === slug);
