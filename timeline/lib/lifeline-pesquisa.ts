import { defineLifeline } from "@/lib/lifeline-data"

/**
 * A pesquisa do LAB / DESIGN como uma trajetória, no modelo do Lifeline.
 *
 * Não há datas: a trilha é sequencial. Cada "ano" é uma etapa (01–09), o
 * `label` é o nome do marco e os `events` são as linhas que se lê enquanto
 * alguém apresenta. `present` marca o agora (Geist Labs DS); o que vem
 * depois é continuidade, não conclusão.
 */

export const PESQUISA_PRESENT_STEP = 6

export const pesquisaLifeline = defineLifeline({
  slug: "pesquisa",
  name: "Pesquisa · LAB / DESIGN",
  birthYear: 1,
  endYear: 9,
  description:
    "Do problema inicial ao Geist Labs DS: como o trabalho no LAB / DESIGN evoluiu, marco a marco, e para onde aponta.",
  milestones: {
    1: {
      id: "ponto-de-partida",
      age: "01",
      label: "O ponto de partida",
      width: 340,
      events: [
        "IA acelerou prototipação e desenvolvimento. Velocidade isolada não resolveu o resto.",
        "Conhecimento espalhado, componentes reconstruídos, inconsistência entre produtos e distância entre design e implementação continuaram.",
        "A pergunta que iniciou a pesquisa: “Como fazer cada projeto aumentar a capacidade do próximo?”",
      ],
    },
    2: {
      id: "compound-design",
      age: "02",
      label: "Compound Design",
      width: 360,
      events: [
        "Uma lógica inspirada em Compound Engineering, aplicada ao Design.",
        "Hipótese: Problema → Solução → Componente → Pattern → Documentação → Contexto para IA → Reuso.",
        "“O resultado de um projeto não deveria ser somente uma tela. Ele deveria melhorar o sistema usado para construir as próximas.”",
        "Hipótese de trabalho em evolução, não uma metodologia oficial da empresa.",
      ],
    },
    3: {
      id: "design-engineering",
      age: "03",
      label: "Design Engineering",
      width: 360,
      events: [
        "Experimentos diretos com React, shadcn/ui, Radix, Tailwind, registries, component libraries, Claude Code, Codex e Cursor.",
        "A intenção não é substituir desenvolvimento. É diminuir a distância entre intenção de design → especificação → implementação real.",
        "Aprendizado: “Componentes podem existir simultaneamente como Design + Código + Documentação.”",
      ],
    },
    4: {
      id: "studio-dev-supernova",
      age: "04",
      label: "Studio Dev → Supernova",
      width: 400,
      events: [
        "Studio Dev UI evoluiu para Supernova UI: um laboratório pessoal, paralelo ao trabalho oficial.",
        "Experimentos: registry compatível com shadcn, componentes instaláveis, collections, documentação, catálogo, integração com Claude, Cursor e Codex, contexto consumível por agentes.",
        "Principal aprendizado: “Criar componentes não era suficiente. Também era necessário criar infraestrutura para distribuir, descobrir e reutilizar esses componentes.”",
      ],
    },
    5: {
      id: "design-systems-para-agentes",
      age: "05",
      label: "Design Systems para agentes",
      width: 400,
      events: [
        "O consumidor do Design System também está mudando.",
        "Antes: Designer → documentação → desenvolvedor. Agora também: Designer → sistema → agente de IA → implementação.",
        "Experimentos: llms.txt, llms-full.txt, Markdown estruturado, registries, agent skills, documentação preparada para LLMs, regras de implementação.",
        "Hipótese: “O Design System pode funcionar como uma camada de contexto entre Design, Engenharia e IA.”",
      ],
    },
    6: {
      id: "geist-labs-ds",
      age: "06",
      label: "Geist Labs DS",
      present: true,
      width: 420,
      events: [
        "POC funcional. A pesquisa começou a virar infraestrutura real: um Design System experimental para o LAB / DESIGN.",
        "Construído com shadcn/ui, Radix, Tailwind, foundations, componentes, documentação, registry e recursos para agentes.",
        "Componentes: Button, Badge, Input, Note, Snippet, Prompt Input.",
        "Para IA: llms.txt, llms-full.txt, Markdown, registry JSON, agent skill.",
        "“Padrão + código + documentação + distribuição + contexto para IA.”",
        [
          { type: "text", value: "Produto atual: " },
          {
            type: "link",
            value: "geistlabsds.vercel.app/docs",
            href: "https://geistlabsds.vercel.app/docs",
          },
        ],
      ],
    },
    7: {
      id: "ai-interface-patterns",
      age: "07",
      label: "AI Interface Patterns",
      width: 360,
      events: [
        "O Prompt Input abriu uma nova frente: produtos de IA precisam de padrões próprios.",
        "Seleção de modelo, reasoning, anexos, busca web, ferramentas, comandos, histórico, contexto.",
        "A pesquisa sai dos componentes visuais e avança para padrões de interação específicos de produtos de IA.",
      ],
    },
    8: {
      id: "onde-estou-agora",
      age: "08",
      label: "Onde estou agora",
      width: 400,
      events: [
        "As pesquisas que estavam separadas começam a convergir: Research → Design Engineering → Design System → Component Registry → AI Interface Patterns → Context for Agents.",
        "Hipótese atual: “Esses experimentos começam a apontar para uma capacidade interna de Design Engineering para o Labs.”",
        "Frentes possíveis: Design Systems, Design Engineering, AI Product Design, AI Design Infrastructure.",
        "Não um setor já definido: uma capacidade potencial que está sendo investigada.",
      ],
    },
    9: {
      id: "proximo-experimento",
      age: "09",
      label: "Próximo experimento",
      width: 420,
      events: [
        "Aplicar o Geist Labs DS em um produto real do Labs: construir uma feature com Design + componentes existentes + código + agente de IA.",
        "Velocidade: quanto tempo foi necessário para chegar à implementação?",
        "Reuso: quanto da solução veio de infraestrutura já existente?",
        "Consistência: quanto trabalho de revisão e reconstrução foi evitado?",
        "“Se o experimento gerar ganho mensurável, teremos evidência de uma capacidade que vale evoluir dentro do Labs.”",
        "Design que aumenta a capacidade de construir.",
      ],
    },
  },
})
