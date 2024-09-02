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
    transparentGreen: `border border-green text-green ${mobileWidth} text-center rounded-md ${mobileSize}`,
  };

  return (
    <div className={`flex ${flexClasses[variant]} ${mobileWidth}`}>
      <Link
        className={`font-semibold rounded-full ${variantClasses[variant]}`}
        href={path}
        {...rest}
      >
        {text}
      </Link>
    </div>
  );
}
