import { ExternalLinkIcon } from "lucide-react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { ApplyPaletteButton } from "@/components/docs/apply-palette-button";
import { ThemeSwatches } from "@/components/docs/theme-swatches";
import { THEMES } from "@/lib/theme-presets";
import { Badge } from "@/registry/new-york/badge";

const installCommands = (url: string) => ({
  __bun__: `bunx --bun shadcn@latest add ${url}`,
  __npm__: `npx shadcn@latest add ${url}`,
  __pnpm__: `pnpm dlx shadcn@latest add ${url}`,
  __yarn__: `yarn shadcn@latest add ${url}`,
});

/** Galeria dos temas: amostras, instalação pelo shadcn, Theme Studio e aplicação ao vivo. */
export const ThemesGallery = () => (
  <div className="mt-6 flex flex-col gap-6">
    {THEMES.map((theme) => (
      <article
        key={theme.slug}
        id={theme.slug}
        className="flex flex-col gap-4 rounded-xl border bg-background p-5"
      >
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              {theme.title}
              {theme.origin === "supernova-shadcn" ? (
                <Badge appearance="subtle" color="blue" size="sm">
                  Supernova Shadcn
                </Badge>
              ) : (
                <Badge appearance="subtle" color="green" size="sm">
                  padrão
                </Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{theme.description}</p>
          </div>
          <ApplyPaletteButton slug={theme.slug} />
        </header>

        <div className="flex flex-wrap gap-6">
          <ThemeSwatches label="Claro" vars={theme.cssVars.light} />
          <ThemeSwatches label="Escuro" vars={theme.cssVars.dark} />
        </div>

        <CodeBlockCommand {...installCommands(theme.installUrl)} />

        <footer className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground">
          <a
            href={`/themes/${theme.slug}.css`}
            className="underline underline-offset-4 hover:text-foreground"
          >
            CSS do tema
          </a>
          {theme.studioUrl ? (
            <a
              href={theme.studioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
            >
              Abrir no Theme Studio <ExternalLinkIcon className="size-3" />
            </a>
          ) : null}
          {theme.dependencies.length ? (
            <span>Fontes: {theme.dependencies.join(", ")}</span>
          ) : null}
          {theme.attribution ? (
            <span>
              Origem:{" "}
              <a
                href={theme.attribution.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {theme.attribution.name}
              </a>
            </span>
          ) : null}
        </footer>
      </article>
    ))}
  </div>
);
