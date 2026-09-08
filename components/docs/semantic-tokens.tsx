import { SEMANTIC } from "@/constants/tokens";

const GROUPS: { title: string; names: string[] }[] = [
  {
    names: [
      "background",
      "foreground",
      "surface",
      "surface-foreground",
      "muted",
      "muted-foreground",
    ],
    title: "Superfícies e texto",
  },
  {
    names: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
    ],
    title: "Ações",
  },
  {
    names: [
      "border",
      "input",
      "ring",
      "destructive",
      "selection",
      "selection-foreground",
    ],
    title: "Bordas, foco e estados",
  },
  {
    names: ["code", "code-foreground", "code-highlight", "code-number"],
    title: "Código",
  },
];

/** Tokens semânticos no vocabulário do shadcn, com a referência de escala. */
export const SemanticTokens = () => (
  <div className="mt-6 flex flex-col gap-6">
    {GROUPS.map((group) => (
      <section key={group.title}>
        <h3 className="mb-2 text-base font-semibold">{group.title}</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {group.names.map((name) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-lg border p-2 text-[13px]"
            >
              <span
                className="size-8 shrink-0 rounded-md border border-black/10 dark:border-white/10"
                style={{ backgroundColor: `var(--${name})` }}
                aria-hidden="true"
              />
              <span className="flex min-w-0 flex-col">
                <code className="font-mono">--{name}</code>
                <span className="truncate font-mono text-muted-foreground">
                  claro {SEMANTIC.light[name]} · escuro {SEMANTIC.dark[name]}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);
