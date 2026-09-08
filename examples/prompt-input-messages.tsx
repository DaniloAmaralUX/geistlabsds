"use client";

import { PromptInput } from "@/registry/new-york/prompt-input";

export const PromptInputMessagesDemo = () => (
  <div className="w-full max-w-xl">
    <PromptInput
      agents={[
        { label: "Assistente", value: "assistant" },
        { label: "Código", value: "code" },
      ]}
      placeholder="Envie algumas mensagens para ver o histórico…"
      showHistory
    />
  </div>
);
