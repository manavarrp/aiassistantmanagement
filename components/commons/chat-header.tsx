"use client";

import { Assistant } from "@/interfaces";

interface Props {
  assistant: Assistant;
}

export default function AssistantHeader({ assistant }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow space-y-1">
      <h2 className="text-xl font-bold">{assistant.name}</h2>
      <p>
        <strong>Idioma:</strong> {assistant.language} | <strong>Tono:</strong>{" "}
        {assistant.tone}
      </p>
    </div>
  );
}
