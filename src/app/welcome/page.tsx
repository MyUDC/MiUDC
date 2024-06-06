import Image from "next/image";
import Link from "next/link";

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
        <Link
          className="bg-smoothYellow text-green w-full font-extrabold p-3 rounded-full text-center"
          href="/sign-in"
        >
          Iniciar sesión
        </Link>
        <Link
          className="bg-green w-full font-extrabold p-3 rounded-full text-center"
          href="/sign-up/profile-type"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}