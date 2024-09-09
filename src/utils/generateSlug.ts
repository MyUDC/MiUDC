export function generateSlug(text: string): string {
  return text
    .toLowerCase()                             // Convertir a minúsculas
    .trim()                                    // Eliminar espacios en blanco al principio y al final
    .replace(/[\s\W-]+/g, '-')                 // Reemplazar espacios, caracteres no alfanuméricos y guiones consecutivos con un solo guión
    .replace(/^-+|-+$/g, '');                  // Eliminar guiones al principio y al final
}