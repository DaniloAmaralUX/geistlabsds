import { Snippet } from "@/registry/new-york/snippet";

export const SnippetNoPromptDemo = () => (
  <div className="w-full max-w-lg">
    <Snippet
      prompt={false}
      text="https://geistlabsds.vercel.app/r/registry.json"
    />
  </div>
);
