import { Note } from "@/registry/new-york/note";

export const NoteFillDemo = () => (
  <div className="flex w-full max-w-lg flex-col gap-3">
    <Note fill>Preenchimento sólido no tipo padrão.</Note>
    <Note fill type="success">
      Publicado com sucesso.
    </Note>
    <Note fill type="error">
      Permissão negada.
    </Note>
    <Note fill type="warning">
      Cota quase no limite.
    </Note>
  </div>
);
