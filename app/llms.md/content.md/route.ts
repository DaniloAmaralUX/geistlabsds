import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { AGENT_DOCS_DIRECTIVE_MARKDOWN } from "@/lib/agent-discovery/directive";
import { requestOrigin } from "@/lib/agent-discovery/request-origin";
import { markdownResponse } from "@/lib/api";

export const revalidate = false;

const homepageMarkdown = (origin: string): string => {
  const base = origin.replace(/\/$/, "");

  return `# ${SITE.NAME}

${SITE.DESCRIPTION.LONG}

${AGENT_DOCS_DIRECTIVE_MARKDOWN}

## Atalhos

- [Instalação](${base}${ROUTES.DOCS_INSTALLATION}.md)
- [Fundamentos](${base}${ROUTES.DOCS_FOUNDATIONS}.md)
- [Componentes](${base}${ROUTES.DOCS_COMPONENTS}.md)
- [Blocos](${base}${ROUTES.DOCS_BLOCKS}.md)
- [Temas](${base}${ROUTES.DOCS_THEMES}.md)
- [Roteiro](${base}${ROUTES.DOCS_ROADMAP}.md)
- [Criar um componente](${base}${ROUTES.DOCS_CREATE}.md)
- [Documentação](${base}${ROUTES.DOCS}.md)
- [LLM index (llms.txt)](${base}${ROUTES.LLMS})
- [API catalog](${base}${ROUTES.API_CATALOG})
- [OpenAPI description](${base}${ROUTES.OPENAPI})
- [Agent skills index](${base}${ROUTES.AGENT_SKILLS_INDEX})
`;
};

export const GET = (request: Request) => {
  const body = homepageMarkdown(requestOrigin(request));

  return markdownResponse(body, true);
};

export const HEAD = (request: Request) => {
  const body = homepageMarkdown(requestOrigin(request));

  return markdownResponse(body, false);
};
