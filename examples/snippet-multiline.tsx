import { Snippet } from "@/registry/new-york/snippet";

export const SnippetMultilineDemo = () => (
  <div className="w-full max-w-lg">
    <Snippet
      text={[
        "pnpm install",
        "pnpm dlx shadcn@latest add https://geistlabsds-danilos-projects-94eff717.vercel.app/r/lab-design-theme.json",
        "pnpm dev",
      ]}
    />
  </div>
);
