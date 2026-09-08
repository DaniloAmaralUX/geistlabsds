import { Button } from "@/registry/new-york/button";

export const ButtonDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
  </div>
);
