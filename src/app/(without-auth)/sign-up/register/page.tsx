import Button from "@/components/buttons/Button";
import { RegisterForm } from "@/app/(without-auth)/sign-up/register/ui/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
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
        <h1 className="font-bold text-2xl text-gray-700">Registro</h1>
        <RegisterForm />
        <div className="text-center">
          <Button text="Iniciar sesión" path="/sign-in" variant="link" />
        </div>
      </div>
    </div>
  );
}
