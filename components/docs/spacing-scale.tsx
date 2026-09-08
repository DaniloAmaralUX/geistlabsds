import { RADIUS, SPACING } from "@/constants/tokens";

/** Escala de espaçamento em barras proporcionais. */
export const SpacingScale = () => (
  <ul className="mt-6 flex flex-col gap-2">
    {SPACING.map((value) => (
      <li key={value} className="flex items-center gap-4 text-[13px]">
        <code className="w-12 font-mono tabular-nums">{value}px</code>
        <span
          className="h-4 rounded-sm bg-blue-600"
          style={{ width: `${value * 3}px` }}
          aria-hidden="true"
        />
        <span className="font-mono text-muted-foreground">
          {value / 4 === Math.floor(value / 4)
            ? `${value / 4} × 4`
            : "meio passo"}
        </span>
      </li>
    ))}
  </ul>
);

/** Raios com um exemplo de cada. */
export const RadiusScale = () => (
  <ul className="mt-6 grid gap-3 sm:grid-cols-5">
    {RADIUS.scale.map((radius) => (
      <li
        key={radius.name}
        className="flex flex-col items-center gap-2 text-center text-[13px]"
      >
        <span
          className="size-16 border-2 border-foreground bg-muted"
          style={{ borderRadius: radius.value }}
          aria-hidden="true"
        />
        <code className="font-mono">
          {radius.name} · {radius.value}
        </code>
        <span className="text-muted-foreground">{radius.usage}</span>
      </li>
    ))}
  </ul>
);
