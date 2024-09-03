import Image from "next/image";
import Button from "@/shared/components/ui/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function WelcomePage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center p-4 gap-6 bg-gradient-to-b from-green-500 to-green-700 relative">
      <Link href="/" className="absolute top-4 left-4 text-green">
        <FaArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex justify-center mb-6">
        <Image
          src="/svgs/logo-full.svg"
          alt="MiUDC logo"
          width={280}
          height={280}
          priority
        />
      </div>
      <div className="w-full max-w-md flex flex-col gap-4 justify-center items-center">
        <Button
          text="Regístrate"
          path="/sign-up/profile-type"
          variant="green"
        />
        <Button
          text="Inicia sesión"
          path="/sign-in"
          variant="smoothGreen"
        />
      </div>
    </div>
  );
}
