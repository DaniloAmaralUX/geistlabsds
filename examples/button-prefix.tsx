import { ArrowRightIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/registry/new-york/button";

export const ButtonPrefixDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button prefix={<DownloadIcon />}>Baixar</Button>
    <Button variant="secondary" suffix={<ArrowRightIcon />}>
      Continuar
    </Button>
  </div>
);
