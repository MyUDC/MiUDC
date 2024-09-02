import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  formHandler?: UseFormRegisterReturn<any>;
  error?: string;
}

export default function Input({
  title,
  formHandler,
  error,
  className: inputClassName,
  ...rest
}: InputProps) {
  const { id, ...htmlInputProps } = rest;

  const inputClasses = `rounded-lg p-3 pl-4 font-light text-sm focus:border-green-500 focus:outline-none bg-smoothGreen shadow-md ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-transparent focus:border-green-500"
  } ${inputClassName} rounded-2xl w-full h-12`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-black font-medium font-inter text-sm">
        {title}
      </label>
      <input
        id={id}
        className={inputClasses}
        {...formHandler}
        {...htmlInputProps}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
