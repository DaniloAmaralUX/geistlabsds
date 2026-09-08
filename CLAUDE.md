# LAB / DESIGN — comece aqui

O nosso Geist: design system com referência visual no Geist da Vercel e
implementação própria sobre shadcn, Radix e Tailwind. **Nunca copie código,
CSS ou texto do Geist**; ele é referência de inventário e de aparência.

## Memória

O contexto (material do responsável, decisões, diário) vive em
`DaniloAmaralUX/supernova-ui`, em `.claude/memory/` (comece por `INDEX.md` e
`decisoes.md`) e `.claude/work/poc-geist-1/progress.md`. Leia antes de propor.

## Fontes únicas

- `constants/tokens.ts` gera `styles/tokens.css` e o item `supernova-theme`
  do `registry.json` via `pnpm tokens:build` (roda em `dev` e `build`). Não
  edite os gerados.
- `constants/roadmap.ts` é o roteiro de componentes do Supernova. A página do
  roteiro e toda contagem derivam dele. Nenhum número é escrito à mão.

## Um componente ponta a ponta

Guia completo, com o que aprendemos das bibliotecas de amostra:
`content/docs/(root)/criar-componente.mdx` (`/docs/criar-componente`).

`registry/new-york/<nome>.tsx` (só depende de `@/lib/utils`, `radix-ui`,
`class-variance-authority`, `lucide-react`) → item em `registry.json` →
`examples/<nome>*.tsx` → `content/docs/components/<nome>.mdx` com
`ComponentPreview`, `InstallCommand`, props, acessibilidade e "diferenças em
relação ao Geist" → `meta.json` da pasta → inventário com `estado: "publicado"`
e `rota` → instalação validada num consumidor limpo → `instalacao: "cli" | "build"` (veja o guia).

## Gates

`pnpm check`, `pnpm build`, depois `pnpm typecheck` (o tipo `RouteContext` só
existe após o build). Sem afrouxar regra para passar. Publicação pelo Git: o
projeto Vercel `geistlabsds` faz preview do branch e produção de `main`.

## Idioma

Interface e docs em pt-BR. Nomes de componentes e props em inglês.
