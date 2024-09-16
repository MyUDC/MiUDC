import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ImageUpload from "./ImageUpload";
import { FormSchema } from "./validationSchema";
import { z } from "zod";

const PostForm: React.FC<{
  postType: string;
  authorId: string;
  careerId: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ postType, authorId, careerId, isDrawerOpen, setIsDrawerOpen }) => {
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  // Initialize the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // Validación adicional de imágenes
    if (images.length > 6) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "No puedes subir más de 6 imágenes.",
        action: <ToastAction altText="Entendido">Entendido</ToastAction>,
      });
      return;
    }

    const { title, content } = data;

    // Datos para enviar el nuevo post
    const newPostData = {
      type: postType,
      title,
      content,
      authorId,
      careerId,
      imageUrls: images,
    };

    // Simulación de guardar el post (puedes reemplazarlo con la lógica de tu backend)
    console.log("Saving post:", newPostData);

    // Mostrar un toast de éxito
    toast({
      title: "Post publicado",
      description: "Tu post se ha publicado exitosamente.",
      variant: "default",
    });

    // Limpiar el formulario después de enviar
    clearForm();

    // Cerrar el drawer después de publicar
    setIsDrawerOpen(false);
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setImages([]); // Limpiar imágenes
    form.reset(); // Reiniciar el formulario
  };

  return (
    <div className="w-full max-w-md p-4 mb-4">
      <Form {...form}>
        <form
          id="post-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Campo del Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo del Contenido */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Comparte tu experiencia"
                    className="resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Imágenes */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Imágenes</FormLabel>
                <FormControl>
                  <ImageUpload
                    images={images}
                    setImages={setImages}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
