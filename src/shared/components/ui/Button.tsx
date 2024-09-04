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
  forgetGreen: "justify-start",
  default: "justify-center",
  green: "justify-center",
  link: "justify-center",
  smoothGreen: "justify-center",
  transparentGreen: "justify-center",
};

export default function Button({
  text,
  path,
  variant,
  mobileSize = "",
  mobileWidth = "w-full",
  ...rest
}: ButtonProps) {
  const variantClasses = {
    link: "text-gray-700 text-sm w-full text-center hover:underline",
    forgetGreen: "text-green text-sm",
    green: `bg-green text-white ${mobileWidth} text-center shadow-md rounded-md ${mobileSize}`,
    smoothGreen: `bg-smoothGreen text-green ${mobileWidth} text-center shadow-md rounded-md ${mobileSize}`,
    transparentGreen: `border border-green text-green text-center rounded-md px-3 min-w-[120px]`,
  };

  return (
    <div className={`flex ${flexClasses[variant]} ${mobileWidth}`}>
      <Link
        className={`font-semibold py-3 ${variantClasses[variant]}`}
        href={path}
        {...rest}
      >
        {text}
      </Link>
    </div>
  );
}
