"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from "@/shared/actions/uploadImage";
import { ImagePreview } from "./ImagePreview";

interface FormInputs {
  title: string;
  content: string;
  images: FileList;
}

type Images = Array<string | ArrayBuffer | null>;

export default function PostForm() {
  const [images, setImages] = useState<Images>([]);
  const [postText, setPostText] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormInputs>({
    defaultValues: {
      images: undefined,
    }
  });

  const onSubmit = async (data: FormInputs) => {
    const { images } = data;
    if (images.length > 0) {
      const formData = new FormData();
      Array.from(images).forEach(image => formData.append('images', image));
      const { ok, result } = await uploadImage(formData);
      if (!ok) {
        console.error(result);
        return;
      }
    }
    setImages([]);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      Promise.all(Array.from(files).map(file => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }))
        .then(setImages)
        .catch(error => {
          console.error("Error al leer los archivos:", error);
          setImages([]);
        });
    } else {
      setImages([]);
    }
  };

  const validateFiles = (files: FileList): true | string => {
    if (files.length > 6) return 'No puedes seleccionar más de 6 archivos';
    if (!Array.from(files).every(file => file.type.includes('image'))) return 'Todos los archivos deben ser imágenes';
    return true;
  };

  return (
    <div className="h-svh flex flex-col bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <header className="flex justify-between items-center mb-4 border-b border-gray-300 p-2">
          <button className="text-gray-500">Cancelar</button>
          <h2 className="text-lg font-semibold">Testimonio</h2>
          <button className="disabled text-green font-semibold" type="submit" disabled={isSubmitting}>
            Guardar
          </button>
        </header>
        <div className="flex-1 bg-white">
          <input
            placeholder="Título"
            className="w-full p-2 focus:outline-none font-bold text-xl text-black"
            autoFocus
            {...register('title', {
              required: {
                value: true,
                message: "El titulo es requerido"
              },
              maxLength: {
                value: 100,
                message: "El titulo es muy largo"
              },
            })}
          />
          <textarea
            placeholder="Comparte tu experiencia"
            className="w-full h-full flex-1 p-2 focus:outline-none resize-none custom-scrollbar"
            {...register('content', {
              required: {
                value: true,
                message: "El post esta vacío"
              },
              maxLength: {
                value: 500,
                message: "El contenido es muy largo"
              },
            })}
          />
        </div>
        <div className="flex flex-col py-3 gap-3 border-t border-gray-300">
          {errors.title?.message && (
            <span className="px-2 text-sm flex text-red-600 items-center gap-1">
              <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
              {errors.title.message}
            </span>
          )}
          {errors.content?.message && (
            <span className="px-2 text-sm flex text-red-600 items-center gap-1">
              <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
              {errors.content.message}
            </span>
          )}
          {errors.images?.message && (
            <span className="px-2 text-sm flex text-red-600 items-center gap-1">
              <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
              {errors.images.message}
            </span>
          )}
          {(images.length > 0 && images.length <= 6)  && <ImagePreview images={images} />}
          <div className="flex mx-2 justify-start space-x-4 text-xl text-black">
            <div className="relative cursor-pointer">
              <input
                id="image"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                {...register('images', {
                  validate: validateFiles,
                  onChange: handleOnChange
                })}
              />
              <label htmlFor="image" className="cursor-pointer">
                <FontAwesomeIcon icon={faImage} />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
