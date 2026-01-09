"use client";

import { useEffect, useState } from "react";
import { Assistant } from "@/interfaces";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAssistantsStore } from "@/store/assistant/assistants.store";

interface Props {
  assistant: Assistant;
}

export default function AssistantTraining({ assistant }: Props) {
  const updateAssistant = useAssistantsStore((state) => state.updateAssistant);

  const [prompt, setPrompt] = useState("");
  const [msg, setMsg] = useState("");

  // Cargar entrenamiento desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`training_${assistant.id}`);
    if (stored) setPrompt(stored);
  }, [assistant.id]);

  const handleSave = () => {
    updateAssistant({ ...assistant, training: prompt });
    localStorage.setItem(`training_${assistant.id}`, prompt);
    setMsg("¡Entrenamiento guardado!");
    setTimeout(() => setMsg(""), 2000);
  };

  const handleClear = () => {
    setPrompt("");
    localStorage.removeItem(`training_${assistant.id}`);
    setMsg("Entrenamiento borrado");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-semibold">Entrenamiento</h3>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe instrucciones o prompts..."
      />
      <div className="flex justify-between items-center space-x-2">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="secondary" onClick={handleClear}>
          Limpiar
        </Button>
        {msg && <span className="text-green-600">{msg}</span>}
      </div>
    </div>
  );
}
