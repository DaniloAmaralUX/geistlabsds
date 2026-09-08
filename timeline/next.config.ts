import type { NextConfig } from "next"
import path from "node:path"
import { fileURLToPath } from "node:url"

const nextConfig: NextConfig = {
  // Esta pasta é um app próprio dentro do repositório do design system.
  // Sem a raiz explícita, o Next sobe até o lockfile de cima e passa a
  // enxergar o proxy.ts e os aliases do outro projeto.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
}

export default nextConfig
