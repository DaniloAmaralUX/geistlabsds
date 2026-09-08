import { Input } from "@/registry/new-york/input";

export const InputErrorDemo = () => (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <Input
      label="E-mail"
      defaultValue="danilo@"
      error="Informe um e-mail completo, com o domínio."
    />
    <Input
      label="Usuário"
      placeholder="seu-usuario"
      description="Só letras minúsculas, números e hífen."
    />
  </div>
);
