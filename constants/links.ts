export const GITHUB = {
  branch: "main",
  org: "DaniloAmaralUX",
  repo: "geistlabsds",
} as const;

const githubUrl = `https://github.com/${GITHUB.org}/${GITHUB.repo}`;

export const LINK = {
  GITHUB: githubUrl,
  LICENSE: `${githubUrl}/blob/${GITHUB.branch}/LICENSE`,
  /** Linha do tempo da pesquisa: app separado, em `timeline/`. */
  PESQUISA: "https://lab-design-research.vercel.app",
  SHADCN_MCP_DOCS: "https://ui.shadcn.com/docs/mcp",
  STARTERCN: "https://github.com/shadcn-labs/startercn",
  SUPERNOVA: "https://supernovacn.vercel.app",
} as const;
