
import { Assistant } from "@/interfaces";
import { create } from "zustand";

export type ModalType = "createAssistant" | "editAssistant" | "deleteAssistant" ;

interface ModalData {
  assistant?: Assistant;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  getAssistant: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  getAssistant: () => {}, 
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => {
    set((state) => {
      state.getAssistant(); 
      return { type: null, isOpen: false, data: {} };
    });
  },
}));
