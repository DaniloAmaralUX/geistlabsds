export const FALLBACK_SITE_ORIGIN =
  "https://geistlabsds-danilos-projects-94eff717.vercel.app" as const;

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
    LONG: "O design system do LAB / DESIGN: fundamentos, componentes com demonstração interativa e código instalável pelo shadcn, com referência visual no Geist.",
    SHORT: "O nosso Geist",
  },
  KEYWORDS: [
    "design system",
    "lab design",
    "geist",
    "shadcn",
    "shadcn registry",
    "componentes",
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
