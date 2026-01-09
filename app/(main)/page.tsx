import Header from "@/components/commons/header";
import CreateAssistantButton from "@/components/iaassistant/create-assistant/create-assistant-button";
import GetAssistant from "@/components/iaassistant/get-assistant";
import { Users } from "lucide-react";

export default function Home() {
  return (
    <main className="flex justify-center">

      {/* CONTENEDOR CENTRAL */}
      <div className="w-full max-w-5xl px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mt-20 mb-8">
          <Header
            title="ASISTENTES IA"
            icon={
              <Users className="w-10 h-10 text-blue-900 dark:text-zinc-400" />
            }
          />
          <CreateAssistantButton />
        </div>

        {/* CARD */}
          <GetAssistant />
        

      </div>
    </main>
  );
}
