"use client";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MaxLengthSelectorProps {
  defaultValue: number[];
}

export const MaxLengthSelector = ({ defaultValue }: MaxLengthSelectorProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Tamanho máximo</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-muted-foreground text-sm hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              aria-label="Tamanho máximo"
              defaultValue={value}
              id="maxlength"
              max={4000}
              onValueChange={setValue}
              step={10}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Número máximo de tokens a gerar. Cada requisição pode usar até 2.048
          ou 4.000 tokens, divididos entre prompt e resposta. O limite exato
          varia por modelo.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
