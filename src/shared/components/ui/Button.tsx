import Link from "next/link";

interface ButtonProps {
  text: string;
  path: string;
  variant:
    | "green"
    | "smoothGreen"
    | "link"
    | "forgetGreen"
    | "transparentGreen";
  mobileSize?: string; // Tamaño del botón en móviles
  mobileWidth?: string; // Ancho del botón en móviles
}

const flexClasses = {
  forgetGreen: "justify-start", // Aligns the button to the right
  default: "justify-center",
  green: "justify-center",
  link: "justify-center",
  smoothGreen: "justify-center",
  transparentGreen: "justify-center",
};

export default function Button({ text, path, variant, ...rest }: ButtonProps) {
  const variantClasses = {
    link: "text-gray-700 text-lg w-full text-center hover:underline",
    forgetGreen: "underline text-green text-sm text-left",
    green: 'bg-green text-white text-center shadow-md rounded-md px-4 py-2',
    smoothGreen: 'bg-smoothGreen text-green text-center shadow-md rounded-full px-4 py-2',
    transparentGreen: "border border-green text-green text-center rounded-full px-4 py-1",
  };

  return (
    <div className={`flex ${flexClasses[variant]}`}>
      <Link
        className={`font-semibold ${variantClasses[variant]}`}
        href={path}
        {...rest}
      >
        {text}
      </Link>
    </div>
  );
}