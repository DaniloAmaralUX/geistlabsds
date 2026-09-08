import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const PresetShare = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="secondary">Compartilhar</Button>
    </PopoverTrigger>
    <PopoverContent align="end" className="flex w-[520px] flex-col gap-4">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h3 className="font-semibold text-lg">Compartilhar predefinição</h3>
        <p className="text-muted-foreground text-sm">
          Quem tiver este link e uma conta poderá ver a predefinição.
        </p>
      </div>
      <div className="relative flex-1">
        <Label className="sr-only" htmlFor="link">
          Link
        </Label>
        <Input
          className="pr-10"
          defaultValue="https://exemplo.com.br/playground/p/7bbKYQvsVkNmVb8NGcdUOLae"
          id="link"
          readOnly
        />
        <Button
          aria-label="Copiar link"
          className="absolute top-1 right-1"
          shape="square"
          size="sm"
          type="button"
          variant="tertiary"
        >
          <CopyIcon className="size-3.5" />
        </Button>
      </div>
    </PopoverContent>
  </Popover>
);
