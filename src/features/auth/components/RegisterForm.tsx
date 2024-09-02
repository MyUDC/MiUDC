"use client";

import { useForm } from "react-hook-form";
import Input from "@/shared/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp } from "../actions";

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
    formState: { errors },
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
    router.replace("/user");
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
        />
        {errors.email?.message && (
          <span className="text-red-500 text-xs">{`*${errors.email.message}`}</span>
        )}
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
        />
        {errors.password?.message && (
          <span className="text-red-500 text-xs">{`*${errors.password.message}`}</span>
        )}
      </div>

      <div>
        <Input
          title="Confirma contraseña"
          id="confirm_password"
          placeholder="Repite tu contraseña"
          type="password"
          autoComplete="off"
          formHandler={register("confirm_password", {
            validate: (value) =>
              value === passwordInpValue || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirm_password?.message && (
          <span className="text-red-500 text-xs">{`*${errors.confirm_password.message}`}</span>
        )}
      </div>

      {signUpErrorMessage && (
        <span className="text-red-500 text-xs">{signUpErrorMessage}</span>
      )}

      <div className="pt-2">
        <button className="w-full text-white bg-green hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Continuar
        </button>
      </div>
    </form>
  );
};
