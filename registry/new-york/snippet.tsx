"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Snippet — LAB / DESIGN.
 *
 * Comando de terminal com botão de copiar. Aceita uma ou várias linhas, mostra
 * o prompt `$` opcional e anuncia a cópia para leitores de tela.
 * Implementação própria com referência visual no Geist.
 */

export interface SnippetProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "onCopy"
> {
  /** Uma linha ou várias; cada item vira uma linha. */
  text: string | string[];
  /** Mostra `$` antes de cada linha. */
  prompt?: boolean;
  /** Fundo escuro independente do tema. */
  dark?: boolean;
  /** Largura do bloco (ex.: `100%`, `320px`). */
  width?: string;
  /** Chamado com o texto copiado. */
  onCopy?: (text: string) => void;
  /** Rótulo acessível do botão. */
  copyLabel?: string;
}

const Snippet = ({
  className,
  copyLabel = "Copiar comando",
  dark = false,
  onCopy,
  prompt = true,
  style,
  text,
  width,
  ...props
}: SnippetProps) => {
  const lines = Array.isArray(text) ? text : [text];
  const value = lines.join("\n");
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    []
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [onCopy, value]);

  return (
    <div
      data-slot="snippet"
      data-copied={copied ? "true" : undefined}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-md border px-3 py-2.5 font-mono text-[13px] leading-6",
        dark
          ? "border-neutral-800 bg-neutral-950 text-neutral-50"
          : "border-border bg-background text-foreground",
        className
      )}
      style={{ ...style, width }}
      {...props}
    >
      <pre className="m-0 min-w-0 flex-1 overflow-x-auto whitespace-pre bg-transparent p-0">
        {lines.map((line, index) => (
          <span
            // Linhas repetidas são legítimas num comando; o índice é a chave.
            key={`${index}-${line}`}
            data-slot="snippet-line"
            className="block"
          >
            {prompt ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mr-2 select-none",
                  dark ? "text-neutral-500" : "text-muted-foreground"
                )}
              >
                $
              </span>
            ) : null}
            {line}
          </span>
        ))}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
        className={cn(
          "sticky top-0 -my-1 -mr-1 flex size-8 shrink-0 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
          dark
            ? "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {copied ? (
          <CheckIcon aria-hidden="true" className="size-4" />
        ) : (
          <CopyIcon aria-hidden="true" className="size-4" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copiado" : ""}
      </span>
    </div>
  );
};

export { Snippet };
