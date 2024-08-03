import Link from "next/link";

interface ButtonProps {
  text: string;
  path: string;
  variant: "green" | "smoothGreen" | "link" | "forgetGreen";
}

// puede sacarse del componente porque solo son strings planos
const flexClasses =
{
  forgetGreen: "justify-start",
  default: "justify-center",
  green: "justify-center",
  link: "justify-center",
  smoothGreen: "justify-center",
};

export default function Button({ text, path, variant,...rest }: ButtonProps) {

  // este objeto no puede sacarse del componente porque depende de la variante
  const variantClasses = {
    link: "text-gray-700 text-lg w-full text-center hover:underline",
    forgetGreen: "underline text-green text-sm text-left",
    green: `bg-${variant} text-white w-full text-center shadow-md rounded-full`,
    smoothGreen: `bg-${variant} text-green w-full text-center shadow-md rounded-full`,
  };

  return (
    <div className={`flex ${flexClasses[variant]} w-full py-2`}>
      <Link
        className={`font-semibold py-3 rounded-full ${variantClasses[variant]}`}
        href={path}
        {...rest}
      >
        {text}
      </Link>
    </div>
  );
}
