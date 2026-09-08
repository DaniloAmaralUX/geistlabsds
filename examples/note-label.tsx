import { Note } from "@/registry/new-york/note";

export const NoteLabelDemo = () => (
  <div className="flex w-full max-w-lg flex-col gap-3">
    <Note label="Dica:">Rótulo personalizado no lugar do padrão.</Note>
    <Note label={false} type="success">
      Sem rótulo, só a mensagem.
    </Note>
  </div>
);
