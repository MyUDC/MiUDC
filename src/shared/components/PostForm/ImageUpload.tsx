import React, { useRef, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { uploadImage } from "@/shared/actions/uploadImage";

// Definir los tipos de archivos permitidos usando Zod
const imageFormatSchema = z.object({
  type: z.enum([
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
  ]),
});

const imageSizeSchema = z.object({
  size: z.number().max(10485760), // Máximo 10 MB
});

const ImageUpload: React.FC<{
  id?: string;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tabIndex?: number;
}> = ({ id, images, setImages, isDrawerOpen, setIsDrawerOpen, tabIndex }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSizeAlert, setShowSizeAlert] = useState(false);
  const [showFormatAlert, setShowFormatAlert] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      let sizeAlertTriggered = false;
      let formatAlertTriggered = false;

      const validFiles = Array.from(files).filter((file) => {
        const formatValidation = imageFormatSchema.safeParse({
          type: file.type,
        });
        const sizeValidation = imageSizeSchema.safeParse({
          size: file.size,
        });

        if (!formatValidation.success) {
          formatAlertTriggered = true; // Marca que se activó una alerta de formato
          toast({
            variant: "destructive",
            title: "Formato de archivo no válido",
            description: `"${file.name}". No es un formato de imagen válido (PNG, JPEG, JPG, WEBP o GIF).`,
            action: <ToastAction altText="Entendido">Entendido</ToastAction>,
          });
          return false;
        }

        if (!sizeValidation.success) {
          sizeAlertTriggered = true; // Marca que se activó una alerta de tamaño
          toast({
            variant: "destructive",
            title: "Tamaño de archivo no válido",
            description: `"${file.name}". Supera los 10 MB.`,
            action: <ToastAction altText="Entendido">Entendido</ToastAction>,
          });
          return false;
        }

        return true;
      });

      // Actualiza los estados solo después de que el filtrado termine
      setShowFormatAlert(formatAlertTriggered);
      setShowSizeAlert(sizeAlertTriggered);

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
            description:
              sizeAlertTriggered || formatAlertTriggered
                ? "Tus imágenes se han subido exitosamente, pero algunas no cumplían con los requisitos de formato o tamaño."
                : "Tus imágenes se han subido exitosamente.",
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
            "Ha ocurrido un error. Inténtalo de nuevo. Recuerda que la imagen debe ser de formato válido (PNG, JPEG, JPG, WEBP o GIF) y no superar los 10 MB.",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
      } finally {
        setIsUploading(false);
        // Restablece las alertas después de manejar el estado
        setShowSizeAlert(false);
        setShowFormatAlert(false);
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
        tabIndex={tabIndex}
      />
      <Button
        onClick={handleButtonClick}
        type="button"
        variant="outline"
        className="w-full"
        disabled={isUploading}
        tabIndex={tabIndex}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? "Subiendo..." : "Subir Imágenes"}
      </Button>
      <p className="text-gray-400 text-xs flex justify-center">
        (Máximo 10 MB)
      </p>
      {images.length > 0 && (
        <ImagePreview
          images={images}
          setImages={setImages}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          tabIndex={tabIndex}
        />
      )}
    </div>
  );
};

export default ImageUpload;
