import { ROUTES } from "@/constants/routes";

/**
 * Blocos: páginas e composições prontas, instaláveis pelo shadcn.
 *
 * Origem: cinco pacotes exportados do `shadcn-examples` (código base do
 * shadcn/ui, MIT), enviados pelo responsável em 2026-09-08 como JSON de
 * registry. O código foi adaptado ao LAB / DESIGN: API dos nossos componentes,
 * ícones lucide, textos em pt-BR, sem imagens externas. A licença do
 * repositório de origem fica registrada como "a confirmar" até ser lida.
 */

export type BlockEstado = "publicado" | "pendente";

export interface BlockMeta {
  slug: string;
  title: string;
  description: string;
  estado: BlockEstado;
  /** Rota da prévia em tela cheia. */
  preview: string;
  /** Página de documentação. */
  rota: string;
  nota?: string;
}

const block = (
  slug: string,
  title: string,
  description: string,
  extra: Partial<BlockMeta> = {}
): BlockMeta => ({
  description,
  estado: "publicado",
  preview: `/blocos/${slug}`,
  rota: `${ROUTES.DOCS_BLOCKS}/${slug}`,
  slug,
  title,
  ...extra,
});

export const BLOCKS: BlockMeta[] = [
  block(
    "authentication",
    "Autenticação",
    "Tela de entrada em duas colunas: painel de marca com depoimento e formulário de e-mail com provedor externo."
  ),
  block(
    "profile-page",
    "Perfil",
    "Cabeçalho de perfil com avatar e abas de dados pessoais, conta, segurança e notificações."
  ),
  block(
    "playground",
    "Playground",
    "Área de experimentação de modelo com presets, seletor de modelo, controles de temperatura e visualização de código."
  ),
  block(
    "admin-dashboard",
    "Painel administrativo",
    "Painel com barra lateral, cartões de indicadores, gráfico de área interativo e tabela de dados com arrastar e soltar."
  ),
  block(
    "tasks",
    "Tarefas",
    "Tabela de tarefas com filtros facetados, paginação e ações por linha.",
    {
      estado: "pendente",
      nota: "Consta no índice do registry enviado, mas o arquivo do item não foi enviado.",
    }
  ),
];

export const publishedBlocks = () =>
  BLOCKS.filter((entry) => entry.estado === "publicado");
