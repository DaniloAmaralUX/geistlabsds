import { Input } from "@/registry/new-york/input";

export const InputPrefixDemo = () => (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <Input
      label="Domínio"
      prefix="https://"
      suffix=".vercel.app"
      placeholder="meu-site"
    />
    <Input label="Preço" prefix="R$" placeholder="0,00" inputMode="decimal" />
  </div>
);
