import { CopyButton } from "@/components/copy-button";
import {
  ACERVO_BLOCKS,
  ACERVO_CATALOGO,
  ACERVO_EFFECTS,
  ACERVO_LAYOUTS,
  CATALOGO_ORIGIN,
  EFFECT_FRAMEWORKS,
  FRAMEWORK_LABEL,
  groupBy,
  installFromSupernova,
} from "@/constants/acervo";
import { Badge } from "@/registry/new-york/badge";

const Command = ({ value }: { value: string }) => (
  <span className="flex max-w-full items-center gap-1 rounded-md border bg-muted/40 pl-2 font-mono text-[12px] text-muted-foreground">
    <span className="truncate" title={value}>
      {value}
    </span>
    <CopyButton
      value={value}
      showTooltip={false}
      className="static shrink-0 bg-transparent"
    />
  </span>
);

const Row = ({
  title,
  meta,
  description,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) => (
  <li className="grid gap-2 border-b py-3 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
    <div className="flex min-w-0 flex-col gap-1">
      <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
        {title}
        {meta}
      </span>
      {description ? (
        <span className="text-[13px] text-muted-foreground">{description}</span>
      ) : null}
    </div>
    <div className="flex min-w-0 flex-wrap gap-2">{children}</div>
  </li>
);

const Group = ({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) => (
  <details className="group mt-4 rounded-xl border bg-background" open>
    <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-medium select-none">
      {title}
      <Badge appearance="subtle" size="sm" shape="pill">
        {count}
      </Badge>
    </summary>
    <ul className="border-t px-4">{children}</ul>
  </details>
);

const BlocksSection = () => (
  <>
    {groupBy(ACERVO_BLOCKS, (block) => block.category).map(
      ([category, items]) => (
        <Group key={category} title={category} count={items.length}>
          {items.map((block) => (
            <Row
              key={block.slug}
              title={block.title}
              meta={
                <Badge appearance="subtle" size="sm">
                  {block.kind}
                </Badge>
              }
              description={`${block.fileCount} ${block.fileCount === 1 ? "arquivo" : "arquivos"}`}
            >
              <Command value={installFromSupernova(block.name)} />
            </Row>
          ))}
        </Group>
      )
    )}
  </>
);

const LayoutsSection = () => (
  <>
    {groupBy(ACERVO_LAYOUTS, (layout) => layout.category).map(
      ([category, items]) => (
        <Group key={category} title={category} count={items.length}>
          {items.map((layout) => (
            <Row
              key={layout.slug}
              title={layout.title}
              meta={
                <Badge appearance="subtle" size="sm">
                  {layout.kind}
                </Badge>
              }
              description={layout.description}
            >
              <Command value={layout.install} />
            </Row>
          ))}
        </Group>
      )
    )}
  </>
);

const EffectsSection = () => (
  <ul className="mt-4 rounded-xl border bg-background px-4">
    {ACERVO_EFFECTS.map((effect) => (
      <Row
        key={effect.slug}
        title={effect.title}
        description={effect.description}
      >
        {EFFECT_FRAMEWORKS.map((framework) => {
          const name = effect.items[framework];

          return name ? (
            <CopyButton
              key={framework}
              value={installFromSupernova(name)}
              showTooltip={false}
              variant="secondary"
              className="static"
            >
              {FRAMEWORK_LABEL[framework]}
            </CopyButton>
          ) : null;
        })}
      </Row>
    ))}
  </ul>
);

const CatalogoSection = () => (
  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
    {ACERVO_CATALOGO.map((grupo) => (
      <li
        key={grupo.slug}
        className="flex flex-col gap-1 rounded-xl border bg-background p-4"
      >
        <span className="flex items-center justify-between gap-2 text-sm font-medium">
          <a
            href={`${CATALOGO_ORIGIN}/c/${grupo.slug}`}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {grupo.titulo}
          </a>
          <Badge appearance="subtle" size="sm" shape="pill">
            {grupo.designs.length}
          </Badge>
        </span>
        <span className="text-[13px] text-muted-foreground">
          {grupo.descricao}
        </span>
      </li>
    ))}
  </ul>
);

const SECTIONS = {
  blocos: BlocksSection,
  catalogo: CatalogoSection,
  efeitos: EffectsSection,
  layouts: LayoutsSection,
} as const;

export type AcervoSection = keyof typeof SECTIONS;

/** Uma seção do acervo, lida dos instantâneos em `data/acervo/`. */
export const AcervoSupernova = ({ section }: { section: AcervoSection }) => {
  const Section = SECTIONS[section];

  return <Section />;
};

/** Contagens derivadas, para o texto das páginas. */
export const AcervoCount = ({ section }: { section: AcervoSection }) => {
  const counts: Record<AcervoSection, number> = {
    blocos: ACERVO_BLOCKS.length,
    catalogo: ACERVO_CATALOGO.length,
    efeitos: ACERVO_EFFECTS.length,
    layouts: ACERVO_LAYOUTS.length,
  };

  return <>{counts[section]}</>;
};
