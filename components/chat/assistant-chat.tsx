"use client";

import { useEffect, useState } from "react";
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
    const [isTyping, setIsTyping] = useState(false); 

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        // Agregar mensaje del usuario
        const newMessages: Message[] = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        // Simular "escribiendo..."
        setIsTyping(true);
        setTimeout(() => {
            const resp =
                SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
            const updated: Message[] = [...newMessages, { role: "assistant", content: resp }];
            setMessages(updated);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleReset = () => {
        setMessages([]);
        setInput("");
        setIsTyping(false);
    };

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
                {isTyping && (
                    <div className="p-2 rounded bg-gray-200 text-left italic text-gray-600">
                        Escribiendo...
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="w-full"
                />
                <div className="flex justify-between sm:space-x-2 w-full sm:w-auto">
                    <Button onClick={handleSend} disabled={isTyping}>
                        Enviar
                    </Button>
                    <Button variant="secondary" onClick={handleReset} disabled={isTyping}>
                        Reiniciar
                    </Button>
                </div>
            </div>
        </div>
    );
}
