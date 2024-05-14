import Image from "next/image";

export default function OnboardingPageOne() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full p-4 text-center w-full flex justify-around flex-col">
        <div className="flex justify-center">
          <Image
            src="/svgs/onboarding1.svg"
            alt="imagen de un mundo"
            width={280}
            height={280}
          />
        </div>
        <div>
          <div className="text-white mb-6 text-center text-3xl font-semibold">
            <p>Explora en MyUDC</p>
          </div>
          <div className="text-white mb-6 text-center text-lg ">
            <p>
              Explora diversas experiencias de estudiantes de universidad para una mejor elección universitaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}