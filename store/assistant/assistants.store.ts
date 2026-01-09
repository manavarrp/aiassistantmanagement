import { Assistant } from "@/interfaces";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";


// Estado y acciones del store de asistentes
interface AssistantsState {
  assistants: Assistant[];
  loading: boolean;

  setInitialAssistants: (assistants: Assistant[]) => void;
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (assistant: Assistant) => void;
  deleteAssistant: (id: string) => void;
}

export const useAssistantsStore = create<AssistantsState>()(
  persist(
    (set, get) => ({
      assistants: [],
      loading: false,

      // Inicializa lista si está vacía
      setInitialAssistants: (assistants) => {
        if (get().assistants.length === 0) {
          set({ assistants });
        }
      },
      // Agregar asistente
      addAssistant: (assistant) => {
        set({ assistants: [...get().assistants, assistant] });
        toast.success("¡Asistente creada exitosamente!");
      },
      // Actualizar asistente existente
      updateAssistant: (assistant) => {
        set({
          assistants: get().assistants.map((a) =>
            a.id === assistant.id ? assistant : a
          ),
        });
        toast.info("¡Asistente actualizada!");
      },
      // Eliminar asistente
      deleteAssistant: (id) => {
        set({
          assistants: get().assistants.filter((a) => a.id !== id),
        });
        toast.error("¡Asistente eliminada!");
      },
    }),
    {
      name: "assistants-storage",
    }
  )
);
