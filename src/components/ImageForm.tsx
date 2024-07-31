'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';


import { uploadImage } from '@/actions/uploadImage';

type FormInputs = {
  images: FileList;
}


export default function ImageForm() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    // unneeded but helps me to remember how to use it
    defaultValues: {
      images: undefined,
    }
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const image = data.images[0];

    formData.append('image', image);

    const {ok, result} = await uploadImage(formData);

    if (!ok) {
      console.error(result);
      return;
    }

    console.log(result);
  };

  const handleOnChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files?.[0]
    if (!file) {
      setImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="image">file</label>
        <input
          id="image"
          type="file"
          accept="
            image/png, 
            image/jpeg, 
            image/jpg, 
            image/webp, 
            image/gif
          "
          {...register('images', {
            required: {
              value: true,
              message: 'Este campo es requerido'
            },
            validate: {
              type: (value: FileList) => {
                if (value[0].type.includes('image')) {
                  return true;
                }
                return 'El archivo debe ser una imagen';
              }
            },
            onChange: handleOnChange
          })}
        />
        {image &&
          <picture>
            <img
              src={image as string}
              alt="image"
              className='w-36 h-20 object-cover'
            />
          </picture>
        }
      </div>

      {errors.images?.message &&
        <span className="text-red-500" >
          {`*${errors.images.message}`}
        </span>
      }

      <br />

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

    </form>
  )
}
