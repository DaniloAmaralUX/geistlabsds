import type { SVGProps } from "react"

/**
 * Marca do LAB / DESIGN: um quadrado arredondado e o ponto azul que
 * acompanha a pesquisa. Sem imagem externa, para funcionar em qualquer tema.
 */
export function LabDesignLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  )
}
