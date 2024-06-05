import React from "react";

interface InputProps {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  className?: string;
}

export default function Input({
  title,
  placeholder,
  type,
  name,
  id,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-black font-light text-sm font-inter text-base font-light"
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`rounded-lg p-2 pl-4 font-light focus:border-green-500 focus:outline-none bg-smoothGreen shadow-md ${className} rounded-2xl w-full h-14`}
      />
    </div>
  );
};
