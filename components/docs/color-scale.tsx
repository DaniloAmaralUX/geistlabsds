import {
  HUE_META,
  SCALES,
  STEPS,
  BASE,
  oklchToCss,
  scaleVar,
} from "@/constants/tokens";
import type { Hue, Mode } from "@/constants/tokens";
import { contrastRatio, oklchToHex } from "@/lib/color";

const ratioLabel = (ratio: number) => {
  if (ratio >= 4.5) {
    return "AA";
  }
  if (ratio >= 3) {
    return "AA grande";
  }
  return "—";
};

const ModeColumn = ({ hue, mode }: { hue: Hue; mode: Mode }) => (
  <div
    className={
      mode === "dark"
        ? "dark rounded-lg bg-background p-3 text-foreground"
        : "rounded-lg border p-3"
    }
  >
    <p className="mb-2 text-[13px] font-medium text-muted-foreground">
      {mode === "light" ? "Claro" : "Escuro"}
    </p>
    <ul className="flex flex-col gap-1.5">
      {STEPS.map((step, index) => {
        const color = SCALES[mode][hue][index];
        if (!color) {
          return null;
        }
        const onBackground = contrastRatio(color, BASE[mode].background);
        return (
          <li key={step} className="flex items-center gap-3 text-[13px]">
            <span
              className="size-7 shrink-0 rounded-md border border-black/10 dark:border-white/10"
              style={{ backgroundColor: oklchToCss(color) }}
              aria-hidden="true"
            />
            <span className="w-10 font-mono tabular-nums">{step}</span>
            <span className="w-20 font-mono text-muted-foreground">
              {oklchToHex(color)}
            </span>
            <span className="hidden font-mono text-muted-foreground xl:inline">
              {oklchToCss(color)}
            </span>
            <span className="ml-auto whitespace-nowrap font-mono text-muted-foreground tabular-nums">
              {onBackground.toFixed(2)} · {ratioLabel(onBackground)}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

/** Escala de uma cor nos dois modos, com hex, OKLCH e contraste sobre o fundo. */
export const ColorScale = ({ hue }: { hue: Hue }) => {
  const meta = HUE_META[hue];

  return (
    <section className="mt-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold">{meta.label}</h3>
        <span className="text-[13px] text-muted-foreground">{meta.role}</span>
        <code className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[12px]">
          {scaleVar(hue, 100)} … {scaleVar(hue, 1000)}
        </code>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ModeColumn hue={hue} mode="light" />
        <ModeColumn hue={hue} mode="dark" />
      </div>
    </section>
  );
};
