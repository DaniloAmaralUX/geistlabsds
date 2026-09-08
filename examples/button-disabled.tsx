import { Button } from "@/registry/new-york/button";

export const ButtonDisabledDemo = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Primary</Button>
    <Button disabled variant="secondary">
      Secondary
    </Button>
    <Button disabled variant="error">
      Error
    </Button>
  </div>
);
