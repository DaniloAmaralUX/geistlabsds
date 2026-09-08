import { PUBLIC_ORIGIN } from "@/constants/origin";

export const FALLBACK_SITE_ORIGIN = PUBLIC_ORIGIN;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "LAB / DESIGN",
  },
  DESCRIPTION: {
    LONG: "Fundamentos, componentes, blocos e temas com prévia real e código que entra no seu projeto pelo CLI do shadcn.",
    SHORT: "Fundamentos, componentes, blocos e temas",
  },
  KEYWORDS: [
    "design system",
    "lab design",
    "design engineering",
    "shadcn",
    "shadcn registry",
    "componentes",
    "blocos",
    "temas",
    "react",
    "next.js",
    "tailwindcss",
  ] as const,
  LOCALE: "pt-BR",
  NAME: "LAB / DESIGN",
  OG_IMAGE: `${baseUrl}/og`,
  REGISTRY: baseUrl,
  /** Identificador seguro para nomes de ferramenta, arquivos e chaves. */
  SLUG: "lab-design",
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};
