export const GITHUB = {
  branch: "main",
  org: "DaniloAmaralUX",
  repo: "geistlabsds",
} as const;

const githubUrl = `https://github.com/${GITHUB.org}/${GITHUB.repo}`;

export const LINK = {
  GEIST: "https://vercel.com/geist/introduction",
  GITHUB: githubUrl,
  LICENSE: `${githubUrl}/blob/${GITHUB.branch}/LICENSE`,
  SHADCN_MCP_DOCS: "https://ui.shadcn.com/docs/mcp",
  STARTERCN: "https://github.com/shadcn-labs/startercn",
  SUPERNOVA: "https://supernovacn.vercel.app",
} as const;
