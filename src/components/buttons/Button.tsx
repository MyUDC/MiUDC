import Link from "next/link";

interface props {
  text: string;
  path: string;
  variant: "green" | "smoothGreen" | "link";
}

export default function Button({ text, path, variant }: props) {
  return (
    <div className="flex justify-center w-full py-2">
      <Link
        className={`w-full text-center font-semibold py-3 rounded-full ${
          variant === "link"
            ? "text-gray-700 text-lg"
            : `bg-${variant} text-white`
        }`}
        href={path}
      >
        {text}
      </Link>
    </div>
  );
}
