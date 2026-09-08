/**
 * Origem pública do site, em um lugar só.
 *
 * Trocar o nome do projeto na Vercel muda o domínio `*.vercel.app`. Em
 * produção o site lê `VERCEL_PROJECT_PRODUCTION_URL` e acompanha sozinho
 * (`constants/site.ts`); o valor abaixo é o que entra nos artefatos gerados
 * fora do runtime — `registry.json`, os itens em `public/r/` e os temas em
 * `public/themes/`. Mudou o domínio, mude aqui, rode `pnpm build` e troque os
 * literais que sobram na prosa:
 *
 * ```bash
 * grep -rl "geistlabsds.vercel.app" README.md content examples \
 *   | xargs sed -i "s|geistlabsds.vercel.app|<novo>.vercel.app|g"
 * ```
 */
export const PUBLIC_ORIGIN = "https://geistlabsds.vercel.app" as const;

/** URL de instalação de um item do registry pelo CLI do shadcn. */
export const registryItemUrl = (name: string) =>
  `${PUBLIC_ORIGIN}/r/${name}.json`;

/**
 * Domínios que já foram nossos. O gerador reescreve qualquer um deles para
 * `PUBLIC_ORIGIN`, para não tocar em URLs de terceiros (o Supernova Shadcn,
 * por exemplo, também é `*.vercel.app`).
 */
export const KNOWN_ORIGINS = [
  "https://geistlabsds.vercel.app",
  "https://lab-design.vercel.app",
] as const;
