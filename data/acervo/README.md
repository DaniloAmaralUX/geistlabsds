# Instantâneos do acervo Supernova

Cópias, com data, dos dados publicados pelos repositórios do Supernova, para o
catálogo do design system listar o acervo sem mover código:

| Arquivo                            | Origem                                                         | Conteúdo                                                                  |
| ---------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `supernova-ui.registry.json`       | `DaniloAmaralUX/supernova-ui` → `public/r/registry.json`       | índice do registry: efeitos (4 frameworks), blocos, temas, fontes, bases  |
| `supernova-ui.blocks.json`         | `supernova-ui` → `src/data/generated/compound-blocks.json`     | blocos com categoria, tipo e comando de instalação                        |
| `supernova-ui.previews.json`       | `supernova-ui` → `src/data/generated/item-previews.json`       | prévias por item                                                          |
| `supernova-layouts.json`           | `supernova-ui` → `src/data/generated/supernova-layouts.json`   | layouts sincronizados de `supernova-layouts`, com maturidade e instalação |
| `supernova-catalogo.registry.json` | `DaniloAmaralUX/supernova-catalogo` → `public/r/registry.json` | telas, átomos e preset do catálogo                                        |

Data do instantâneo: 2026-09-08. Atualizar com `pnpm acervo:sync` (a criar)
ou copiando os arquivos de novo; nunca editar à mão.
