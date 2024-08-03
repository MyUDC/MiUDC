import Button from "@/shared/components/ui/Button";
import Image from "next/image";
import { SignInForm } from "../../../features/auth/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center p-4 gap-2">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={230}
          height={230}
          priority
        />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="font-bold text-2xl text-gray-700">Iniciar sesión</h1>
        <SignInForm />
        <div className="text-center">
          <Button text="Regístrate" path="/sign-up/register" variant="link" />
        </div>
      </div>
    </div>
  );
}
