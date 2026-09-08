"use client";

import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePalette } from "@/hooks/use-palette";

/** Aplica um tema ao site inteiro, ao vivo, para ver as docs com ele. */
export const ApplyPaletteButton = ({ slug }: { slug: string }) => {
  const { palette, setPalette } = usePalette();
  const active = palette === slug;

  return (
    <Button
      size="sm"
      variant={active ? "primary" : "secondary"}
      aria-pressed={active}
      onClick={() => setPalette(slug)}
      sound="click"
    >
      {active ? (
        <>
          <CheckIcon />
          Aplicado no site
        </>
      ) : (
        "Aplicar no site"
      )}
    </Button>
  );
};
