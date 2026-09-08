"use client";

import {
  ExternalLinkIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WIDTHS = [
  { icon: MonitorIcon, label: "Desktop", value: "100%" },
  { icon: TabletIcon, label: "Tablet", value: "768px" },
  { icon: SmartphoneIcon, label: "Celular", value: "390px" },
] as const;

/** Prévia de um bloco em iframe, com larguras de teste e link para abrir à parte. */
export const BlockPreview = ({
  slug,
  height = 720,
}: {
  slug: string;
  height?: number;
}) => {
  const [width, setWidth] = useState<(typeof WIDTHS)[number]["value"]>("100%");
  const src = `/blocos/${slug}`;

  return (
    <div data-slot="block-preview" className="mt-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Largura da prévia"
          className="flex items-center gap-1 rounded-md border p-1"
        >
          {WIDTHS.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={width === option.value ? "secondary" : "tertiary"}
              aria-pressed={width === option.value}
              onClick={() => setWidth(option.value)}
              sound="tabSwitch"
            >
              <option.icon />
              <span className="hidden sm:inline">{option.label}</span>
            </Button>
          ))}
        </div>
        <Button
          asChild
          size="sm"
          variant="secondary"
          className="ml-auto"
          sound="click"
        >
          <a href={src} target="_blank" rel="noreferrer">
            Abrir em nova aba
            <ExternalLinkIcon />
          </a>
        </Button>
      </div>
      <div className="w-full overflow-x-auto rounded-xl border bg-muted/30 p-3">
        <iframe
          title={`Prévia do bloco ${slug}`}
          src={src}
          loading="lazy"
          className={cn(
            "mx-auto block rounded-lg border bg-background transition-[width] duration-200",
            width === "100%" ? "w-full" : "max-w-full"
          )}
          style={{ height, width }}
        />
      </div>
    </div>
  );
};
