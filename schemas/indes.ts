import z from "zod";

export const CreateAssistantSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  language: z.enum(["Español", "Inglés", "Portugués"]),
  tone: z.enum(["Formal", "Casual", "Profesional", "Amigable"]),
  responseLength: z.object({
    short: z.number().min(0).max(100),
    medium: z.number().min(0).max(100),
    long: z.number().min(0).max(100),
  }).refine(
    (val) => val.short + val.medium + val.long === 100,
    { message: "La suma de cortas + medias + largas debe ser 100% para guardar.", path: ["short"] }
  ),
  audioEnabled: z.boolean(),
});


