import { TYPE_SCALE } from "@/constants/tokens";

/** Papéis tipográficos com amostra viva e os valores acoplados. */
export const TypeScale = () => (
  <div className="mt-6 flex flex-col divide-y rounded-xl border">
    {TYPE_SCALE.map((role) => (
      <div
        key={role.name}
        className="flex flex-col gap-2 p-4 sm:flex-row sm:items-baseline sm:gap-6"
      >
        <div className="flex w-40 shrink-0 flex-col gap-0.5">
          <code className="font-mono text-[13px]">{role.name}</code>
          <span className="text-[12px] text-muted-foreground">
            {role.usage}
          </span>
        </div>
        <p
          className="min-w-0 flex-1 truncate"
          style={{
            fontFamily:
              role.family === "mono" ? "var(--font-mono)" : "var(--font-sans)",
            fontSize: role.size,
            fontWeight: role.weight,
            letterSpacing: role.tracking,
            lineHeight: role.lineHeight,
          }}
        >
          Interfaces que a equipe consegue usar
        </p>
        <span className="shrink-0 font-mono text-[12px] tabular-nums text-muted-foreground">
          {role.size} / {role.lineHeight} · {role.weight} · {role.tracking}
        </span>
      </div>
    ))}
  </div>
);
