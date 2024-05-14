import Image from "next/image";

export default function OnboardingPageTwo() {
  return (
    <div className="h-full p-4 text-center w-full flex justify-around flex-col">
      <div className="flex justify-center">
        <Image
          src="/svgs/onboarding2.svg"
          alt="imagen de un mundo"
          width={280}
          height={280}
        />
      </div>
      <div>
        <div className="text-white mb-6 text-center text-3xl font-semibold">
          <p>Únete a la comunidad</p>
        </div>
        <div className=" text-white mb-6 text-center text-lg ">
          <p>
          Los aspirantes de educación superior esperan mejores decisiones y tu puedes ser parte de ello.
          </p>
        </div>
      </div>
    </div>
  );
}