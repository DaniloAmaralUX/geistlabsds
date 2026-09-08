/**
 * Gera `styles/tokens.css` e o item `lab-design-theme` de `registry.json` a
 * partir de `constants/tokens.ts`. Roda em `pnpm tokens:build` (chamado por
 * `dev` e `build`). Não edite os arquivos gerados à mão.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { KNOWN_ORIGINS, PUBLIC_ORIGIN } from "../constants/origin.ts";
import {
  HUES,
  RADIUS,
  SCALES,
  SEMANTIC,
  STEPS,
  oklchToCss,
  scaleVar,
} from "../constants/tokens.ts";
import type { Hue, Mode, Step } from "../constants/tokens.ts";

const root = join(import.meta.dirname, "..");

const colorAt = (mode: Mode, hue: Hue, index: number) => {
  const color = SCALES[mode][hue][index];
  if (!color) {
    throw new Error(`Escala ${mode}/${hue} sem o passo ${index}`);
  }
  return color;
};

const scaleLines = (mode: Mode) =>
  HUES.flatMap((hue) =>
    STEPS.map(
      (step, index) =>
        `  ${scaleVar(hue, step)}: ${oklchToCss(colorAt(mode, hue, index))};`
    )
  );

const semanticLines = (mode: Mode) =>
  Object.entries(SEMANTIC[mode]).map(
    ([name, value]) => `  --${name}: ${value};`
  );

const themeLines = HUES.flatMap((hue) =>
  STEPS.map(
    (step) => `  --color-ds-${hue}-${step}: var(${scaleVar(hue, step)});`
  )
);

const css = `/* Gerado por scripts/build-tokens.ts a partir de constants/tokens.ts. Não editar. */

@theme inline {
${themeLines.join("\n")}
}

:root {
  --radius: ${RADIUS.base};
${scaleLines("light").join("\n")}
${semanticLines("light").join("\n")}
}

.dark {
${scaleLines("dark").join("\n")}
${semanticLines("dark").join("\n")}
}
`;

writeFileSync(join(root, "styles/tokens.css"), css);

/** Resolve `var(--ds-x-n)` para o literal, porque o consumidor não tem a escala. */
const resolve = (mode: Mode, value: string) =>
  value.replaceAll(
    /var\(--ds-([a-z]+)-(\d+)\)/g,
    (_, hue: Hue, step: string) => {
      const index = STEPS.indexOf(Number(step) as Step);
      if (index === -1 || !HUES.includes(hue)) {
        throw new Error(`Token desconhecido: ${hue}-${step}`);
      }
      return oklchToCss(colorAt(mode, hue, index));
    }
  );

const registryPath = join(root, "registry.json");
const registry = JSON.parse(readFileSync(registryPath, "utf-8")) as {
  homepage: string;
  items: { name: string; cssVars?: Record<string, Record<string, string>> }[];
};
const theme = registry.items.find((item) => item.name === "lab-design-theme");
if (!theme) {
  throw new Error("registry.json sem o item lab-design-theme");
}
theme.cssVars = {
  dark: Object.fromEntries(
    Object.entries(SEMANTIC.dark).map(([k, v]) => [k, resolve("dark", v)])
  ),
  light: Object.fromEntries(
    Object.entries(SEMANTIC.light).map(([k, v]) => [k, resolve("light", v)])
  ),
  theme: { radius: RADIUS.base },
};
/**
 * O domínio público entra aqui a partir de `constants/origin.ts`: a `homepage`
 * e as `registryDependencies` que apontam para itens nossos. Trocar o nome do
 * projeto na Vercel passa a ser uma linha só.
 */
let serialized = JSON.stringify(registry, null, 2);

for (const origin of KNOWN_ORIGINS) {
  serialized = serialized.split(origin).join(PUBLIC_ORIGIN);
}

writeFileSync(registryPath, `${serialized}\n`);

console.log("tokens: styles/tokens.css e registry.json atualizados");
