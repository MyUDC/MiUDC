"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "../actions/signIn";
import { RiErrorWarningFill } from "react-icons/ri";
import ErrorHandler from "@/features/sign-in/components/ErrorHandler";
import { signIn as nextAuthSignIn } from "next-auth/react";

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
    try {
      setSignInErrorMessage("");
      const { email, password } = data;

      // Usar directamente nextAuthSignIn para el inicio de sesión
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setSignInErrorMessage("Credenciales incorrectas");
        return;
      }

      // Recargar la página para asegurar que la sesión se actualice
      router.refresh();
      router.replace("/home");
      router.refresh();
    } catch (error) {
      console.error("Error during sign in:", error);
      setSignInErrorMessage("Error al iniciar sesión");
    }
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
          error={errors.email?.message}
        />
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
          error={errors.password?.message}
        />
      </div>

      <div className="flex justify-end">
        <Button
          text="¿Olvidaste tu contraseña?"
          path=""
          variant="forgetGreen"
        />
      </div>

      {signInErrorMessage && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <RiErrorWarningFill className="mr-1" />
          <span>{signInErrorMessage}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          disabled={isSubmitting}
          className="w-full text-white bg-green hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Cargando..." : "Continuar"}
        </button>
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <ErrorHandler />
      </Suspense>
    </form>
  );
};
