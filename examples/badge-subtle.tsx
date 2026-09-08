import { Badge } from "@/registry/new-york/badge";

export const BadgeSubtleDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge appearance="subtle">Gray</Badge>
    <Badge appearance="subtle" color="blue">
      Blue
    </Badge>
    <Badge appearance="subtle" color="green">
      Green
    </Badge>
    <Badge appearance="subtle" color="red">
      Red
    </Badge>
    <Badge appearance="subtle" color="amber">
      Amber
    </Badge>
    <Badge appearance="subtle" color="violet">
      Violet
    </Badge>
  </div>
);
