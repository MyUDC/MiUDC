import Image from "next/image";
import Button from "@/components/buttons/Button";

export default function WelcomePage() {
  return (
    <div className="h-svh flex flex-col justify-center align-middle p-4 gap-6">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-full.svg"
          alt="MiUDC logo"
          width={120}
          height={120}
          priority
        />
      </div>
      <div className="w-full flex flex-col gap-3 justify-center text-white">
        <Button text="Iniciar sesión" path="/sign-in" variant="smoothGreen" />
        <Button
          text="Registrarse"
          path="/sign-up/profile-type"
          variant="green"
        />
      </div>
    </div>
  );
}
