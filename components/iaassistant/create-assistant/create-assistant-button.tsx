"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/modal/modal-store";

const CreateAssistantButton = () => {
  const { onOpen } = useModal();

  return (
    <Button variant="primary" onClick={() => onOpen("createAssistant")}>
      Crear asistente
    </Button>
  );
};

export default CreateAssistantButton;
