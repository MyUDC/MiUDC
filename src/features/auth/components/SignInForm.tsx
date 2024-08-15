'use client';

import { useForm } from 'react-hook-form'

import Button from '@/shared/components/ui/Button'
import Input from '@/shared/components/ui/Input'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignIn } from '../actions/signIn';

type FormInputs = {
  email: string
  password: string
}

export const SignInForm = () => {

  const router = useRouter();
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setSignInErrorMessage("");
    const { email, password } = data;
  
    const resp = await SignIn(email, password);
    if (!resp.ok) {
      setSignInErrorMessage(resp.message);
      return;
    }
    router.replace("/user");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        title="Correo"
        id="email"
        placeholder="Ingresa tu correo"
        type="email"
        autoComplete='email'
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


      <Input
        title="Contraseña"
        id="password"
        placeholder="Ingresa tu contraseña"
        type="password"
        autoComplete='current-password'
        formHandler={register("password", {
          required: {
            value: true,
            message: "Este campo es requerido"
          }
        })}
      />
      {errors.password?.message &&
        <span className="text-red-500" >
          {`*${errors.password.message}`}
        </span>
      }

      <div className="flex justify-between items-center text-xs text-green">
        <Button text="¿Olvidaste tu contraseña?" path="" variant="forgetGreen" />
      </div>

      {signInErrorMessage &&
        <span className="text-red-500" >
          Credenciales incorrectas
        </span>
      }
      <div className="pt-2">
        <button
          className="bg-green text-white w-full text-center shadow-md rounded-full font-semibold py-3"
        >
          {isSubmitting ? "Cargando..." : "Continuar"}
        </button>
      </div>
    </form>
  )
}
