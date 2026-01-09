"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useModal } from "@/store/modal/modal-store";
import { useAssistantsStore } from "@/store/assistant/assistants.store";
import { CreateAssistantSchema } from "@/schemas/indes";
import { LANGUAGES } from "@/data/data.seed";
import { TONES } from "@/data/tone.seed";
type FormData = z.infer<typeof CreateAssistantSchema>;

export const CreateAssistant = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAssistant";

  const addAssistant = useAssistantsStore((state) => state.addAssistant);
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<FormData>({
    resolver: zodResolver(CreateAssistantSchema),
    defaultValues: {
      name: "",
      language: "Español",
      tone: "Formal",
      responseLength: { short: 0, medium: 0, long: 0 },
      audioEnabled: false,
    },
  });

  /* ---------- STEP HANDLERS ---------- */
  const handleNext = async () => {
    const valid = await form.trigger(["name", "language", "tone"]);
    if (valid) setStep(2);
  };

  const onSubmit = (values: FormData) => {
    addAssistant({
      id: crypto.randomUUID(),
      ...values,
      audioEnabled: values.audioEnabled ?? true,
    });

    form.reset();
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crear Asistente
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Paso {step} de 2
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 px-6">

              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nombre del asistente" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un idioma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGES.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tono</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un tono" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TONES.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <>
                  {(["short", "medium", "long"] as const).map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={`responseLength.${key}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {key === "short"
                              ? "Respuestas cortas (%)"
                              : key === "medium"
                                ? "Respuestas medias (%)"
                                : "Respuestas largas (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                form.trigger("responseLength"); // valida al cambiar
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}

                  {/* Mostrar mensaje de validación o éxito */}
                  {(() => {
                    const values = form.watch("responseLength");
                    const total = values.short + values.medium + values.long;

                    if (form.formState.errors.responseLength?.short?.message) {
                      // Mensaje de error de Zod (rojo)
                      return (
                        <p className="text-red-600 text-sm mt-1">
                          {form.formState.errors.responseLength.short.message}
                        </p>
                      );
                    } else if (total === 100) {
                      // Mensaje de éxito (verde)
                      return (
                        <p className="text-green-600 text-sm mt-1 font-medium">
                          ¡Haz logrado conseguir el 100%!
                        </p>
                      );
                    }

                    return null;
                  })()}

                  <FormField
                    control={form.control}
                    name="audioEnabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Habilitar respuestas de audio</FormLabel>
                      </FormItem>
                    )}
                  />
                </>
              )}

            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4 flex justify-between">
              {step === 2 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                >
                  Atrás
                </Button>
              )}

              {step === 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  className="cursor-pointer"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="cursor-pointer"
                >
                  Guardar
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
