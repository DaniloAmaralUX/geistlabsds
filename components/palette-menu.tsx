"use client";

import { CheckIcon, PaletteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePalette } from "@/hooks/use-palette";
import { THEMES } from "@/lib/theme-presets";

/** Troca a paleta do site ao vivo, entre o tema do Supernova e os presets do Supernova Shadcn. */
export const PaletteMenu = () => {
  const { palette, setPalette } = usePalette();

  return (
    <DropdownMenu sounds>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          shape="square"
          size="sm"
          className="extend-touch-target size-8"
          aria-label="Trocar tema do site"
          sound="click"
        >
          <PaletteIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Tema do site</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.slug}
            onSelect={() => setPalette(theme.slug)}
            sound="click"
          >
            <span
              aria-hidden="true"
              className="size-3.5 rounded-full border border-black/10 dark:border-white/10"
              style={{ backgroundColor: theme.cssVars.light.primary }}
            />
            <span className="flex-1">{theme.title}</span>
            {palette === theme.slug ? <CheckIcon className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
