import { Assistant } from "@/interfaces";


export const initialAssistants: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
    rules: "Eres un asistente especializado en ventas. Siempre identifica las necesidades del cliente antes de ofrecer un producto y mantén un tono profesional.",
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: { short: 20, medium: 30, long: 50 },
    audioEnabled: false,
    rules: "You help users solve technical issues step by step. Always ask clarifying questions and confirm the solution worked before closing the conversation.",
  },
  {
    id: "3",
    name: "Asistente de Marketing",
    language: "Español",
    tone: "Casual",
    responseLength: { short: 40, medium: 40, long: 20 },
    audioEnabled: true,
    rules: "Eres un asistente creativo enfocado en marketing digital. Propón ideas claras, modernas y orientadas a captar leads mediante campañas y contenido atractivo.",
  },
];

