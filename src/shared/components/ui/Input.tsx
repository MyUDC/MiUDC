import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { RiErrorWarningFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  formHandler?: UseFormRegisterReturn<any>;
  error?: string;
  type?: "text" | "password" | "email" | "number" | "date";
}

export default function Input({
  title,
  formHandler,
  error,
  className: inputClassName,
  type = "text",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(
    type === "password" ? false : undefined
  );

  const { id, ...htmlInputProps } = rest;

  const inputClasses = `border border-gray-300 focus:border-2 rounded-md p-3 pl-4 text-sm focus:outline-none bg-white ${
    error ? "border-red-500 focus:border-red-500" : "focus:border-green"
  } ${inputClassName} rounded-2xl w-full h-12 relative`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-black font-medium font-inter text-sm mb-2"
      >
        {title}
      </label>
      <div className="relative">
        <input
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={inputClasses}
          {...formHandler}
          {...htmlInputProps}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0} // Asegura que el botón es accesible mediante teclado
          >
            {showPassword ? (
              <RiEyeOffFill className="text-gray-500" />
            ) : (
              <RiEyeFill className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <RiErrorWarningFill className="mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
