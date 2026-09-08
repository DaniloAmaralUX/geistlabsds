import { CheckIcon, CircleDotIcon } from "lucide-react";

import { Badge } from "@/registry/new-york/badge";

export const BadgePillDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge shape="pill" color="green">
      <CheckIcon />
      Pronto
    </Badge>
    <Badge shape="pill" appearance="subtle" color="amber">
      <CircleDotIcon />
      Em revisão
    </Badge>
    <Badge shape="pill" appearance="subtle">
      Inventariado
    </Badge>
  </div>
);
