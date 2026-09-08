"use client";

import { useState } from "react";

import { PromptInput } from "@/registry/new-york/prompt-input";

export const PromptInputDemo = () => {
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <PromptInput
        onMicClick={() => setLast("Voz: ainda não implementada")}
        onSend={({ text }) => setLast(text)}
        showHistory={false}
      />
      <p className="text-[13px] text-muted-foreground">
        {last ? `Último envio: ${last}` : "Nada enviado ainda."}
      </p>
    </div>
  );
};
