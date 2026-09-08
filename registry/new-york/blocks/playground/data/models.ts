export const types = ["GPT-3", "Codex"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    description:
      "O modelo GPT-3 mais capaz. Faz qualquer tarefa dos outros modelos, em geral com mais qualidade, saída mais longa e melhor obediência às instruções. Também insere trechos dentro de um texto.",
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "text-davinci-003",
    strengths:
      "Intenção complexa, causa e efeito, geração criativa, busca, resumo para um público",
    type: "GPT-3",
  },
  {
    description: "Muito capaz, mas mais rápido e mais barato que o Davinci.",
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "text-curie-001",
    strengths: "Tradução, classificação complexa, sentimento, resumo de textos",
    type: "GPT-3",
  },
  {
    description: "Resolve tarefas diretas, é muito rápido e custa menos.",
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "text-babbage-001",
    strengths: "Classificação moderada, busca semântica",
    type: "GPT-3",
  },
  {
    description:
      "Resolve tarefas muito simples; costuma ser o mais rápido da série GPT-3 e o de menor custo.",
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "text-ada-001",
    strengths:
      "Análise de texto, classificação simples, correção de endereços, palavras-chave",
    type: "GPT-3",
  },
  {
    description:
      "O modelo Codex mais capaz. Muito bom em traduzir linguagem natural para código. Além de completar código, também insere trechos dentro dele.",
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "code-davinci-002",
    type: "Codex",
  },
  {
    description:
      "Quase tão capaz quanto o Davinci Codex, mas um pouco mais rápido. Essa vantagem pode torná-lo preferível em aplicações em tempo real.",
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "code-cushman-001",
    strengths: "Aplicações em tempo real, em que a baixa latência importa",
    type: "Codex",
  },
];
