import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  title: string;
  formHandler?: UseFormRegisterReturn<any>;
}

export default function Input({
  title,
  formHandler,
  ...rest
}: InputProps) {
  const { id, className: inputClassName, ...htmlInputProps } = rest;
  
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-black font-light font-inter text-base"
      >
        {title}
      </label>
      <input
        id={id}
        className={`rounded-lg p-2 pl-4 font-light focus:border-green-500 focus:outline-none bg-smoothGreen shadow-md ${inputClassName} rounded-2xl w-full h-14`}
        {...formHandler}
        {...htmlInputProps}
      />
    </div>
  );
}
