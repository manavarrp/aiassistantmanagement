This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

## Instalar dependencias

npm install

## Correr en modo desarrollo

npm run dev
Abre http://localhost:3000 en tu navegador.

## Decisiones técnicas

Framework: Next.js con App Router por su soporte nativo para React 18, rutas anidadas y React Server Components.

TypeScript: Tipado estático para mayor seguridad y autocompletado en VSCode.

UI: shadcn/ui junto con TailwindCSS, para componentes reutilizables y diseño responsive. Se aprovecharon botones, inputs, selects, checkboxes, diálogos y formularios de la librería.

Zustand: Manejo de estados globales (assistantsStore y modalStore) con persistencia en localStorage para la lista de asistentes.

React Hook Form + Zod: Validaciones de formulario en tiempo real y pasos en el modal de creación/edición de asistentes.

React Toastify: Mensajes de éxito/error tras operaciones (crear, actualizar, eliminar).

Persistencia:

Entrenamiento del asistente guardado en localStorage.

Chat simulado no persiste para reiniciar conversaciones libremente.

## Características implementadas

1. Lista de asistentes

Visualización de todos los asistentes creados.

Botón de creación, edición y eliminación con confirmación y toast.

2. Creación de asistentes

Modal con pasos:

Información básica: nombre, idioma y tono.

Configuración de respuestas (cortas, medias, largas) y habilitar audio.

Validación en tiempo real.

Guardado en store con persistencia y notificación de éxito.

3. Edición de asistentes

Similar al flujo de creación.

Actualiza datos en tiempo real y notifica con toast.

4. Entrenamiento del asistente

Área de texto para prompts o instrucciones.

Guardado en localStorage.

Mensaje de éxito tras guardar.

Botón “Clear” para resetear entrenamiento.

5. Chat simulado

Interfaz de chat simple (usuario vs asistente).

Input para enviar mensajes.

Respuestas simuladas con delay de 1–2 segundos.

Botón de reinicio de conversación.

Indicador de “escribiendo…” mientras llega la respuesta simulada.

6. Eliminación de asistentes

Confirmación antes de eliminar.

Eliminación inmediata de la lista.

Mensaje de éxito tras eliminar mediante toast.

Persistencia reflejada en localStorage.

7. UX/UI

Layout responsive para desktop y mobile.

Uso de shadcn/ui para componentes reutilizables y consistentes.

Mensajes de validación y éxito/error claros.

Uso de modales para operaciones CRUD.

## Prioridades y limitaciones

Prioricé:

Flujo de creación, edición y entrenamiento de asistentes.

Persistencia de datos clave (lista de asistentes y entrenamiento).

Experiencia responsive y feedback inmediato (toasts y mensajes de error).

Limitaciones actuales:

Persistencia del chat simulado (se reinicia cada sesión).

Estas decisiones permiten un MVP funcional y escalable.

## Tiempo aproximado de dedicación: ~13 horas

Configuración del proyecto y estructuras: 0.5h

Creación de store, persistencia y providers: 2h

Componente de creación/edición/eliminación con shadcn/ui, schema: 4h

Componente de entrenamiento y chat simulado: 3.5h

Diseño responsive y toasts: 1h

Validaciones en tiempo de ejecución: 2h

