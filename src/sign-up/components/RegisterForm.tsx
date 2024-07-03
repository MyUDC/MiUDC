'use client';

import Input from "@/components/form/Input"
import { useEffect } from "react";
import { useForm } from "react-hook-form"

type FormInputs = {
  email: string
  password: string
  confirm_password: string
}

export const RegisterForm = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  }

  const passwordInpValue = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        title="Correo"
        id="email"
        placeholder="Agrega un correo"
        type="email"
        autoComplete="email"
        autoFocus
        formHandler={register("email", {
          required: {
            value: true,
            message: "Este campo es requerido"
          },
          pattern: {
            value: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
            message: "Esto no luce como un email"
          }
        })}
      />
      {errors.email?.message &&
        <span className="text-red-500" >
          {`*${errors.email.message}`}
        </span>
      }
      {/* <Input
        title="Usuario"
        placeholder="Agrega un usuario"
        type="text"
        name="username"
        id="username"
      /> */}
      <Input
        title="Contraseña"
        id="password"
        placeholder="Agrega una contraseña"
        type="password"
        autoComplete="new-password"
        formHandler={register("password", {
          required: {
            value: true,
            message: "Este campo es requerido"
          },
          minLength: {
            value: 8,
            message: "Introduce al menos 8 caracteres"
          }
        })}
      />
      {errors.password?.message &&
        <span className="text-red-500" >
          {`*${errors.password.message}`}
        </span>
      }
      <Input
        title="Confirma contraseña"
        id="confirm_password"
        placeholder="Repite tu contraseña"
        type="password"
        autoComplete="off"
        formHandler={register("confirm_password", {
          validate: value => value === passwordInpValue || "Las contraseñas no coinciden"
        })}
      />
      {errors.confirm_password?.message &&
        <span className="text-red-500" >
          {`*${errors.confirm_password.message}`}
        </span>
      }
      <div className="flex justify-items-center w-full">
        <button
          className="bg-green text-white w-full text-center shadow-md rounded-full font-semibold py-3"
        >
          Continuar
        </button>
      </div>
    </form>
  )
}
