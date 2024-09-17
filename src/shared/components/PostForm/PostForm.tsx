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
import { useRouter } from "next/navigation";
import { createPost } from "@/shared/actions/Post/createPost";

const PostForm: React.FC<{
  postType: string;
  authorId: string;
  careerId: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ postType, authorId, careerId, isDrawerOpen, setIsDrawerOpen }) => {
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const createPostAsync = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createPost({
        type: postType === "TESTIMONY" ? "TESTIMONY" : "QUESTION",
        title: data.title,
        content: data.content,
        authorId,
        careerId,
        imageUrls: images,
      });
      router.refresh();
      toast({ title: "Post publicado", variant: "default" });
      clearForm();
      setIsDrawerOpen(false);
    } catch (error) {
      toast({ title: "Error al publicar", variant: "destructive" });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (images.length > 6) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "No puedes subir más de 6 imágenes.",
        action: <ToastAction altText="Entendido">Entendido</ToastAction>,
      });
      return;
    }
    createPostAsync(data);
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
                <FormLabel htmlFor="title">Título</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Título"
                    {...field}
                    tabIndex={1}
                  />
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
                <FormLabel htmlFor="content">Contenido</FormLabel>
                <FormControl>
                  <Textarea
                    id="content"
                    placeholder="Redacta tu post"
                    className="resize-none h-32"
                    {...field}
                    tabIndex={2}
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
                <FormLabel htmlFor="images">Imágenes</FormLabel>
                <FormControl>
                  <ImageUpload
                    id="images"
                    images={images}
                    setImages={setImages}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    tabIndex={3}
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
