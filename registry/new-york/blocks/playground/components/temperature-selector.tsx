"use client";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TemperatureSelectorProps {
  defaultValue: number[];
}

export const TemperatureSelector = ({
  defaultValue,
}: TemperatureSelectorProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperatura</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-muted-foreground text-sm hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              aria-label="Temperatura"
              defaultValue={value}
              id="temperature"
              max={1}
              onValueChange={setValue}
              step={0.1}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controla a aleatoriedade: valores menores geram respostas menos
          variadas. Perto de zero, o modelo fica determinístico e repetitivo.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
