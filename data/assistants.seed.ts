import { Assistant } from "@/interfaces";


export const initialAssistants: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
},
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: { short: 20, medium: 30, long: 50 },
    audioEnabled: false,
 },
  {
    id: "3",
    name: "Asistente de Marketing",
    language: "Español",
    tone: "Casual",
    responseLength: { short: 40, medium: 40, long: 20 },
    audioEnabled: true,
  },
];

