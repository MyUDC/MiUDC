import Image from "next/image";
import Button from "@/shared/components/ui/Button";
import { SignInForm } from "../../../features/auth/components/SignInForm";
import { GoogleAuthButton } from "@/features/auth/components/GoogleAuthButton";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function SignInPage() {
  return (
    <section className="bg-gray-50 relative">
      <Link href="/welcome" className="absolute top-4 left-4 text-green">
        <FaArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex justify-center mb-6">
          <Image
            src="/svgs/logo-inline.svg"
            alt="logotipo de MiUdc"
            width={230}
            height={230}
            priority
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Iniciar sesión
            </h1>
            <SignInForm />
            <GoogleAuthButton />
            <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-center md:space-x-2">
              <div className="text-sm text-gray-500">
                ¿Aún no tienes una cuenta?
              </div>
              <div>
                <Button
                  text="Regístrate aquí"
                  variant="link"
                  path="/sign-up/register"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
