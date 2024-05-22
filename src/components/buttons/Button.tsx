import Link from "next/link";

interface props {
  text: string;
  path: string;
  variant: "primary" | "primary-light";
}

export default function Button({ text, path, variant }: props) {
  return (
    <div className="flex justify-center w-full py-2">
      <Link
        className={`w-full bg-${variant} text-center text-white font-semibold py-3 rounded-full`}
        href={path}
      >
        {text}
      </Link>
    </div>
  );
}