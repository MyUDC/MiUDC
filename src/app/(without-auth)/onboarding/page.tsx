import Button from "@/components/buttons/Button";
import Image from "next/image";

export default function OnboardingPage() {

  return (
    <div className="h-svh flex flex-col justify-center align-middle p-4">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-full.svg"
          alt="MiUDC logo"
          width={120}
          height={120}
          priority
        />
      </div>
      <div className="mb-6 text-center text-lg font-semibold">
        Creando puentes de conexión entre egresados y aspirantes.
      </div>
      <div className="w-full flex justify-center text-white">
        <Button text="Continuar" path="/onboarding/one" variant="green" />
      </div>
    </div>
  )
}

