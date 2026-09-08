import type { ReactNode } from "react";

import { ComponentSource } from "@/components/component-source";
import { cn } from "@/lib/utils";

/**
 * Prévia de componente nas docs: o exemplo renderizado numa moldura neutra e,
 * abaixo, o código-fonte do exemplo (`examples/<name>.tsx`) ou, na falta dele,
 * o arquivo do registry.
 */
export const ComponentPreview = ({
  name,
  src,
  title,
  align = "center",
  className,
  children,
}: {
  name?: string;
  src?: string;
  title?: string;
  align?: "center" | "start";
  className?: string;
  children?: ReactNode;
}) => (
  <div data-slot="component-preview" className="mt-6 flex flex-col gap-3">
    <div
      data-slot="component-preview-frame"
      className={cn(
        "flex min-h-40 w-full rounded-xl border bg-background p-6 sm:p-10",
        align === "center" ? "items-center justify-center" : "items-start",
        className
      )}
    >
      {children}
    </div>
    <ComponentSource name={name} src={src} title={title} />
  </div>
);
