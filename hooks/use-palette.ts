"use client";

import { useCallback, useEffect, useState } from "react";

export const PALETTE_STORAGE_KEY = "lab-design-palette";
export const DEFAULT_PALETTE = "lab-design";

const readPalette = () => {
  if (typeof document === "undefined") {
    return DEFAULT_PALETTE;
  }
  return document.documentElement.dataset.palette ?? DEFAULT_PALETTE;
};

/**
 * Paleta ativa do site: `data-palette` no `<html>`, persistida no navegador.
 * O script inline em `app/layout.tsx` aplica o valor salvo antes do primeiro
 * paint; este hook só lê e troca.
 */
export const usePalette = () => {
  const [palette, setPaletteState] = useState(DEFAULT_PALETTE);

  useEffect(() => {
    setPaletteState(readPalette());
  }, []);

  const setPalette = useCallback((next: string) => {
    const root = document.documentElement;
    if (next === DEFAULT_PALETTE) {
      delete root.dataset.palette;
    } else {
      root.dataset.palette = next;
    }
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, next);
    } catch {
      // armazenamento indisponível: a troca vale só nesta visita
    }
    setPaletteState(next);
  }, []);

  return { palette, setPalette };
};
