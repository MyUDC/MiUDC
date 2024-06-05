import Link from "next/link";

interface props {
  text: string;
  path: string;
  variant: "green" | "smoothGreen" | "link" | "forgetGreen";
}

export default function Button({ text, path, variant }: props) {
  return (
    <div className={`flex ${variant === "forgetGreen" ? "justify-start" : "justify-center"} w-full py-2`}>
      <Link
        className={`font-semibold py-3 rounded-full ${
          variant === "link"
            ? "text-gray-700 text-lg w-full text-center"
            : variant === "forgetGreen"
            ? "underline text-green text-sm text-left"
            : `bg-${variant} text-white w-full text-center`
        }`}
        href={path}
      >
        {text}
      </Link>
    </div>
  );
}
