import Image from "next/image";
import Link from "next/link";

export default function ProfileTypePage() {
  return (
    <div className="h-svh flex flex-col justify-center align-middle p-4 gap-6">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={280}
          height={280}
          priority
        />
      </div>
      <div className="flex justify-center gap-4">
        <Link href="/sign-up/career" >
          <div className="gap-2 font-semibold text-primary text-center py-4 px-6 rounded-xl flex flex-col bg-smoothGreen">
            <Image
              src="/svgs/user.svg"
              alt="icono de usuario"
              width={80}
              height={80}
              priority
            />
            <h2 className="text-green" >Egresado</h2>
          </div>
        </Link>

        <Link href="" >
          <div className="gap-2 font-semibold text-primary text-center py-4 px-6 rounded-xl flex flex-col bg-smoothYellow">
            <Image
              src="/svgs/user.svg"
              alt="icono  de usuario"
              width={80}
              height={80}
              priority
            />
            <h2 className="text-yellow" >Aspirante</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}