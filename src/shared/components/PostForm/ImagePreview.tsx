import { useState } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Import your AlertDialog components
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMediaQuery } from "@react-hook/media-query"; // Import the useMediaQuery hook

interface ImagePreviewProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, setImages }) => {
  const [isImageOptionsOpen, setIsImageOptionsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const isDesktop = useMediaQuery("(min-width: 768px)"); // Check if the device is desktop

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setIsImageOptionsOpen(false);
  };

  const removeAllImages = () => {
    setImages([]);
    setIsImageOptionsOpen(false);
  };

  return (
    <div className="relative w-full">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {images.map((img, index) => (
            <figure key={index} className="shrink-0 relative">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={img}
                  alt={`Uploaded ${index + 1}`}
                  className="aspect-[3/4] h-[200px] w-[150px] object-cover"
                  width={150}
                  height={200}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Imagen {index + 1}
              </figcaption>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1 right-1 z-10 h-6 w-6 bg-black text-white bg-opacity-50 backdrop-blur-md border-0 rounded-full"
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsImageOptionsOpen(true);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {isDesktop ? (
        // Desktop: Use AlertDialog
        <AlertDialog
          open={isImageOptionsOpen}
          onOpenChange={setIsImageOptionsOpen}
        >
          <AlertDialogContent className="w-full sm:w-auto px-6">
            <AlertDialogTitle> Opciones de borrado</AlertDialogTitle>
            <AlertDialogDescription>
              Elige una opción para borrar tus imágenes.
            </AlertDialogDescription>
            <div className="p-4 space-y-2">
              {selectedImageIndex !== null && (
                <AlertDialogAction
                  onClick={() => removeImage(selectedImageIndex)}
                  className="w-full"
                >
                  Borrar imagen seleccionada
                </AlertDialogAction>
              )}
              <AlertDialogAction onClick={removeAllImages} className="w-full">
                Borrar todas las imágenes
              </AlertDialogAction>
              <AlertDialogCancel
                onClick={() => setIsImageOptionsOpen(false)}
                className="w-full"
              >
                Cancelar
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        // Mobile: Use Drawer
        <Drawer open={isImageOptionsOpen} onOpenChange={setIsImageOptionsOpen}>
          <DrawerContent className="w-full sm:w-auto px-6">
            <DrawerTitle className="sr-only">Opciones de borrado</DrawerTitle>
            <DrawerDescription className="sr-only">
              Elige una opción para borrar tus imágenes.
            </DrawerDescription>
            <div className="p-4 space-y-2">
              {selectedImageIndex !== null && (
                <Button
                  onClick={() => removeImage(selectedImageIndex)}
                  className="w-full"
                >
                  Borrar imagen seleccionada
                </Button>
              )}
              <Button onClick={removeAllImages} className="w-full">
                Borrar todas las imágenes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsImageOptionsOpen(false)}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ImagePreview;
