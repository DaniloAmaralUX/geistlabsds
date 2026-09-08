/**
 * Fonte única dos tokens do LAB / DESIGN.
 *
 * `styles/tokens.css` e o item `lab-design-theme` do `registry.json` são
 * gerados daqui por `scripts/build-tokens.ts` (roda no `build` e no `dev`).
 * As páginas de fundamentos leem estes valores para renderizar as escalas, então
 * o que se vê na documentação é o que o CSS entrega.
 *
 * Escalas de 100 a 1000, cinza neutro, uma cor por intenção. Os valores são
 * escolhas próprias em OKLCH.
 */

export type Mode = "light" | "dark";

export const STEPS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;
export type Step = (typeof STEPS)[number];

export const HUES = [
  "gray",
  "blue",
  "red",
  "amber",
  "green",
  "violet",
] as const;
export type Hue = (typeof HUES)[number];

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export const HUE_META: Record<
  Hue,
  { angle: number; label: string; role: string }
> = {
  amber: { angle: 72, label: "Âmbar", role: "Aviso e atenção" },
  blue: { angle: 258, label: "Azul", role: "Ação, foco e links" },
  gray: { angle: 0, label: "Cinza", role: "Superfícies, bordas e texto" },
  green: { angle: 148, label: "Verde", role: "Sucesso e confirmação" },
  red: { angle: 25, label: "Vermelho", role: "Erro e ação destrutiva" },
  violet: { angle: 295, label: "Violeta", role: "Destaque especial" },
};

/** Luminosidade por passo. No escuro a escala inverte: 100 é o mais escuro. */
const LIGHTNESS: Record<Mode, readonly number[]> = {
  dark: [0.2, 0.24, 0.28, 0.33, 0.42, 0.52, 0.64, 0.72, 0.8, 0.93],
  light: [0.97, 0.945, 0.915, 0.875, 0.8, 0.7, 0.6, 0.53, 0.45, 0.205],
};

/** Croma por passo: sobe até o meio-forte (700) e cai nos extremos. */
const CHROMA: Record<"color" | "gray", readonly number[]> = {
  color: [0.02, 0.045, 0.075, 0.105, 0.14, 0.175, 0.2, 0.19, 0.16, 0.1],
  gray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const round = (n: number, places = 3) =>
  Math.round(n * 10 ** places) / 10 ** places;

export const buildScale = (hue: Hue, mode: Mode): Oklch[] =>
  STEPS.map((_, index) => ({
    c: round(CHROMA[hue === "gray" ? "gray" : "color"][index] ?? 0),
    h: HUE_META[hue].angle,
    l: round(LIGHTNESS[mode][index] ?? 0),
  }));

export const SCALES: Record<Mode, Record<Hue, Oklch[]>> = {
  dark: Object.fromEntries(
    HUES.map((hue) => [hue, buildScale(hue, "dark")])
  ) as Record<Hue, Oklch[]>,
  light: Object.fromEntries(
    HUES.map((hue) => [hue, buildScale(hue, "light")])
  ) as Record<Hue, Oklch[]>,
};

export const oklchToCss = ({ l, c, h }: Oklch) => `oklch(${l} ${c} ${h})`;

export const scaleVar = (hue: Hue, step: Step) => `--ds-${hue}-${step}`;

const ref = (hue: Hue, step: Step) => `var(${scaleVar(hue, step)})`;

/** Valores que não pertencem a escala nenhuma. */
export const BASE: Record<Mode, { background: Oklch; foreground: Oklch }> = {
  dark: {
    background: { c: 0, h: 0, l: 0.13 },
    foreground: { c: 0, h: 0, l: 0.93 },
  },
  light: {
    background: { c: 0, h: 0, l: 1 },
    foreground: { c: 0, h: 0, l: 0.205 },
  },
};

/**
 * Tokens semânticos no vocabulário do shadcn, para que os componentes do
 * template e os consumidores que instalam o tema recebam o mesmo visual.
 * Cada valor é uma referência à escala (resolvida em literal para o registry).
 */
export const SEMANTIC: Record<Mode, Record<string, string>> = {
  dark: {
    accent: ref("gray", 200),
    "accent-foreground": ref("gray", 1000),
    background: oklchToCss(BASE.dark.background),
    border: ref("gray", 300),
    card: ref("gray", 100),
    "card-foreground": ref("gray", 1000),
    "chart-1": ref("blue", 500),
    "chart-2": ref("blue", 700),
    "chart-3": ref("green", 700),
    "chart-4": ref("amber", 700),
    "chart-5": ref("violet", 700),
    code: ref("gray", 100),
    "code-foreground": ref("gray", 900),
    "code-highlight": ref("gray", 300),
    "code-number": ref("gray", 600),
    destructive: ref("red", 700),
    foreground: oklchToCss(BASE.dark.foreground),
    input: ref("gray", 300),
    muted: ref("gray", 100),
    "muted-foreground": ref("gray", 800),
    popover: ref("gray", 100),
    "popover-foreground": ref("gray", 1000),
    primary: ref("gray", 1000),
    "primary-foreground": oklchToCss(BASE.dark.background),
    ring: ref("blue", 700),
    secondary: ref("gray", 200),
    "secondary-foreground": ref("gray", 1000),
    selection: ref("blue", 300),
    "selection-foreground": ref("gray", 1000),
    sidebar: oklchToCss(BASE.dark.background),
    "sidebar-accent": ref("gray", 200),
    "sidebar-accent-foreground": ref("gray", 1000),
    "sidebar-border": ref("gray", 300),
    "sidebar-foreground": ref("gray", 1000),
    "sidebar-primary": ref("blue", 700),
    "sidebar-primary-foreground": ref("gray", 1000),
    "sidebar-ring": ref("blue", 700),
    surface: ref("gray", 100),
    "surface-foreground": ref("gray", 900),
  },
  light: {
    accent: ref("gray", 200),
    "accent-foreground": ref("gray", 1000),
    background: oklchToCss(BASE.light.background),
    border: ref("gray", 400),
    card: oklchToCss(BASE.light.background),
    "card-foreground": ref("gray", 1000),
    "chart-1": ref("blue", 500),
    "chart-2": ref("blue", 700),
    "chart-3": ref("green", 700),
    "chart-4": ref("amber", 700),
    "chart-5": ref("violet", 700),
    code: ref("gray", 100),
    "code-foreground": ref("gray", 900),
    "code-highlight": ref("gray", 300),
    "code-number": ref("gray", 700),
    destructive: ref("red", 700),
    foreground: oklchToCss(BASE.light.foreground),
    input: ref("gray", 400),
    muted: ref("gray", 100),
    "muted-foreground": ref("gray", 900),
    popover: oklchToCss(BASE.light.background),
    "popover-foreground": ref("gray", 1000),
    primary: ref("gray", 1000),
    "primary-foreground": oklchToCss(BASE.light.background),
    ring: ref("blue", 700),
    secondary: ref("gray", 200),
    "secondary-foreground": ref("gray", 1000),
    selection: ref("blue", 200),
    "selection-foreground": ref("gray", 1000),
    sidebar: oklchToCss(BASE.light.background),
    "sidebar-accent": ref("gray", 200),
    "sidebar-accent-foreground": ref("gray", 1000),
    "sidebar-border": ref("gray", 400),
    "sidebar-foreground": ref("gray", 1000),
    "sidebar-primary": ref("blue", 700),
    "sidebar-primary-foreground": oklchToCss(BASE.light.background),
    "sidebar-ring": ref("blue", 700),
    surface: ref("gray", 100),
    "surface-foreground": ref("gray", 900),
  },
};

/** Raio base de 6px; os demais derivam dele no CSS. */
export const RADIUS = {
  base: "6px",
  scale: [
    { name: "sm", usage: "Badges, kbd, campos pequenos", value: "4px" },
    { name: "md", usage: "Botões, inputs, cards compactos", value: "6px" },
    { name: "lg", usage: "Cards, popovers, notas", value: "8px" },
    { name: "xl", usage: "Modais e painéis", value: "12px" },
    { name: "full", usage: "Pílulas e avatares", value: "9999px" },
  ],
} as const;

/** Escala de espaçamento em múltiplos de 4px. */
export const SPACING = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const;

/** Papéis tipográficos com tamanho, entrelinha, peso e tracking acoplados. */
export const TYPE_SCALE = [
  {
    family: "sans",
    lineHeight: "1.1",
    name: "display",
    size: "48px",
    tracking: "-0.03em",
    usage: "Título da home",
    weight: 600,
  },
  {
    family: "sans",
    lineHeight: "1.2",
    name: "title",
    size: "32px",
    tracking: "-0.02em",
    usage: "h1 de páginas",
    weight: 600,
  },
  {
    family: "sans",
    lineHeight: "1.3",
    name: "heading",
    size: "20px",
    tracking: "-0.01em",
    usage: "h2 e cabeçalhos de seção",
    weight: 600,
  },
  {
    family: "sans",
    lineHeight: "1.4",
    name: "subheading",
    size: "16px",
    tracking: "0",
    usage: "h3, títulos de cards",
    weight: 600,
  },
  {
    family: "sans",
    lineHeight: "1.6",
    name: "body",
    size: "16px",
    tracking: "0",
    usage: "Prosa e conteúdo",
    weight: 400,
  },
  {
    family: "sans",
    lineHeight: "1.5",
    name: "body-sm",
    size: "14px",
    tracking: "0",
    usage: "Interface densa, botões, inputs",
    weight: 400,
  },
  {
    family: "sans",
    lineHeight: "1.4",
    name: "label",
    size: "13px",
    tracking: "0",
    usage: "Rótulos e metadados",
    weight: 500,
  },
  {
    family: "mono",
    lineHeight: "1.5",
    name: "mono",
    size: "13px",
    tracking: "0",
    usage: "Código, comandos e valores",
    weight: 400,
  },
] as const;
