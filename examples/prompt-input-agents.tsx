"use client";

import { useState } from "react";

import { PromptInput } from "@/registry/new-york/prompt-input";
import type { PromptChoice } from "@/registry/new-york/prompt-input";

const AGENTS: PromptChoice[] = [
  { label: "Assistente", value: "assistant" },
  { label: "Pesquisa", value: "research" },
  { label: "Código", value: "code" },
  { disabled: true, label: "Revisão", value: "review" },
];

export const PromptInputAgentsDemo = () => {
  const [agent, setAgent] = useState("assistant");

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <PromptInput
        agent={agent}
        agents={AGENTS}
        onAgentChange={setAgent}
        showHistory={false}
      />
      <p className="text-[13px] text-muted-foreground">
        Agente selecionado: <code>{agent}</code>
      </p>
    </div>
  );
};
