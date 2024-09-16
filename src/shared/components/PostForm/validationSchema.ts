import { z } from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "El título debe tener al menos 2 caracteres." })
    .max(100, { message: "El título es muy largo." }),
  content: z
    .string()
    .min(10, { message: "El contenido debe tener al menos 10 caracteres." })
    .max(500, { message: "El contenido es muy largo." }),
  images: z
    .array(z.string())
    .max(6, { message: "No puedes seleccionar más de 6 imágenes." }),
});
