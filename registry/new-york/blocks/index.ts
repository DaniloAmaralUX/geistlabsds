import type { ComponentType } from "react";

/**
 * Mapa slug → página do bloco, carregado sob demanda pela rota de prévia.
 * Cada bloco exporta `default` em `./<slug>/page.tsx`.
 */
export const BLOCK_COMPONENTS: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "admin-dashboard": () => import("./admin-dashboard/page"),
  authentication: () => import("./authentication/page"),
  playground: () => import("./playground/page"),
  "profile-page": () => import("./profile-page/page"),
};
