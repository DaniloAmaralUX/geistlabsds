# LAB / DESIGN — o nosso Geist

Design system do LAB / DESIGN: fundamentos, componentes com demonstração
interativa e código instalável pelo shadcn, com referência visual no
[Geist](https://vercel.com/geist/introduction). Implementação própria sobre
shadcn, Radix e Tailwind; nada é copiado da Vercel.

Esta é a **POC 1**. Rodada atual: fundações (cores, tipografia, espaçamento e
raio) e cinco componentes ponta a ponta: Button, Badge, Input, Note e Snippet.
O inventário completo do Geist e o estado de cada item ficam em
`/docs/fundamentos/cobertura`.

## Rodar

```bash
pnpm install
pnpm dev          # gera tokens e sobe em http://localhost:3000
pnpm build        # tokens → registry → next build
pnpm check        # lint e formato (oxlint/oxfmt via ultracite)
pnpm typecheck    # depois do build, como na CI
```

## Instalar um componente em outro projeto

```bash
npx shadcn@latest add https://geistlabsds-danilos-projects-94eff717.vercel.app/r/lab-design-theme.json
npx shadcn@latest add https://geistlabsds-danilos-projects-94eff717.vercel.app/r/button.json
```

## Onde as coisas vivem

| O quê                   | Onde                                                                         |
| ----------------------- | ---------------------------------------------------------------------------- |
| Tokens (fonte única)    | `constants/tokens.ts` → gera `styles/tokens.css` e o tema do `registry.json` |
| Inventário do Geist     | `constants/geist-inventory.ts` → página de cobertura e contagens             |
| Componentes instaláveis | `registry/new-york/*.tsx` + `registry.json` → `public/r/*.json`              |
| Exemplos das docs       | `examples/*.tsx`                                                             |
| Documentação (pt-BR)    | `content/docs/**/*.mdx`                                                      |

## Memória e decisões

O contexto do projeto (pesquisa, decisões, diário) vive na memória interna do
repositório `DaniloAmaralUX/supernova-ui`, em `.claude/memory/`. Veja o
`CLAUDE.md` aqui.

## Créditos

Template [startercn](https://github.com/shadcn-labs/startercn) (MIT, Shadcn
Labs). [shadcn/ui](https://ui.shadcn.com), [Radix](https://www.radix-ui.com),
[Fumadocs](https://fumadocs.dev). Fontes Geist Sans e Geist Mono (Vercel, OFL).
