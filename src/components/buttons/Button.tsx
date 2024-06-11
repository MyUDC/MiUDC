import Link from "next/link";

interface Props {
  text: string;
  path: string;
  variant: "green" | "smoothGreen" | "link" | "forgetGreen";
}

export default function Button({ text, path, variant }: Props) {
  const variantClasses = {
    link: "text-gray-700 text-lg w-full text-center",
    forgetGreen: "underline text-green text-sm text-left",
    green: `bg-${variant} text-white w-full text-center shadow-md rounded-full`,
    smoothGreen: `bg-${variant} text-green w-full text-center shadow-md rounded-full`,
  }[variant];

  const flexClasses =
    {
      forgetGreen: "justify-start",
      default: "justify-center",
      green: "justify-center",
      link: "justify-center",
      smoothGreen: "justify-center",
    }[variant] || "justify-center";

  return (
    <div className={`flex ${flexClasses} w-full py-2`}>
      <Link
        className={`font-semibold py-3 rounded-full ${variantClasses}`}
        href={path}
      >
        {text}
      </Link>
    </div>
  );
}
