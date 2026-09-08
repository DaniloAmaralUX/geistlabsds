import { CodeBlockCommand } from "@/components/code-block-command";
import { SITE } from "@/constants/site";

/** Comando de instalação de um item do registry, nos quatro gestores. */
export const InstallCommand = ({ name }: { name: string }) => {
  const url = `${SITE.REGISTRY}/r/${name}.json`;

  return (
    <div className="mt-4">
      <CodeBlockCommand
        __bun__={`bunx --bun shadcn@latest add ${url}`}
        __npm__={`npx shadcn@latest add ${url}`}
        __pnpm__={`pnpm dlx shadcn@latest add ${url}`}
        __yarn__={`yarn shadcn@latest add ${url}`}
      />
    </div>
  );
};
