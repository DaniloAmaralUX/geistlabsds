import catalogo from "@/data/acervo/supernova-catalogo.designs.json";
import layouts from "@/data/acervo/supernova-layouts.json";
import blocks from "@/data/acervo/supernova-ui.blocks.json";
import registry from "@/data/acervo/supernova-ui.registry.json";

/**
 * Acervo Supernova: o que os outros repositórios do Supernova já publicam,
 * lido dos instantâneos em `data/acervo/` (ver o README de lá). Nada aqui é
 * digitado à mão; contagens e comandos derivam dos arquivos.
 */

/** Data em que os instantâneos foram copiados. */
export const ACERVO_SNAPSHOT: string = catalogo.snapshot;

/** Site público do Supernova Shadcn, que serve o registry dos blocos e efeitos. */
export const SUPERNOVA_ORIGIN: string = registry.homepage;

/** Site do catálogo experimental (material histórico). */
export const CATALOGO_ORIGIN: string = catalogo.homepage;

/** Comando de instalação por URL, que dispensa configurar namespaces. */
export const installFromSupernova = (name: string) =>
  `npx shadcn@latest add ${SUPERNOVA_ORIGIN}/r/${name}.json`;

export interface AcervoBlock {
  category: string;
  description: string;
  fileCount: number;
  install: string;
  kind: string;
  name: string;
  slug: string;
  title: string;
}

export const ACERVO_BLOCKS: AcervoBlock[] = blocks;

export interface AcervoLayout {
  category: string;
  collection: string;
  description: string;
  entry: string;
  fileCount: number;
  install: string;
  kind: string;
  maturity: string;
  name: string;
  provenance: { adapted: boolean; license: string; origin: string };
  slug: string;
  tags: string[];
  title: string;
}

export const ACERVO_LAYOUTS: AcervoLayout[] = layouts;

export const EFFECT_FRAMEWORKS = ["react", "vue", "svelte", "vanilla"] as const;
export type EffectFramework = (typeof EFFECT_FRAMEWORKS)[number];

export const FRAMEWORK_LABEL: Record<EffectFramework, string> = {
  react: "React",
  svelte: "Svelte",
  vanilla: "Vanilla",
  vue: "Vue",
};

interface RegistryItem {
  author?: string;
  categories?: string[];
  description?: string;
  name: string;
  title?: string;
  type: string;
}

export interface AcervoEffect {
  author: string;
  description: string;
  /** Nome do item no registry, por framework. */
  items: Partial<Record<EffectFramework, string>>;
  slug: string;
  title: string;
}

const isFramework = (value: string): value is EffectFramework =>
  (EFFECT_FRAMEWORKS as readonly string[]).includes(value);

const buildEffects = (): AcervoEffect[] => {
  const bySlug = new Map<string, AcervoEffect>();

  for (const item of registry.items as RegistryItem[]) {
    const [kind, framework] = item.categories ?? [];

    if (kind !== "efeito" || !framework || !isFramework(framework)) {
      continue;
    }

    const slug = item.name.replace(new RegExp(`-${framework}$`), "");
    const existing = bySlug.get(slug);

    if (existing) {
      existing.items[framework] = item.name;
      continue;
    }

    bySlug.set(slug, {
      author: item.author ?? "",
      description: item.description ?? "",
      items: { [framework]: item.name },
      slug,
      title: (item.title ?? slug).replace(
        /\s\((React|Vue|Svelte|Vanilla)\)$/,
        ""
      ),
    });
  }

  return [...bySlug.values()];
};

/** Um efeito por linha; cada um sai em até quatro frameworks. */
export const ACERVO_EFFECTS: AcervoEffect[] = buildEffects();

export interface CatalogoDesign {
  caminho: string;
  maturidade: string;
  registry: string;
  slug: string;
  titulo: string;
}

export interface CatalogoGrupo {
  descricao: string;
  designs: CatalogoDesign[];
  slug: string;
  titulo: string;
}

export const ACERVO_CATALOGO: CatalogoGrupo[] = catalogo.grupos;

export const countCatalogoDesigns = () => {
  let total = 0;

  for (const grupo of ACERVO_CATALOGO) {
    total += grupo.designs.length;
  }

  return total;
};

/** Agrupa preservando a ordem de chegada. */
export const groupBy = <T>(
  items: T[],
  key: (item: T) => string
): [string, T[]][] => {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const name = key(item);
    const bucket = groups.get(name);

    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(name, [item]);
    }
  }

  return [...groups.entries()];
};
