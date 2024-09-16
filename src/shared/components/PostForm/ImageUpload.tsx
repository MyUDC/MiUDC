import { useRef } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";

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
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ images, setImages, isDrawerOpen, setIsDrawerOpen }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files)
        .filter((file) => {
          // Validar el tipo de archivo con Zod
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
        })
        .map((file) => URL.createObjectURL(file));

      if (images.length + newImages.length > 6) {
        toast({
          variant: "destructive",
          title: "Límite de imágenes alcanzado",
          description: "No puedes subir más de 6 imágenes.",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
        return;
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previene que el formulario se envíe
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
        onChange={handleFileChange}
        multiple
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        onClick={handleButtonClick}
        type="button"
        variant="outline"
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" /> Cargar Imágenes
      </Button>
      {images.length > 0 && (
        <ImagePreview
          images={images}
          setImages={setImages}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
    </div>
  );
};

export default ImageUpload;
