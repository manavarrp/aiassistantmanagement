import { Assistant } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";



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

      setInitialAssistants: (assistants) => {
        if (get().assistants.length === 0) {
          set({ assistants });
        }
      },

      addAssistant: (assistant) =>
        set({ assistants: [...get().assistants, assistant] }),

      updateAssistant: (assistant) =>
        set({
          assistants: get().assistants.map((a) =>
            a.id === assistant.id ? assistant : a
          ),
        }),

      deleteAssistant: (id) =>
        set({
          assistants: get().assistants.filter((a) => a.id !== id),
        }),
    }),
    {
      name: "assistants-storage",
    }
  )
);
