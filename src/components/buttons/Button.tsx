import Link from "next/link";

interface Props {
  text: string;
  path: string;
  variant: "green" | "smoothGreen" | "link" | "forgetGreen";
}

export default function Button({ text, path, variant }: Props) {
  let variantClasses;

  switch (variant) {
    case "link":
      variantClasses = "text-gray-700 text-lg w-full text-center";
      break;
    case "forgetGreen":
      variantClasses = "underline text-green text-sm text-left";
      break;
    case "green":
      variantClasses = `bg-${variant} text-white w-full text-center shadow-md rounded-full`;
      break;
    case "smoothGreen":
      variantClasses = `bg-${variant} text-green w-full text-center shadow-md rounded-full`;
      break;
    default:
      variantClasses = "";
  }

  return (
    <div
      className={`flex ${
        variant === "forgetGreen" ? "justify-start" : "justify-center"
      } w-full py-2`}
    >
      <Link
        className={`font-semibold py-3 rounded-full ${variantClasses}`}
        href={path}
      >
        {text}
      </Link>
    </div>
  );
}
