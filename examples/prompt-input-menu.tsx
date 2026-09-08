"use client";

import {
  CameraIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  PaperclipIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import { PromptInput } from "@/registry/new-york/prompt-input";
import type {
  PromptMenuChange,
  PromptMenuItem,
} from "@/registry/new-york/prompt-input";

const MENU: PromptMenuItem[] = [
  {
    icon: <PaperclipIcon />,
    label: "Anexar arquivo",
    shortcut: "⌘⇧A",
    value: "attach",
  },
  {
    icon: <CameraIcon />,
    label: "Capturar tela",
    value: "screenshot",
  },
  { type: "separator", value: "sep-1" },
  {
    defaultChecked: true,
    icon: <GlobeIcon />,
    label: "Buscar na web",
    type: "toggle",
    value: "web",
  },
  {
    icon: <SearchIcon />,
    label: "Pesquisa profunda",
    type: "toggle",
    value: "deep-research",
  },
  { type: "separator", value: "sep-2" },
  {
    icon: <ImageIcon />,
    items: [
      { label: "Gerar imagem", value: "image-generate" },
      { label: "Editar imagem", value: "image-edit" },
      { type: "separator", value: "sep-3" },
      {
        defaultChecked: false,
        icon: <FileTextIcon />,
        label: "Descrever ao enviar",
        type: "toggle",
        value: "image-describe",
      },
    ],
    label: "Imagens",
    type: "submenu",
    value: "images",
  },
];

const describe = (change: PromptMenuChange) => {
  if (change.type === "toggle") {
    return `${change.value}: ${change.checked ? "ligado" : "desligado"}`;
  }
  return `ação: ${change.value}`;
};

export const PromptInputMenuDemo = () => {
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <PromptInput
        menu={MENU}
        onMenuChange={(change) =>
          setLog((current) => [describe(change), ...current].slice(0, 4))
        }
        showHistory={false}
      />
      <ul className="min-h-5 text-[13px] text-muted-foreground">
        {log.map((entry, index) => (
          <li key={`${index}-${entry}`}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};
