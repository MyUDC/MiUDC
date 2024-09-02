"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export const GoogleAuthButton = () => {
  return (
    <button
      onClick={() => {
        signIn("google", { redirectTo: "/home" });
      }}
      className="w-full flex items-center justify-center text-sm text-gray-700 bg-white border border-gray-300 rounded-md p-2.5 font-semibold hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-200 ease-in-out"
    >
      <FaGoogle className="w-5 h-5 mr-2 text-green" />
      Usar Google
    </button>
  );
};
