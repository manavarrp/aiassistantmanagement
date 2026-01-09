"use client";

import { useEffect } from "react";
import { useAssistantsStore } from "@/store/assistant/assistants.store";
import { initialAssistants } from "@/data/assistants.seed";
import CardWrapped from "@/components/commons/card-wrapped";

const GetAssistant = () => {
  const { assistants, setInitialAssistants } = useAssistantsStore();

  useEffect(() => {
    setInitialAssistants(initialAssistants);
  }, [setInitialAssistants]);

  if (!assistants.length) {
    return (
      <CardWrapped>
        <p className="text-center text-neutral-500">
          No hay asistentes creados
        </p>
      </CardWrapped>
    );
  }

  console.log("asdasd", assistants)
  return (
    <section className="flex flex-col items-center gap-6">
      {assistants.map((assistant) => (
        <CardWrapped key={assistant.id}>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-zinc-300">
              {assistant.name}
            </h3>

            <p>
              <strong>Idioma:</strong> {assistant.language}
            </p>

            <p>
              <strong>Tono:</strong> {assistant.tone}
            </p>

          </div>
        </CardWrapped>
      ))}
    </section>
  );
};

export default GetAssistant;
