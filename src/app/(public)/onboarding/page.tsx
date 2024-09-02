import Button from "@/shared/components/ui/Button";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-4 pb-0">
      <div className="flex flex-col justify-center flex-grow">
        <div className="flex justify-start w-full max-w-2xl mb-8">
          <Image
            src="/svgs/logo-inline.svg"
            alt="MiUDC logo"
            width={220}
            height={80}
            priority
          />
        </div>

        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold text-black tracking-tight leading-none md:text-5xl xl:text-6xl">
          Tu guía para una elección vocacional segura.
        </h1>
        <p className="max-w-2xl mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          Descubre testimonios auténticos, orientación vocacional basada en IA,
          y todo lo que necesitas saber sobre tu futuro académico en la
          Universidad de Colima.
        </p>
        <div className="flex justify-start w-48 mb-6">
          <Button
            text="Continuar"
            path="/onboarding/slides"
            variant="green"
            mobileWidth="py-3 w-28"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/loro.png"
          alt="Parrot with graduation cap"
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
}
