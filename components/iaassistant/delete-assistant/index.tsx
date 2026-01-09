"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/store/modal/modal-store";
import { useAssistantsStore } from "@/store/assistant/assistants.store";

export const DeleteAssistant = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteAssistant";

  const assistant = data.assistant;
  const deleteAssistant = useAssistantsStore((state) => state.deleteAssistant);

  if (!assistant) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Eliminar Asistente</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar al asistente <strong>{assistant.name}</strong>? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteAssistant(assistant.id);
              onClose();
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
