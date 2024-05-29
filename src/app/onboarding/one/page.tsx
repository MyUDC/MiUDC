import Image from "next/image";
import Link from "next/link";

export default function OnbOnePage() {
  return (
    <div className="h-svh bg-yellow px-4 flex justify-around flex-col">
      <div className="h-full flex flex-col justify-around">
        <div className="flex justify-center">
          <Image
            src="/svgs/onboarding1.svg"
            alt="imagen de un mundo"
            width={280}
            height={280}
            priority
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-white text-center text-3xl font-semibold">
            <p>Explora en MyUDC</p>
          </div>
          <div className="text-white text-center text-lg ">
            <p>
              Explora diversas experiencias de estudiantes de universidad para una mejor elección universitaria.
            </p>
          </div>
        </div>
      </div>
      <div className='text-white h-24 flex '>
        <Link className="flex justify-center w-full items-center" href="/welcome">
          Saltar
        </Link>
        <div className="flex w-auto gap-1 items-center">
          <div className="h-2 w-2 align-bottom rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
        <Link className="flex justify-center w-full items-center" href="/onboarding/two">
          Siguiente {"->"}
        </Link>
      </div>
    </div>
  );
}