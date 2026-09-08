import { ROUTES } from "@/constants/routes";

/**
 * Inventário de cobertura do Geist.
 *
 * Fonte: navegação de vercel.com/geist colada pelo responsável em
 * 2026-09-08 (Foundations, Brands e Components, na ordem original). A página
 * de cobertura e todas as contagens derivam desta lista; nada é escrito à mão.
 */

export const INVENTORY_SOURCE = {
  date: "2026-09-08",
  description:
    "Navegação de vercel.com/geist colada pelo responsável; conferida item a item.",
  status: "verificado",
} as const;

export type Section = "foundations" | "brands" | "components";

export type Estado =
  | "inventariado"
  | "em-adaptacao"
  | "em-revisao"
  | "publicado";

export interface InventoryItem {
  /** Identificador estável, igual ao caminho no Geist quando existe. */
  slug: string;
  name: string;
  section: Section;
  /** Página de referência no Geist. */
  href: string;
  estado: Estado;
  /** Rota local quando o item já existe neste design system. */
  rota?: string;
  /**
   * Instalação num projeto consumidor limpo:
   * - `cli`: `npx shadcn add <url>` completo e build verde;
   * - `build`: arquivos do registry gravados nos destinos e build verde
   *   (o CLI não pôde concluir por falta de rede para ui.shadcn.com);
   * - `pendente`: ainda não conferida.
   */
  instalacao?: "cli" | "build" | "pendente";
  nota?: string;
}

const geist = (path: string) => `https://vercel.com/geist/${path}`;

const item = (
  section: Section,
  slug: string,
  name: string,
  extra: Partial<InventoryItem> = {}
): InventoryItem => ({
  estado: "inventariado",
  href: geist(slug),
  name,
  section,
  slug,
  ...extra,
});

export const SECTION_LABEL: Record<Section, string> = {
  brands: "Marcas",
  components: "Componentes",
  foundations: "Fundações",
};

export const ESTADO_LABEL: Record<Estado, string> = {
  "em-adaptacao": "Em adaptação",
  "em-revisao": "Em revisão",
  inventariado: "Inventariado",
  publicado: "Publicado",
};

export const GEIST_INVENTORY: InventoryItem[] = [
  item("foundations", "introduction", "Introduction", {
    estado: "publicado",
    rota: ROUTES.DOCS_FOUNDATIONS,
  }),
  item("foundations", "colors", "Colors", {
    estado: "publicado",
    rota: `${ROUTES.DOCS_FOUNDATIONS}/cores`,
  }),
  item("foundations", "typography", "Typography", {
    estado: "publicado",
    rota: `${ROUTES.DOCS_FOUNDATIONS}/tipografia`,
  }),
  item("foundations", "materials", "Materials"),

  item("brands", "brands#vercel", "Vercel", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),
  item("brands", "brands#next-js", "Next.js", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),
  item("brands", "brands#turbo", "Turbo", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),
  item("brands", "brands#v0", "v0", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),
  item("brands", "brands#eve", "eve", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),
  item("brands", "brands#ai-sdk", "AI SDK", {
    nota: "Marca de terceiro; não entra como marca própria.",
  }),

  item("components", "avatar", "Avatar"),
  item("components", "badge", "Badge", {
    estado: "publicado",
    instalacao: "build",
    rota: `${ROUTES.DOCS_COMPONENTS}/badge`,
  }),
  item("components", "banner", "Banner"),
  item("components", "book", "Book"),
  item("components", "breadcrumbs", "Breadcrumbs"),
  item("components", "browser", "Browser"),
  item("components", "button", "Button", {
    estado: "publicado",
    instalacao: "build",
    rota: `${ROUTES.DOCS_COMPONENTS}/button`,
  }),
  item("components", "calendar", "Calendar"),
  item("components", "checkbox", "Checkbox"),
  item("components", "choicebox", "Choicebox"),
  item("components", "clearable-input", "Clearable Input"),
  item("components", "code", "Code"),
  item("components", "code-block", "Code Block"),
  item("components", "collapse", "Collapse"),
  item("components", "combobox", "Combobox"),
  item("components", "command-menu", "Command Menu"),
  item("components", "context-card", "Context Card"),
  item("components", "context-menu", "Context Menu"),
  item("components", "copy-button", "Copy Button"),
  item("components", "description", "Description"),
  item("components", "destructive-action-modal", "Destructive Action Modal"),
  item("components", "dots-menu", "Dots Menu"),
  item("components", "drawer", "Drawer"),
  item("components", "empty-state", "Empty State"),
  item("components", "entity", "Entity"),
  item("components", "error", "Error"),
  item("components", "error-card", "Error Card"),
  item("components", "feedback", "Feedback"),
  item("components", "fieldset", "Fieldset"),
  item("components", "file-tree", "File Tree"),
  item("components", "gauge", "Gauge"),
  item("components", "grid", "Grid"),
  item("components", "input", "Input", {
    estado: "publicado",
    instalacao: "build",
    rota: `${ROUTES.DOCS_COMPONENTS}/input`,
  }),
  item("components", "json-view", "JSON View"),
  item("components", "keyboard-input", "Keyboard Input"),
  item("components", "label", "Label"),
  item("components", "load-more-button", "Load More Button"),
  item("components", "loading-dots", "Loading Dots"),
  item("components", "menu", "Menu"),
  item("components", "middle-truncate", "MiddleTruncate"),
  item("components", "modal", "Modal"),
  item("components", "multi-select", "Multi Select"),
  item("components", "note", "Note", {
    estado: "publicado",
    instalacao: "build",
    rota: `${ROUTES.DOCS_COMPONENTS}/note`,
  }),
  item("components", "pagination", "Pagination"),
  item("components", "phone", "Phone"),
  item("components", "badge#pill", "Pill", {
    nota: "No Geist é uma seção da página Badge.",
  }),
  item("components", "progress", "Progress"),
  item("components", "project-banner", "Project Banner"),
  item("components", "radio", "Radio"),
  item("components", "relative-time-card", "Relative Time Card"),
  item("components", "scroller", "Scroller"),
  item("components", "search-input", "Search Input"),
  item("components", "select", "Select"),
  item("components", "separator", "Separator"),
  item("components", "sheet", "Sheet"),
  item("components", "show-more", "Show more"),
  item("components", "skeleton", "Skeleton"),
  item("components", "slider", "Slider"),
  item("components", "snippet", "Snippet", {
    estado: "publicado",
    instalacao: "build",
    rota: `${ROUTES.DOCS_COMPONENTS}/snippet`,
  }),
  item("components", "spinner", "Spinner"),
  item("components", "split-button", "Split Button"),
  item("components", "status-dot", "Status Dot"),
  item("components", "switch", "Switch"),
  item("components", "table", "Table"),
  item("components", "tabs", "Tabs"),
  item("components", "text-with-copy-button", "Text With Copy Button"),
  item("components", "textarea", "Textarea"),
  item("components", "theme-switcher", "Theme Switcher"),
  item("components", "toast", "Toast"),
  item("components", "toggle", "Toggle"),
  item("components", "tooltip", "Tooltip"),
  item("components", "video", "Video"),
];

export const inventoryBySection = (section: Section) =>
  GEIST_INVENTORY.filter((entry) => entry.section === section);

export const countByEstado = (items: InventoryItem[] = GEIST_INVENTORY) => {
  const totals: Record<Estado, number> = {
    "em-adaptacao": 0,
    "em-revisao": 0,
    inventariado: 0,
    publicado: 0,
  };
  for (const entry of items) {
    totals[entry.estado] += 1;
  }
  return totals;
};
