import { CirclePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Cabeçalho fixo da área de conteúdo, com título e ação de criação rápida. */
export const SiteHeader = () => (
  <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/90 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <h1 className="text-base font-medium">Documentos</h1>
      <div className="ml-auto flex items-center gap-2">
        <Button
          className="hidden sm:inline-flex"
          prefix={<CirclePlusIcon aria-hidden="true" />}
          size="sm"
          variant="primary"
        >
          Criar rápido
        </Button>
      </div>
    </div>
  </header>
);
