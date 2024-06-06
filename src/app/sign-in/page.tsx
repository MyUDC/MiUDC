import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 gap-2">
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
        <form className="flex flex-col gap-4">
          <Input
            title="Correo"
            placeholder="Ingresa tu correo"
            type="email"
            name="email"
            id="email"
          />
          <Input
            title="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            id="password"
          />
          <div className="flex justify-between items-center text-xs text-green">
            <Button text="¿Olvidaste tu contraseña?" path="" variant="forgetGreen"/>
          </div>
          <div className="pt-2">
            <Button text="Continuar" path="" variant="green" />
          </div>
        </form>
        <div className="text-center">
          <Button text="Regístrate" path="/sign-up/register" variant="link" />
        </div>
      </div>
    </div>
  );
}
