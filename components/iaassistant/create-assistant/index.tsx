"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useModal } from "@/store/modal/modal-store";
import { useAssistantsStore } from "@/store/assistant/assistants.store";
import { LANGUAGES } from "@/data/data.seed";
import { TONES } from "@/data/tone.seed";
import { CreateAssistantSchema } from "@/schemas/indes";

type FormData = z.infer<typeof CreateAssistantSchema>;

export const CreateAssistant = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAssistant";
// Store: agregar asistente
  const addAssistant = useAssistantsStore((state) => state.addAssistant);
  const [step, setStep] = useState<1 | 2>(1);
// React Hook Form con validación Zod
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
// Pasar al siguiente paso tras validar campos del paso 1
  const handleNext = async () => {
    const valid = await form.trigger(["name", "language", "tone"]);
    if (valid) setStep(2);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 text-center">
          <DialogTitle className="text-2xl font-bold">Crear Asistente</DialogTitle>
          <DialogDescription>Paso {step} de 2</DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <div className="space-y-4 px-6 py-4">
            {step === 1 && (
              <>
              {/* Campo nombre */}
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
                 {/* Campo idioma */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Campo tono */}
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tono</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un tono" />
                          </SelectTrigger>
                          <SelectContent>
                            {TONES.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

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
                          {key === "short" ? "Cortas (%)" : key === "medium" ? "Medias (%)" : "Largas (%)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                              form.trigger("responseLength");
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                {/* Mostrar mensaje de validación o éxito */}
                {step === 2 && (() => {
                  const values = form.watch("responseLength");
                  const total = values.short + values.medium + values.long;

                  // Buscar si hay algún error en cualquiera de los 3 campos
                  const errorMessage =
                    form.formState.errors.responseLength?.short?.message ||
                    form.formState.errors.responseLength?.medium?.message ||
                    form.formState.errors.responseLength?.long?.message;

                  if (errorMessage) {
                    return (
                      <p className="text-red-600 text-sm mt-1">
                        {errorMessage}
                      </p>
                    );
                  }

                  if (total === 100) {
                    return (
                      <p className="text-green-600 text-sm mt-1 font-medium">
                        ¡Haz logrado conseguir el 100%!
                      </p>
                    );
                  }

                  return null;
                })()}

                {/* Habilitar audio */}
                <FormField
                  control={form.control}
                  name="audioEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Atrás
              </Button>
            )}

            {step === 1 ? (
              <Button type="button" variant="primary" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  const values = form.getValues();
                  const total = values.responseLength.short + values.responseLength.medium + values.responseLength.long;
                  if (total !== 100) {
                    setStep(2); 
                    return;
                  }
                  // Guardar asistente en store
                  addAssistant({ id: crypto.randomUUID(), ...values, audioEnabled: values.audioEnabled ?? true });
                  form.reset();
                  setStep(1);
                  onClose();
                }}
              >
                Guardar
              </Button>
            )}
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
