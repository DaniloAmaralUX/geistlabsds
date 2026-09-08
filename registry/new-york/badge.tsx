import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Badge — LAB / DESIGN.
 *
 * Seis cores por intenção, duas aparências (sólida e suave), três tamanhos e a
 * forma de pílula. Implementação própria do LAB / DESIGN.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border font-medium tabular-nums transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    compoundVariants: [
      {
        appearance: "solid",
        className: "border-transparent bg-foreground text-background",
        color: "gray",
      },
      {
        appearance: "solid",
        className: "border-transparent bg-blue-600 text-white",
        color: "blue",
      },
      {
        appearance: "solid",
        className: "border-transparent bg-green-600 text-white",
        color: "green",
      },
      {
        appearance: "solid",
        className: "border-transparent bg-red-600 text-white",
        color: "red",
      },
      {
        appearance: "solid",
        className: "border-transparent bg-amber-500 text-black",
        color: "amber",
      },
      {
        appearance: "solid",
        className: "border-transparent bg-violet-600 text-white",
        color: "violet",
      },
      {
        appearance: "subtle",
        className: "border-border bg-muted text-foreground",
        color: "gray",
      },
      {
        appearance: "subtle",
        className:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
        color: "blue",
      },
      {
        appearance: "subtle",
        className:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200",
        color: "green",
      },
      {
        appearance: "subtle",
        className:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
        color: "red",
      },
      {
        appearance: "subtle",
        className:
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
        color: "amber",
      },
      {
        appearance: "subtle",
        className:
          "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-200",
        color: "violet",
      },
    ],
    defaultVariants: {
      appearance: "solid",
      color: "gray",
      shape: "default",
      size: "md",
    },
    variants: {
      appearance: {
        solid: "",
        subtle: "",
      },
      color: {
        amber: "",
        blue: "",
        gray: "",
        green: "",
        red: "",
        violet: "",
      },
      shape: {
        default: "",
        pill: "rounded-full",
      },
      size: {
        lg: "h-7 px-2.5 text-[13px]",
        md: "h-6 px-2 text-xs",
        sm: "h-5 px-1.5 text-[11px]",
      },
    },
  }
);

export interface BadgeProps
  extends
    Omit<React.ComponentProps<"span">, "color">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = ({
  appearance,
  asChild = false,
  className,
  color,
  shape,
  size,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-color={color ?? "gray"}
      data-appearance={appearance ?? "solid"}
      className={cn(
        badgeVariants({ appearance, className, color, shape, size })
      )}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
