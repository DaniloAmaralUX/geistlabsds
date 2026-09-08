import { Button } from "@/registry/new-york/button";
import { Note } from "@/registry/new-york/note";

export const NoteActionDemo = () => (
  <div className="w-full max-w-lg">
    <Note
      type="warning"
      action={
        <Button size="sm" variant="secondary">
          Atualizar
        </Button>
      }
    >
      Há uma versão nova do tema.
    </Note>
  </div>
);
