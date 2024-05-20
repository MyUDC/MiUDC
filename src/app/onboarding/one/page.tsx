import Image from "next/image";
import Link from "next/link";

export default function OnePage() {

  return (
    <div className="h-svh bg-primary px-4 flex justify-around flex-col">
      <div className="h-full flex flex-col justify-around">
        <div className="flex justify-center">
          <Image
            src="/svgs/onboarding2.svg"
            alt="imagen de un mundo"
            width={280}
            height={280}
            priority
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-white text-center text-3xl font-semibold">
            <p>Únete a la comunidad</p>
          </div>
          <div className="text-white text-center text-lg ">
            <p>
              Los aspirantes de educación superior esperan mejores decisiones y tu puedes ser parte de ello.
            </p>
          </div>
        </div>
      </div>
      <div className='text-white h-24 flex'>
        <Link className="flex justify-center w-full items-center" href="/onboarding">
          Atrás
        </Link>
        <div className="flex w-auto gap-1 items-center">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 align-bottom rounded-full bg-white"></div>
        </div>
        <Link className="flex justify-center w-full items-center" href="/welcome">
          Comenzar {"->"}
        </Link>
      </div>
    </div>
  );
} 