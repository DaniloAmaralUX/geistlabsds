# Pesquisa · LAB / DESIGN — linha do tempo

A trajetória da pesquisa do LAB / DESIGN como uma única trilha contínua:
horizontal e percorrida pela rolagem no desktop, vertical no celular. App
Next.js independente do design system; vive nesta pasta e é publicado à
parte, em `https://lab-design-research.vercel.app`.

## Boilerplate

O componente é o [Lifeline](https://github.com/evilrabbit/lifeline), de Evil
Rabbit (MIT, licença em `LICENSE-lifeline`). Os arquivos de
`components/lifeline/`, `components/lifeline-shell.tsx`,
`components/theme-switcher.tsx`, `lib/lifeline-data.ts` e as keyframes de
`app/globals.css` vieram do repositório dele. O que é nosso:

| Arquivo                                   | O quê                                                                                                                                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/lifeline-pesquisa.ts`                | O conteúdo: nove marcos, do ponto de partida ao próximo experimento. Sem datas; cada "ano" é uma etapa.                                                                                                                                     |
| `app/page.tsx`, `app/layout.tsx`          | A página, em pt-BR, com a marca do LAB / DESIGN na nav e a legenda do presente no rodapé.                                                                                                                                                    |
| `components/lab-design-logo.tsx`          | A marca.                                                                                                                                                                                                                                    |
| Ajustes no Lifeline (comentados `LAB / DESIGN` no código) | `width` por marco (colunas mais largas para marcos densos), `present` (ponto azul e texto em destaque no Geist Labs DS), `settleAt` (a abertura para no presente, não no fim da trilha) e os rótulos "Etapa" / "Marco" no lugar de "Age" / "Years". |

Tudo o mais é o Lifeline como veio: abertura que desenha a trilha, rolagem
que percorre a linha, arrasto, setas, fades nas bordas, layout vertical
abaixo de `md`, `prefers-reduced-motion`.

## Rodar

```bash
cd timeline
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm typecheck
```

O lint e o formato do repositório principal (`pnpm check` na raiz) ignoram
esta pasta de propósito: o código do Lifeline segue as convenções do autor.

## Publicar

Projeto Vercel `lab-design-timeline`, ligado a este repositório com **Root
Directory = `timeline`**. Cada push em `main` publica em
`lab-design-research.vercel.app`; os outros branches ganham preview.
