# Supernova — design system do LAB / DESIGN

Supernova é o design system do LAB / DESIGN: fundamentos, componentes, blocos
e temas com prévia real e código que entra no seu projeto pelo CLI do shadcn.
Implementação própria sobre shadcn, Radix e Tailwind, compatível com o
ecossistema shadcn. Publicado em <https://geistlabsds.vercel.app>.

A primeira rodada entregou os fundamentos (cores, tipografia, espaçamento e
raio) e os primeiros componentes ponta a ponta. O estado de cada item fica em
`/docs/fundamentos/roteiro`; os totais derivam de `constants/roadmap.ts`,
nunca de números escritos à mão.

## Rodar

```bash
pnpm install
pnpm dev          # gera tokens e temas e sobe em http://localhost:3000
pnpm build        # tokens → temas → registry → next build
pnpm check        # lint e formato (oxlint/oxfmt via ultracite)
pnpm typecheck    # depois do build, como na CI
```

## Instalar um componente em outro projeto

```bash
npx shadcn@latest add https://geistlabsds.vercel.app/r/supernova-theme.json
npx shadcn@latest add https://geistlabsds.vercel.app/r/button.json
```

## Onde as coisas vivem

| O quê                   | Onde                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| Tokens (fonte única)    | `constants/tokens.ts` → gera `styles/tokens.css` e o item `supernova-theme` do `registry.json`               |
| Roteiro                 | `constants/roadmap.ts` → página do roteiro e contagens                                                       |
| Componentes instaláveis | `registry/new-york/*.tsx` + `registry.json` → `public/r/*.json`                                              |
| Blocos                  | `constants/blocks.ts` (lista) + `registry/new-york/blocks/<slug>/` (código) → `public/r/*.json`              |
| Temas                   | `constants/themes.ts` + `scripts/build-themes.ts` → `styles/palettes.css` e `public/themes/*.css`            |
| Acervo                  | `data/acervo/*.json` (instantâneos com data dos registries do Supernova) → página do acervo e suas contagens |
| Exemplos das docs       | `examples/*.tsx`                                                                                             |
| Documentação (pt-BR)    | `content/docs/**/*.mdx`                                                                                      |

Os gerados (`styles/tokens.css`, `styles/palettes.css`, `public/themes/`,
`public/r/`) são versionados e nunca editados à mão.

## Memória e decisões

O contexto do projeto (pesquisa, decisões, diário) vive na memória interna do
repositório `DaniloAmaralUX/supernova-ui`, em `.claude/memory/`. Veja o
`CLAUDE.md` aqui.

## Créditos

Template [startercn](https://github.com/shadcn-labs/startercn) (Shadcn Labs,
MIT). [shadcn/ui](https://ui.shadcn.com) (MIT), [Radix](https://www.radix-ui.com),
[Fumadocs](https://fumadocs.dev). Fontes Geist Sans e Geist Mono (Vercel, OFL).
A origem dos blocos, dos temas e do acervo está registrada na página de cada
um em `/docs`.
