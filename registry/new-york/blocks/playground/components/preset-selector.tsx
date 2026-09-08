"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { Preset } from "../data/presets";

interface PresetSelectorProps extends React.ComponentProps<typeof Popover> {
  presets: Preset[];
}

export const PresetSelector = ({ presets, ...props }: PresetSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();

  return (
    <Popover onOpenChange={setOpen} open={open} {...props}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-controls="preset-list"
          aria-label="Carregar uma predefinição"
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
          role="combobox"
          suffix={
            <ChevronsUpDownIcon aria-hidden="true" className="opacity-50" />
          }
          variant="secondary"
        >
          {selectedPreset ? selectedPreset.name : "Carregar predefinição..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" id="preset-list">
        <Command>
          <CommandInput placeholder="Buscar predefinições..." />
          <CommandList>
            <CommandEmpty>Nenhuma predefinição encontrada.</CommandEmpty>
            <CommandGroup heading="Exemplos">
              {presets.map((preset) => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset);
                    setOpen(false);
                  }}
                >
                  {preset.name}
                  <CheckIcon
                    aria-hidden="true"
                    className={cn(
                      "ml-auto",
                      selectedPreset?.id === preset.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>Mais exemplos</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
