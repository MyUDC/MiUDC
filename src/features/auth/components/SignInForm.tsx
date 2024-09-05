"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "../actions/signIn";

type FormInputs = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const router = useRouter();
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setSignInErrorMessage("");
    const { email, password } = data;

    const resp = await SignIn(email, password);
    if (!resp.ok) {
      setSignInErrorMessage(resp.message);
      return;
    }
    router.replace("/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
        <Input
          title="Correo"
          id="email"
          placeholder="Ingresa tu correo"
          type="email"
          autoComplete="email"
          autoFocus
          formHandler={register("email", {
            required: { value: true, message: "Este campo es requerido" },
            pattern: {
              value: RegExp(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
              ),
              message: "Esto no luce como un email",
            },
          })}
        />
        {errors.email?.message && (
          <span className="text-red-500 text-xs">{`*${errors.email.message}`}</span>
        )}
      </div>

      <div>
        <Input
          title="Contraseña"
          id="password"
          placeholder="Ingresa tu contraseña"
          type="password"
          autoComplete="current-password"
          formHandler={register("password", {
            required: { value: true, message: "Este campo es requerido" },
          })}
        />
        {errors.password?.message && (
          <span className="text-red-500 text-xs">{`*${errors.password.message}`}</span>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          text="¿Olvidaste tu contraseña?"
          path=""
          variant="forgetGreen"
        />
      </div>

      {signInErrorMessage && (
        <span className="text-red-500 text-xs">Credenciales incorrectas</span>
      )}

      <div className="pt-2">
        <button className="w-full text-white bg-green hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          {isSubmitting ? "Cargando..." : "Continuar"}
        </button>
      </div>
    </form>
  );
};
