import { Note } from "@/registry/new-york/note";

export const NoteTypesDemo = () => (
  <div className="flex w-full max-w-lg flex-col gap-3">
    <Note type="secondary">Uma nota secundária, com fundo discreto.</Note>
    <Note type="success">A instalação terminou sem erros.</Note>
    <Note type="error">O build falhou. Veja o log para a causa.</Note>
    <Note type="warning">Esta ação sobrescreve o arquivo existente.</Note>
    <Note type="violet">Recurso em prévia; pode mudar.</Note>
  </div>
);
