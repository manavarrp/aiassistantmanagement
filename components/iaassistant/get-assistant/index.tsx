"use client";

import { useEffect } from "react";
import { useAssistantsStore } from "@/store/assistant/assistants.store";
import { initialAssistants } from "@/data/assistants.seed";
import CardWrapped from "@/components/commons/card-wrapped";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useModal } from "@/store/modal/modal-store";
import { Edit, Trash2, Zap } from "lucide-react";

const GetAssistant = () => {
    const { assistants, setInitialAssistants } = useAssistantsStore();
    const { onOpen } = useModal();
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
                    <div className="flex justify-between items-start">
                        {/* Info del asistente */}
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

                        {/* Botón de acciones */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"

                                >
                                    Acciones
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onOpen("editAssistant", { assistant })}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editar
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => onOpen("deleteAssistant", { assistant })}>
                                    <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                                    Eliminar
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                                    Entrenar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardWrapped>
            ))}
        </section>

    );
};

export default GetAssistant;
