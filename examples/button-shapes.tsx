import { PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/registry/new-york/button";

export const ButtonShapesDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button shape="square" aria-label="Adicionar">
      <PlusIcon />
    </Button>
    <Button shape="circle" variant="secondary" aria-label="Buscar">
      <SearchIcon />
    </Button>
    <Button shape="circle" size="sm" variant="tertiary" aria-label="Adicionar">
      <PlusIcon />
    </Button>
  </div>
);
