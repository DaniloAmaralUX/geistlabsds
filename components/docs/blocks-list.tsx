import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { BLOCKS } from "@/constants/blocks";
import { Badge } from "@/registry/new-york/badge";

/** Grade dos blocos, com miniatura quando existir em public/blocos/<slug>.png. */
export const BlocksList = () => (
  <div className="mt-6 grid gap-4 sm:grid-cols-2">
    {BLOCKS.map((entry) =>
      entry.estado === "publicado" ? (
        <Link
          key={entry.slug}
          href={entry.rota}
          className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-colors hover:bg-muted/40"
        >
          <div className="aspect-[16/10] w-full overflow-hidden border-b bg-muted/40">
            {/* Miniatura capturada pelo Playwright; alt vazio porque o título vem abaixo. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/blocos/${entry.slug}.png`}
              alt=""
              className="size-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-1 p-4">
            <span className="flex items-center justify-between font-medium">
              {entry.title}
              <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="text-sm text-muted-foreground">
              {entry.description}
            </span>
          </div>
        </Link>
      ) : (
        <div
          key={entry.slug}
          className="flex flex-col gap-2 rounded-xl border border-dashed p-4"
        >
          <span className="flex items-center justify-between font-medium">
            {entry.title}
            <Badge appearance="subtle" color="amber" size="sm" shape="pill">
              pendente
            </Badge>
          </span>
          <span className="text-sm text-muted-foreground">
            {entry.description}
          </span>
          {entry.nota ? (
            <span className="text-[13px] text-muted-foreground">
              {entry.nota}
            </span>
          ) : null}
        </div>
      )
    )}
  </div>
);
