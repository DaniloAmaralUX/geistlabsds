import { Snippet } from "@/registry/new-york/snippet";

export const SnippetWidthDemo = () => (
  <div className="flex w-full flex-col items-start gap-3">
    <Snippet width="240px" text="pnpm dev" />
    <Snippet width="100%" text="pnpm build && pnpm start" />
  </div>
);
