import { Badge } from "@/registry/new-york/badge";

export const BadgeSizesDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge size="sm" color="blue">
      Small
    </Badge>
    <Badge size="md" color="blue">
      Medium
    </Badge>
    <Badge size="lg" color="blue">
      Large
    </Badge>
  </div>
);
