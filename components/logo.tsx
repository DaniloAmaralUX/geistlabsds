import { cn } from "@/lib/utils";

/**
 * Marca do LAB / DESIGN: o nome em caixa alta e o ponto azul que acompanha a
 * pesquisa. Sem imagem externa; texto e um círculo, para funcionar em qualquer
 * tamanho e tema.
 */
export const LogoMark = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={cn("size-4", className)}
    aria-hidden="true"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="16" cy="8" r="2.5" fill="#0070f3" />
  </svg>
);

export const LogoWordmark = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 text-sm font-semibold tracking-tight",
      className
    )}
    {...props}
  >
    LAB / DESIGN
    <span
      className="inline-block size-1.5 rounded-full bg-blue-600"
      aria-hidden="true"
    />
  </span>
);

export const getLogoMarkSVG = (color: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="${color}" stroke-width="2"/>
    <circle cx="16" cy="8" r="2.5" fill="#0070f3"/>
  </svg>
`;
