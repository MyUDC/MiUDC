//src\shared\components\PostForm\PostForm.tsx
// src/shared/components/PostForm/PostForm.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Author ID:", authorId); // Verifica que este ID es el correcto
    console.log("Data being submitted:", data);

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

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: postType === "TESTIMONY" ? "TESTIMONY" : "QUESTION",
          title,
          content,
          authorId, // Asegúrate de que este valor es correcto
          careerId,
          imageUrls: images,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al publicar el post");
      }

      const newPost = await response.json();

      toast({
        title: "Post publicado",
        description: "Tu post se ha publicado exitosamente.",
        variant: "default",
      });

      clearForm();
      setIsDrawerOpen(false);
    } catch (error) {
      toast({
        title: "Error al publicar",
        description: "Hubo un error al publicar tu post. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const clearForm = () => {
    setImages([]);
    form.reset();
  };

  return (
    <div className="w-full max-w-md p-4 mb-4">
      <Form {...form}>
        <form
          id="post-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
