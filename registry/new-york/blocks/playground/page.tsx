import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { CodeViewer } from "./components/code-viewer";
import { MaxLengthSelector } from "./components/maxlength-selector";
import { ModelSelector } from "./components/model-selector";
import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
import { PresetShare } from "./components/preset-share";
import { TemperatureSelector } from "./components/temperature-selector";
import { TopPSelector } from "./components/top-p-selector";
import { models, types } from "./data/models";
import { presets } from "./data/presets";

/**
 * Playground — Supernova.
 *
 * Área de prompt com três modos (completar, inserir, editar), painel de
 * parâmetros do modelo e ações de predefinição. Base: `shadcn-examples`
 * (shadcn/ui, MIT), adaptado.
 */
export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-2 p-4 py-4 sm:flex-row sm:items-center sm:gap-0 md:h-16">
        <h2 className="font-semibold text-lg">Playground</h2>
        <div className="ml-auto flex w-full gap-2 sm:justify-end">
          <PresetSelector presets={presets} />
          <PresetSave />
          <div className="hidden gap-2 md:flex">
            <CodeViewer />
            <PresetShare />
          </div>
          <PresetActions />
        </div>
      </div>
      <Separator />
      <Tabs
        className="flex h-[calc(100vh-4.5rem)] flex-1 flex-col"
        defaultValue="complete"
      >
        <div className="flex flex-1 flex-col p-4">
          <div className="grid flex-1 items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col gap-6 sm:flex md:order-2">
              <div className="grid gap-3">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="font-medium text-sm leading-none">
                      Modo
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Escolha a interface que melhor serve à tarefa: um prompt
                    simples para completar, um início e um fim para inserir
                    texto no meio, ou um texto com instruções para editar.
                  </HoverCardContent>
                </HoverCard>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="complete">
                    <span className="sr-only">Completar</span>
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="12"
                        x="4"
                        y="3"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="12"
                        x="4"
                        y="7"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="4"
                        y="11"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="4"
                        y="15"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="8.5"
                        y="11"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="8.5"
                        y="15"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="13"
                        y="11"
                      />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="insert">
                    <span className="sr-only">Inserir</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                        fill="currentColor"
                        fillRule="evenodd"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="4"
                        y="15"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="8.5"
                        y="15"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="13"
                        y="15"
                      />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="edit">
                    <span className="sr-only">Editar</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="12"
                        x="4"
                        y="3"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="12"
                        x="4"
                        y="7"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="4"
                        y="11"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="4"
                        x="4"
                        y="15"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        rx="1"
                        width="3"
                        x="8.5"
                        y="11"
                      />
                      <path
                        d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                        fill="currentColor"
                      />
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </div>
              <ModelSelector models={models} types={types} />
              <TemperatureSelector defaultValue={[0.56]} />
              <MaxLengthSelector defaultValue={[256]} />
              <TopPSelector defaultValue={[0.9]} />
            </div>
            <div className="flex flex-1 flex-col *:data-[slot=tabs-content]:flex-1 md:order-1">
              <TabsContent className="mt-0 border-0 p-0" value="complete">
                <div className="flex h-full flex-col gap-4">
                  <Textarea
                    aria-label="Prompt"
                    className="flex-1 p-4"
                    placeholder="Escreva um slogan para uma sorveteria"
                  />
                  <div className="flex items-center gap-2">
                    <Button>Enviar</Button>
                    <Button
                      aria-label="Mostrar histórico"
                      shape="square"
                      variant="secondary"
                    >
                      <RotateCcwIcon />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                className="mt-0 flex flex-col gap-4 border-0 p-0"
                value="insert"
              >
                <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                  <Textarea
                    aria-label="Texto com marcador de inserção"
                    className="h-full p-4"
                    placeholder="Estamos escrevendo para [inserir]. Parabéns da equipe!"
                  />
                  <div className="rounded-md border bg-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <Button>Enviar</Button>
                  <Button
                    aria-label="Mostrar histórico"
                    shape="square"
                    variant="secondary"
                  >
                    <RotateCcwIcon />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent
                className="mt-0 flex flex-col gap-4 border-0 p-0"
                value="edit"
              >
                <div className="grid h-full gap-6 lg:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                      <Label className="sr-only" htmlFor="input">
                        Entrada
                      </Label>
                      <Textarea
                        className="flex-1 p-4"
                        id="input"
                        placeholder="Nós vai ao mercado."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="instructions">Instruções</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Corrija a gramática."
                      />
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <Button>Enviar</Button>
                  <Button
                    aria-label="Mostrar histórico"
                    shape="square"
                    variant="secondary"
                  >
                    <RotateCcwIcon />
                  </Button>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
