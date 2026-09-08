import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const PresetSave = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">Salvar</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Salvar predefinição</DialogTitle>
        <DialogDescription>
          Salva o estado atual do playground como uma predefinição, para reabrir
          depois ou compartilhar com outras pessoas.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <Input autoFocus id="name" label="Nome" />
        <div className="grid gap-3">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
