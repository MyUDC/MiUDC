import React, { useRef, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { uploadImage } from "@/shared/actions/uploadImage"; // Importa la acción del servidor

// Definir los tipos permitidos usando Zod
const fileSchema = z.object({
  type: z.enum([
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
  ]),
});

const ImageUpload: React.FC<{
  id?: string;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tabIndex?: number; // Agrega la propiedad tabIndex aquí
}> = ({ id, images, setImages, isDrawerOpen, setIsDrawerOpen, tabIndex }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        const validation = fileSchema.safeParse({ type: file.type });
        if (!validation.success) {
          toast({
            variant: "destructive",
            title: "Formato no permitido",
            description: `El archivo ${file.name} no es una imagen válida. Solo se permiten imágenes.`,
            action: <ToastAction altText="Entendido">Entendido</ToastAction>,
          });
          return false;
        }
        return true;
      });

      if (images.length + validFiles.length > 6) {
        toast({
          variant: "destructive",
          title: "Límite de imágenes alcanzado",
          description: "No puedes subir más de 6 imágenes.",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
        return;
      }

      setIsUploading(true);

      const formData = new FormData();
      validFiles.forEach((file) => formData.append("images", file));

      try {
        const response = await uploadImage(formData);
        if (response.ok) {
          const newImageUrls = response.result.filter(
            (url): url is string => url !== null
          );
          setImages((prevImages) => [...prevImages, ...newImageUrls]);
          toast({
            title: "Imágenes subidas",
            description: "Tus imágenes se han subido exitosamente.",
            variant: "default",
          });
        } else {
          throw new Error("Error al subir las imágenes");
        }
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
        toast({
          variant: "destructive",
          title: "Error al subir las imágenes",
          description:
            "Ha ocurrido un error al subir las imágenes. Por favor, inténtalo de nuevo.",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
        onChange={handleFileChange}
        multiple
        className="hidden"
        ref={fileInputRef}
        tabIndex={tabIndex} // Usa tabIndex aquí
      />
      <Button
        onClick={handleButtonClick}
        type="button"
        variant="outline"
        className="w-full"
        disabled={isUploading}
        tabIndex={tabIndex} // Usa tabIndex aquí
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? "Subiendo..." : "Cargar Imágenes"}
      </Button>
      {images.length > 0 && (
        <ImagePreview
          images={images}
          setImages={setImages}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          tabIndex={tabIndex} // Usa tabIndex aquí si es necesario
        />
      )}
    </div>
  );
};

export default ImageUpload;
