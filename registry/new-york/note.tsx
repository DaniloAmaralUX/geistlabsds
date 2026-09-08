import { cn } from "@/lib/utils";

/**
 * Note — Supernova.
 *
 * Aviso em linha com tipo, rótulo, preenchimento sólido e ação opcional.
 * O papel ARIA acompanha o tipo: erro e aviso anunciam, os demais não.
 * Implementação própria do Supernova.
 */

export type NoteType =
  | "default"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "violet";

export type NoteSize = "sm" | "md" | "lg";

const DEFAULT_LABEL: Record<NoteType, string> = {
  default: "Nota:",
  error: "Erro:",
  secondary: "Nota:",
  success: "Sucesso:",
  violet: "Nota:",
  warning: "Aviso:",
};

const ROLE: Record<NoteType, "alert" | "note" | "status"> = {
  default: "note",
  error: "alert",
  secondary: "note",
  success: "status",
  violet: "note",
  warning: "alert",
};

const OUTLINE_CLASS: Record<NoteType, string> = {
  default: "border-border bg-background text-foreground",
  error:
    "border-red-300 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
  secondary: "border-border bg-muted text-foreground",
  success:
    "border-green-300 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200",
  violet:
    "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-200",
  warning:
    "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
};

const FILL_CLASS: Record<NoteType, string> = {
  default: "border-foreground bg-foreground text-background",
  error: "border-red-600 bg-red-600 text-white",
  secondary: "border-muted bg-muted text-foreground",
  success: "border-green-600 bg-green-600 text-white",
  violet: "border-violet-600 bg-violet-600 text-white",
  warning: "border-amber-500 bg-amber-500 text-black",
};

const SIZE_CLASS: Record<NoteSize, string> = {
  lg: "px-4 py-3.5 text-base",
  md: "px-3 py-2.5 text-sm",
  sm: "px-2.5 py-2 text-[13px]",
};

export interface NoteProps extends React.ComponentProps<"div"> {
  type?: NoteType;
  /** Rótulo em negrito antes do texto; `false` remove. */
  label?: React.ReactNode | false;
  /** Fundo sólido na cor do tipo. */
  fill?: boolean;
  /** Elemento à direita, normalmente um botão. */
  action?: React.ReactNode;
  size?: NoteSize;
}

const Note = ({
  action,
  children,
  className,
  fill = false,
  label,
  size = "md",
  type = "default",
  ...props
}: NoteProps) => {
  const resolvedLabel = label === false ? null : (label ?? DEFAULT_LABEL[type]);

  return (
    <div
      data-slot="note"
      data-type={type}
      data-fill={fill ? "true" : undefined}
      role={ROLE[type]}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border leading-relaxed",
        fill ? FILL_CLASS[type] : OUTLINE_CLASS[type],
        SIZE_CLASS[size],
        className
      )}
      {...props}
    >
      <p className="min-w-0 flex-1">
        {resolvedLabel ? (
          <span className="mr-1.5 font-semibold">{resolvedLabel}</span>
        ) : null}
        {children}
      </p>
      {action ? (
        <div
          data-slot="note-action"
          className="ml-auto flex shrink-0 items-center"
        >
          {action}
        </div>
      ) : null}
    </div>
  );
};

export { Note };
