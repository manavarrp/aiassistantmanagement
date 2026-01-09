"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/modal/modal-store";

const CreateAssistantButton = () => {
  const { onOpen } = useModal();

  return (
    <Button variant="primary" className="mt-20 mr-10" onClick={() => onOpen("createAssistant")}>
      Crear asistente
    </Button>
  );
};

export default CreateAssistantButton;
