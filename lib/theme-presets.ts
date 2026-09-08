import { SUPERNOVA_THEMES } from "@/constants/themes";
import type { ThemePreset } from "@/constants/themes";
import { RADIUS, SEMANTIC } from "@/constants/tokens";

/** O tema do Supernova, composto dos tokens; é o padrão do site. */
export const SUPERNOVA_THEME: ThemePreset = {
  attribution: null,
  cssVars: {
    dark: SEMANTIC.dark,
    light: SEMANTIC.light,
    theme: { radius: RADIUS.base },
  },
  dependencies: [],
  description:
    "O tema do Supernova: cinza neutro, azul para ação, raio de 6px. Gerado de constants/tokens.ts.",
  installUrl: "https://geistlabsds.vercel.app/r/supernova-theme.json",
  origin: "supernova",
  slug: "supernova",
  title: "Supernova",
};

export const THEMES: ThemePreset[] = [SUPERNOVA_THEME, ...SUPERNOVA_THEMES];

export const findTheme = (slug: string) =>
  THEMES.find((theme) => theme.slug === slug);
