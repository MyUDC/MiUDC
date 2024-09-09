"use client";

import { useForm } from "react-hook-form";
import Input from "@/shared/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp } from "../actions";
import { RiErrorWarningFill } from "react-icons/ri";

type FormInputs = {
  email: string;
  password: string;
  confirm_password: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setSignUpErrorMessage("");
    const { email, password } = data;
    const resp = await SignUp(email, password);
    if (!resp.ok) {
      setSignUpErrorMessage(resp.message);
      return;
    }
    await SignIn(email, password);
    router.replace("/home");
  };

  const passwordInpValue = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
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
              message: "Este campo es requerido",
            },
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
          placeholder="Agrega una contraseña"
          type="password"
          autoComplete="new-password"
          formHandler={register("password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 8,
              message: "Introduce al menos 8 caracteres",
            },
          })}
          error={errors.password?.message}
        />
      </div>

      <div>
        <Input
          title="Confirma contraseña"
          id="confirm_password"
          placeholder="Repite tu contraseña"
          type="password"
          autoComplete="off"
          formHandler={register("confirm_password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            validate: (value) =>
              value === passwordInpValue || "Las contraseñas no coinciden",
          })}
          error={errors.confirm_password?.message}
        />
      </div>

      {signUpErrorMessage && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <RiErrorWarningFill className="mr-1" />
          <span>{signUpErrorMessage}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="w-full text-white bg-green hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cargando..." : "Continuar"}
        </button>
      </div>
    </form>
  );
};
