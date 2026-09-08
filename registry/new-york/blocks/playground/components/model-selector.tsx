"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { Model, ModelType } from "../data/models";

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

const ModelItem = ({ model, isSelected, onSelect, onPeek }: ModelItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // O cmdk marca o item realçado com `aria-selected`; observar esse atributo
  // permite mostrar a ficha do modelo enquanto o usuário navega pela lista.
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected" &&
          element.getAttribute("aria-selected") === "true"
        ) {
          onPeek(model);
        }
      }
    });
    observer.observe(element, { attributes: true });
    return () => observer.disconnect();
  }, [model, onPeek]);

  return (
    <CommandItem
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
      onSelect={onSelect}
      ref={ref}
    >
      {model.name}
      <CheckIcon
        aria-hidden="true"
        className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}
      />
    </CommandItem>
  );
};

interface ModelSelectorProps extends React.ComponentProps<typeof Popover> {
  types: readonly ModelType[];
  models: Model[];
}

export const ModelSelector = ({
  models,
  types,
  ...props
}: ModelSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = useState<Model>(models[0]);

  return (
    <div className="grid gap-3">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Modelo</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          O modelo que vai gerar a resposta. Alguns servem a tarefas de
          linguagem natural; outros são especializados em código.
        </HoverCardContent>
      </HoverCard>
      <Popover onOpenChange={setOpen} open={open} {...props}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            aria-controls="model-list"
            aria-label="Selecionar um modelo"
            className="w-full justify-between"
            id="model"
            role="combobox"
            suffix={
              <ChevronsUpDownIcon
                aria-hidden="true"
                className="text-muted-foreground"
              />
            }
            variant="secondary"
          >
            {selectedModel.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0" id="model-list">
          <HoverCard>
            <HoverCardContent
              align="start"
              className="min-h-[280px]"
              forceMount
              side="left"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-muted-foreground text-sm">
                  {peekedModel.description}
                </div>
                {peekedModel.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="font-medium text-sm leading-none">
                      Pontos fortes
                    </h5>
                    <ul className="text-muted-foreground text-sm">
                      {peekedModel.strengths}
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-(--cmdk-list-height) max-h-[400px]">
                <CommandInput placeholder="Buscar modelos..." />
                <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup heading={type} key={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          isSelected={selectedModel.id === model.id}
                          key={model.id}
                          model={model}
                          onPeek={setPeekedModel}
                          onSelect={() => {
                            setSelectedModel(model);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
};
