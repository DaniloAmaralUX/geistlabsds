import { Badge } from "@/registry/new-york/badge";

export const BadgeDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge>Gray</Badge>
    <Badge color="blue">Blue</Badge>
    <Badge color="green">Green</Badge>
    <Badge color="red">Red</Badge>
    <Badge color="amber">Amber</Badge>
    <Badge color="violet">Violet</Badge>
  </div>
);
