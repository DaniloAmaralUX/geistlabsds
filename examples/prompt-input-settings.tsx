"use client";

import { useState } from "react";

import { PromptInput } from "@/registry/new-york/prompt-input";
import type {
  PromptSetting,
  PromptSettings,
} from "@/registry/new-york/prompt-input";

const SETTINGS_MENU: PromptSetting[] = [
  {
    choices: [
      {
        description: "Equilíbrio entre velocidade e qualidade",
        label: "Padrão",
        value: "default",
      },
      {
        description: "Respostas mais rápidas e curtas",
        label: "Rápido",
        value: "fast",
      },
      {
        description: "Raciocínio mais longo para tarefas difíceis",
        label: "Profundo",
        value: "deep",
      },
    ],
    id: "model",
    label: "Modelo",
    moreLabel: "Trocar modelo",
    variant: "highlight",
  },
  {
    choices: [
      { label: "Baixo", value: "low" },
      { label: "Médio", value: "medium" },
      { label: "Alto", value: "high" },
    ],
    id: "effort",
    label: "Esforço",
    variant: "list",
  },
  {
    choices: [
      { label: "Neutro", value: "neutral" },
      { label: "Direto", value: "direct" },
      { label: "Didático", value: "teaching" },
    ],
    id: "tone",
    label: "Tom",
    variant: "list",
  },
];

const INITIAL: PromptSettings = {
  effort: "medium",
  model: "default",
  tone: "neutral",
};

export const PromptInputSettingsDemo = () => {
  const [settings, setSettings] = useState<PromptSettings>(INITIAL);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <PromptInput
        commands={[
          {
            label: "Restaurar padrões",
            onSelect: () => setSettings(INITIAL),
            shortcut: "⌘⇧R",
          },
        ]}
        onSettingsChange={setSettings}
        settings={settings}
        settingsMenu={SETTINGS_MENU}
        showHistory={false}
      />
      <p className="text-[13px] text-muted-foreground">
        Configurações: <code>{JSON.stringify(settings)}</code>
      </p>
    </div>
  );
};
