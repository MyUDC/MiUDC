"use client";

import { signIn } from "next-auth/react";

export const GoogleAuthButton = () => {

  return (
    <button
      onClick={() => {
        signIn("google", { redirectTo: "/home" });
      }}
      className="bg-white text-gray-700 font-semibold rounded-md p-2 w-full"
    >
      Iniciar sesión con Google
    </button>
  );
}