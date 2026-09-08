"use client";

import { EllipsisIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const PresetActions = () => {
  const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Ações" shape="square" variant="secondary">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Preferências do filtro de conteúdo
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            variant="destructive"
          >
            Excluir predefinição
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog onOpenChange={setIsOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preferências do filtro de conteúdo</DialogTitle>
            <DialogDescription>
              O filtro de conteúdo sinaliza textos que podem violar a política
              de conteúdo. Ele usa o endpoint de moderação, gratuito para
              moderar o tráfego da sua API.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <h4 className="text-muted-foreground text-sm">
              Avisos do playground
            </h4>
            <div className="flex items-start justify-between gap-4 pt-3">
              <Switch defaultChecked={true} id="show" name="show" />
              <Label className="grid gap-1 font-normal" htmlFor="show">
                <span className="font-semibold">
                  Mostrar um aviso quando o conteúdo for sinalizado
                </span>
                <span className="text-muted-foreground text-sm">
                  Um aviso aparece quando for detectado conteúdo sexual, de
                  ódio, violento ou de automutilação.
                </span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A predefinição deixará de estar
              acessível para você e para quem a recebeu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              onClick={() => {
                setShowDeleteDialog(false);
                toast.success("A predefinição foi excluída.");
              }}
              variant="error"
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
