import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOCKS } from "@/constants/blocks";
import { BLOCK_COMPONENTS } from "@/registry/new-york/blocks";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () =>
  Object.keys(BLOCK_COMPONENTS).map((slug) => ({ slug }));

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await props.params;
  const meta = BLOCKS.find((entry) => entry.slug === slug);

  return {
    robots: { follow: false, index: false },
    title: meta ? `Prévia · ${meta.title}` : "Prévia",
  };
};

/** Prévia em tela cheia de um bloco, sem cabeçalho nem rodapé do site. */
export default async function BlockPreviewPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const load = BLOCK_COMPONENTS[slug];

  if (!load) {
    notFound();
  }

  const { default: Block } = await load();

  return (
    <div
      data-slot="block-preview-root"
      className="min-h-svh bg-background text-foreground"
    >
      <Block />
    </div>
  );
}
