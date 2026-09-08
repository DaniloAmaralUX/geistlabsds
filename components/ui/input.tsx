"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Input — Supernova.
 *
 * Campo de texto com rótulo, descrição, prefixo, sufixo, erro e três tamanhos.
 * O rótulo e as mensagens ficam ligados ao campo por `id`, `aria-describedby`
 * e `aria-invalid`. Implementação própria do Supernova.
 */

export type InputSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<InputSize, string> = {
  lg: "h-12 text-base [&_[data-slot=input-affix]]:px-3.5",
  md: "h-10 text-sm [&_[data-slot=input-affix]]:px-3",
  sm: "h-8 text-[13px] [&_[data-slot=input-affix]]:px-2.5",
};

export interface InputProps extends Omit<
  React.ComponentProps<"input">,
  "prefix" | "size"
> {
  /** Texto acima do campo; vira `<label for>`. */
  label?: React.ReactNode;
  /** Texto de apoio abaixo do campo. */
  description?: React.ReactNode;
  /** Mensagem de erro; ativa `aria-invalid`. */
  error?: React.ReactNode;
  /** Bloco fixo antes do texto (ex.: `https://`). */
  prefix?: React.ReactNode;
  /** Bloco fixo depois do texto (ex.: `.com`). */
  suffix?: React.ReactNode;
  size?: InputSize;
  /** Classe do contêiner externo. */
  wrapperClassName?: string;
}

const Input = ({
  className,
  description,
  disabled,
  error,
  id,
  label,
  prefix,
  size = "md",
  suffix,
  wrapperClassName,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

  return (
    <div
      data-slot="input-field"
      className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      <div
        data-slot="input-wrapper"
        data-invalid={error ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        className={cn(
          "flex w-full items-stretch overflow-hidden rounded-md border border-input bg-background text-foreground transition-[border-color,box-shadow] duration-150",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
          "data-[invalid=true]:border-red-600 data-[invalid=true]:focus-within:ring-red-600/30",
          "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-muted data-[disabled=true]:text-muted-foreground",
          SIZE_CLASS[size]
        )}
      >
        {prefix ? (
          <span
            data-slot="input-affix"
            className="flex select-none items-center border-r border-input bg-muted text-muted-foreground"
          >
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          data-slot="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          disabled={disabled}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {suffix ? (
          <span
            data-slot="input-affix"
            className="flex select-none items-center border-l border-input bg-muted text-muted-foreground"
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {description && !error ? (
        <p id={descriptionId} className="text-[13px] text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-[13px] text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export { Input };
