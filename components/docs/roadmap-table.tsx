import Link from "next/link";

import {
  ESTADO_LABEL,
  ROADMAP,
  SECTION_LABEL,
  countByEstado,
  roadmapBySection,
} from "@/constants/roadmap";
import type { Estado, RoadmapItem, Section } from "@/constants/roadmap";
import { Badge } from "@/registry/new-york/badge";

const ESTADO_COLOR: Record<Estado, "amber" | "blue" | "gray" | "green"> = {
  "em-adaptacao": "blue",
  "em-revisao": "amber",
  inventariado: "gray",
  publicado: "green",
};

const SECTIONS: Section[] = ["foundations", "components", "extras"];

const InstallStatus = ({ entry }: { entry: RoadmapItem }) => {
  if (entry.instalacao === "cli") {
    return (
      <span className="text-green-700 dark:text-green-400">
        validada pelo CLI
      </span>
    );
  }
  if (entry.instalacao === "build") {
    return (
      <span className="text-green-700 dark:text-green-400">
        build no consumidor
      </span>
    );
  }
  if (entry.estado === "publicado") {
    return <span className="text-muted-foreground">pendente</span>;
  }
  return <span className="text-muted-foreground">—</span>;
};

const Totals = () => {
  const totals = countByEstado();
  const total = ROADMAP.length;

  return (
    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
      <div className="rounded-lg border p-3">
        <dt className="text-[12px] text-muted-foreground">Itens no roteiro</dt>
        <dd className="text-2xl font-semibold tabular-nums">{total}</dd>
      </div>
      {(Object.keys(ESTADO_LABEL) as Estado[]).map((estado) => (
        <div key={estado} className="rounded-lg border p-3">
          <dt className="text-[12px] text-muted-foreground">
            {ESTADO_LABEL[estado]}
          </dt>
          <dd className="text-2xl font-semibold tabular-nums">
            {totals[estado]}
          </dd>
        </div>
      ))}
    </dl>
  );
};

/** Uma seção do roteiro: tabela com item, estado, página local e conferência de instalação. */
const SectionTable = ({
  items,
  section,
}: {
  items: RoadmapItem[];
  section: Section;
}) => {
  const totals = countByEstado(items);
  return (
    <section>
      <h2 className="mb-3 text-xl font-medium tracking-tight" id={section}>
        {SECTION_LABEL[section]}{" "}
        <span className="text-base text-muted-foreground tabular-nums">
          {totals.publicado}/{items.length}
        </span>
      </h2>
      <div className="no-scrollbar w-full overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-[12px] text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Item</th>
              <th className="px-3 py-2 font-medium">Estado</th>
              <th className="px-3 py-2 font-medium">Página</th>
              <th className="px-3 py-2 font-medium">Instalação</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr key={entry.slug} className="border-t">
                <td className="px-3 py-2">
                  <span className="font-medium">{entry.name}</span>
                  {entry.nota ? (
                    <span className="block text-[12px] text-muted-foreground">
                      {entry.nota}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-2">
                  <Badge
                    appearance="subtle"
                    color={ESTADO_COLOR[entry.estado]}
                    size="sm"
                    shape="pill"
                  >
                    {ESTADO_LABEL[entry.estado]}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  {entry.rota ? (
                    <Link
                      href={entry.rota}
                      className="underline underline-offset-4"
                    >
                      {entry.rota}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-[13px]">
                  <InstallStatus entry={entry} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/**
 * Roteiro: cada item previsto no LAB / DESIGN, seu estado, a rota local e a
 * conferência de instalação. Os totais derivam da lista.
 */
export const RoadmapTable = () => (
  <div className="flex flex-col gap-8">
    <Totals />
    {SECTIONS.map((section) => {
      const items = roadmapBySection(section);
      return items.length > 0 ? (
        <SectionTable key={section} items={items} section={section} />
      ) : null;
    })}
  </div>
);
