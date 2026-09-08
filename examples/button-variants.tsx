import { Button } from "@/registry/new-york/button";

export const ButtonVariantsDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="error">Error</Button>
    <Button variant="warning">Warning</Button>
  </div>
);
