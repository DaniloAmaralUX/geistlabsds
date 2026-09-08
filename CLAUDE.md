# Supernova — comece aqui

Supernova é o design system do LAB / DESIGN: fundamentos, componentes, blocos e
temas com prévia real e código que entra no projeto de quem usa pelo CLI do
shadcn. A implementação é própria, sobre shadcn, Radix e Tailwind. A voz e o
vocabulário são os do Supernova (`docs/product/BRAND-VOICE.md` em
`supernova-ui`): pt-BR, verbo na frente, sentence case, proveniência nomeada
onde aparece.

## Memória

O contexto (material do responsável, decisões, diário) vive em
`DaniloAmaralUX/supernova-ui`, em `.claude/memory/` (comece por `INDEX.md` e
`decisoes.md`) e `.claude/work/<tarefa>/progress.md`. Leia antes de propor.

## Fontes únicas

- `constants/tokens.ts` gera `styles/tokens.css` e o item `supernova-theme`
  do `registry.json` via `pnpm tokens:build` (roda em `dev` e `build`). Não
  edite os gerados.
- `constants/roadmap.ts` é o roteiro de componentes do Supernova. A página do
  roteiro e toda contagem derivam dele. Nenhum número é escrito à mão.
- `constants/blocks.ts` lista os blocos; o código de cada um fica em
  `registry/new-york/blocks/<slug>/` e `blocks/index.ts` mapeia slug → página
  da prévia.
- `constants/themes.ts` guarda os presets e `scripts/build-themes.ts` gera
  `styles/palettes.css` e `public/themes/*.css` via `pnpm themes:build`. O tema
  padrão é `SUPERNOVA_THEME` em `lib/theme-presets.ts`.
- `data/acervo/*.json` são instantâneos com data dos registries do Supernova.
  A página do acervo e suas contagens saem deles; atualize copiando os
  arquivos de novo, nunca editando.

## Um componente ponta a ponta

Guia completo, com o que aprendemos das bibliotecas de amostra:
`content/docs/(root)/criar-componente.mdx` (`/docs/criar-componente`).

`registry/new-york/<nome>.tsx` (só depende de `@/lib/utils`, `radix-ui`,
`class-variance-authority`, `lucide-react`) → item em `registry.json` →
`examples/<nome>*.tsx` → `content/docs/components/<nome>.mdx` com
`ComponentPreview`, `InstallCommand`, props, acessibilidade e notas de
implementação quando houver → `meta.json` da pasta → roteiro com
`estado: "publicado"` e `rota` → instalação validada num consumidor limpo →
`instalacao: "cli" | "build"` (veja o guia).

## Gates

`pnpm check`, `pnpm build`, depois `pnpm typecheck` (o tipo `RouteContext` só
existe após o build). Sem afrouxar regra para passar. Publicação pelo Git: o
projeto Vercel `geistlabsds` faz preview do branch e produção de `main`.

## Idioma

Interface e docs em pt-BR. Nomes de componentes e props em inglês.
