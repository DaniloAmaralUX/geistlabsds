import { Input } from "@/registry/new-york/input";

export const InputSizesDemo = () => (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <Input size="sm" placeholder="Small" aria-label="Small" />
    <Input size="md" placeholder="Medium" aria-label="Medium" />
    <Input size="lg" placeholder="Large" aria-label="Large" />
  </div>
);
