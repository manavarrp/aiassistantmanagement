"use client";

import { useState } from "react";
import { Assistant } from "@/interfaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  assistant: Assistant;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SIMULATED_RESPONSES = [
  "Entendido, ¿en qué más puedo ayudarte?",
  "Esa es una excelente pregunta. Déjame explicarte...",
  "Claro, con gusto te ayudo con eso.",
  "¿Podrías darme más detalles sobre tu consulta?",
  "Perfecto, he registrado esa información.",
];

export default function AssistantChat({ assistant }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const resp: Message = {
        role: "assistant",
        content: SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)],
      };
      setMessages((prev) => [...prev, resp]);
    }, 1000 + Math.random() * 1000);
  };

  const handleReset = () => setMessages([]);

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-semibold">Chat Simulado</h3>
      <div className="border rounded p-2 h-64 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full"
        />
        <div className="flex justify-between sm:space-x-2 w-full sm:w-auto">
          <Button onClick={handleSend}>Enviar</Button>
          <Button variant="secondary" onClick={handleReset}>
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
