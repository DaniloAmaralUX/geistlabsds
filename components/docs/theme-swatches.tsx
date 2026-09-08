import type { ThemeVars } from "@/constants/themes";

const KEYS = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "border",
] as const;

/** Oito amostras de um modo do tema, na ordem em que os tokens aparecem na interface. */
export const ThemeSwatches = ({
  vars,
  label,
}: {
  vars: ThemeVars;
  label: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[12px] text-muted-foreground">{label}</span>
    <ul className="flex gap-1" aria-label={`Amostras: ${label}`}>
      {KEYS.map((key) => (
        <li
          key={key}
          title={`--${key}: ${vars[key] ?? "—"}`}
          className="size-6 rounded-md border border-black/10 dark:border-white/10"
          style={{ backgroundColor: vars[key] }}
        />
      ))}
    </ul>
  </div>
);
