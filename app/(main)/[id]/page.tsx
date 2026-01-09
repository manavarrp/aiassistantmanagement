"use client";

import { useParams } from "next/navigation";
import { useAssistantsStore } from "@/store/assistant/assistants.store";
import AssistantHeader from "@/components/commons/chat-header";
import AssistantTraining from "@/components/chat/assistant-training";
import AssistantChat from "@/components/chat/assistant-chat";

export default function AssistantPage() {
  const { id } = useParams();
  const assistants = useAssistantsStore((state) => state.assistants);
  const assistant = assistants.find((a) => a.id === id);

  if (!assistant) return <div className="p-6">Cargando asistente...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <AssistantHeader assistant={assistant} />
      <AssistantTraining assistant={assistant} />
      <AssistantChat assistant={assistant} />
    </div>
  );
}
