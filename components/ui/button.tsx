"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import { Slot } from "radix-ui";

import type { FeedbackType } from "@/hooks/use-feedback";
import { useFeedback } from "@/hooks/use-feedback";
import { cn } from "@/lib/utils";

/**
 * Button — Supernova.
 *
 * Implementação própria do Supernova: cinco intenções
 * (primary, secondary, tertiary, error, warning), três tamanhos, formas
 * circular e quadrada, estado de carregamento e prefixo/sufixo.
 *
 * Versão do site: além da API do registro, aceita `sound` e `haptic`, que o
 * template usa para o retorno sonoro e tátil ao clicar.
 */
const buttonVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border font-medium outline-none transition-[background-color,border-color,color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground aria-busy:cursor-progress data-[shape=circle]:px-0 data-[shape=square]:px-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      shape: "default",
      size: "md",
      variant: "primary",
    },
    variants: {
      shape: {
        circle: "rounded-full",
        default: "",
        square: "",
      },
      size: {
        lg: "h-12 rounded-lg px-4 text-base data-[shape=circle]:w-12 data-[shape=square]:w-12",
        md: "h-10 px-3.5 text-sm data-[shape=circle]:w-10 data-[shape=square]:w-10",
        sm: "h-8 gap-1.5 rounded-[5px] px-2.5 text-[13px] data-[shape=circle]:w-8 data-[shape=square]:w-8",
      },
      variant: {
        error:
          "border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 focus-visible:ring-red-600 dark:border-red-500 dark:bg-red-500 dark:hover:border-red-400 dark:hover:bg-red-400",
        primary:
          "border-foreground bg-foreground text-background hover:border-foreground/85 hover:bg-foreground/85",
        secondary: "border-border bg-background text-foreground hover:bg-muted",
        tertiary:
          "border-transparent bg-transparent text-foreground hover:bg-muted",
        warning:
          "border-amber-500 bg-amber-500 text-black hover:border-amber-600 hover:bg-amber-600 focus-visible:ring-amber-500",
      },
    },
  }
);

export interface ButtonProps
  extends
    Omit<React.ComponentProps<"button">, "prefix">,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o filho no lugar do `button` (ex.: um `Link`). */
  asChild?: boolean;
  /** Mostra o indicador de progresso e desabilita o clique. */
  loading?: boolean;
  /** Ícone ou elemento antes do texto. */
  prefix?: React.ReactNode;
  /** Ícone ou elemento depois do texto. */
  suffix?: React.ReactNode;
  /** Som tocado ao clicar (só no site). */
  sound?: FeedbackType;
  /** Vibração ao clicar (só no site). */
  haptic?: boolean;
}

const Button = ({
  asChild = false,
  children,
  className,
  disabled,
  haptic,
  loading = false,
  onClick,
  prefix,
  shape,
  size,
  sound,
  suffix,
  variant,
  ...props
}: ButtonProps) => {
  const play = useFeedback({ haptic, sound });
  const Comp = asChild ? Slot.Root : "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    play();
    onClick?.(e);
  };

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      data-size={size ?? "md"}
      data-shape={shape ?? "default"}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ className, shape, size, variant }))}
      onClick={handleClick}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <Loader2Icon aria-hidden="true" className="animate-spin" />
          ) : (
            prefix
          )}
          {children}
          {suffix}
        </>
      )}
    </Comp>
  );
};

export { Button, buttonVariants };
