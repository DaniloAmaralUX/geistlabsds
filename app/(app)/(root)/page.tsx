import { CheckIcon } from "lucide-react";
import Link from "next/link";

import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { PageTransition } from "@/components/page-transition";
import {
  ACERVO_BLOCKS,
  ACERVO_EFFECTS,
  ACERVO_LAYOUTS,
} from "@/constants/acervo";
import { publishedBlocks } from "@/constants/blocks";
import { ROADMAP, countByEstado } from "@/constants/roadmap";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { SUPERNOVA_SHADCN_THEMES } from "@/constants/themes";
import { Badge } from "@/registry/new-york/badge";
import { Button } from "@/registry/new-york/button";
import { Input } from "@/registry/new-york/input";
import { Note } from "@/registry/new-york/note";
import { Snippet } from "@/registry/new-york/snippet";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

const Showcase = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="group flex flex-col gap-4 rounded-xl border bg-background p-5 transition-colors hover:bg-muted/40"
  >
    <span className="flex items-center justify-between text-sm font-medium">
      {title}
      <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </span>
    <div className="flex min-h-16 flex-1 flex-col justify-center gap-3">
      {children}
    </div>
  </Link>
);

export default function IndexPage() {
  const totals = countByEstado();
  const blockTitles = publishedBlocks()
    .map((entry) => entry.title)
    .join(", ");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Início", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <Badge appearance="subtle" color="blue" shape="pill">
              {totals.publicado} de {ROADMAP.length} itens do roteiro publicados
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {SITE.NAME}
            </h1>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
              {SITE.DESCRIPTION.LONG}
            </p>

            <CommandBox className="mt-4 w-full max-w-xl" />

            <HomeCtas className="mt-4" />
          </div>
        </section>

        <section className="container-wrapper pb-12 lg:pb-20">
          <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Showcase title="Button" href={`${ROUTES.DOCS_COMPONENTS}/button`}>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="tertiary">
                  Tertiary
                </Button>
                <Button size="sm" variant="error">
                  Error
                </Button>
              </div>
            </Showcase>
            <Showcase title="Badge" href={`${ROUTES.DOCS_COMPONENTS}/badge`}>
              <div className="flex flex-wrap gap-2">
                <Badge color="blue">Azul</Badge>
                <Badge appearance="subtle" color="green" shape="pill">
                  <CheckIcon />
                  Publicado
                </Badge>
                <Badge appearance="subtle" color="amber">
                  Em revisão
                </Badge>
                <Badge appearance="subtle">Inventariado</Badge>
              </div>
            </Showcase>
            <Showcase title="Input" href={`${ROUTES.DOCS_COMPONENTS}/input`}>
              <Input
                aria-label="Domínio"
                prefix="https://"
                suffix=".vercel.app"
                placeholder="meu-site"
                size="sm"
              />
            </Showcase>
            <Showcase title="Note" href={`${ROUTES.DOCS_COMPONENTS}/note`}>
              <Note type="success" size="sm">
                Instalação concluída sem erros.
              </Note>
            </Showcase>
            <Showcase
              title="Snippet"
              href={`${ROUTES.DOCS_COMPONENTS}/snippet`}
            >
              <Snippet text="npx shadcn@latest add …/r/button.json" />
            </Showcase>
            <Showcase title="Blocos" href={ROUTES.DOCS_BLOCKS}>
              <p className="text-sm text-muted-foreground">
                Páginas prontas com prévia em tela cheia e instalação pelo CLI
                do shadcn: {blockTitles}.
              </p>
            </Showcase>
            <Showcase title="Temas" href={ROUTES.DOCS_THEMES}>
              <p className="text-sm text-muted-foreground">
                O tema LAB / DESIGN e os {SUPERNOVA_SHADCN_THEMES.length}{" "}
                presets do Supernova Shadcn: instale pelo CLI do shadcn, aplique
                ao vivo no site ou ajuste no Theme Studio.
              </p>
            </Showcase>
            <Showcase title="Acervo" href={`${ROUTES.DOCS_BLOCKS}/acervo`}>
              <p className="text-sm text-muted-foreground">
                {ACERVO_BLOCKS.length} blocos, {ACERVO_LAYOUTS.length} layouts e{" "}
                {ACERVO_EFFECTS.length} efeitos que os repositórios do Supernova
                já publicam, com o comando de instalação de cada item.
              </p>
            </Showcase>
            <Showcase title="Roteiro" href={ROUTES.DOCS_ROADMAP}>
              <p className="text-sm text-muted-foreground">
                {ROADMAP.length} itens no roteiro, {totals.publicado}{" "}
                publicados. Os demais aparecem com estado e conferência de
                instalação.
              </p>
            </Showcase>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
