"use client";

import { useState } from "react";

import { Button } from "@/registry/new-york/button";

export const ButtonLoadingDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading={loading} onClick={handleClick}>
        {loading ? "Salvando…" : "Salvar"}
      </Button>
      <Button loading variant="secondary">
        Carregando
      </Button>
    </div>
  );
};
