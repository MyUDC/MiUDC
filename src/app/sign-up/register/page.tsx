import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
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
        <form className="flex flex-col gap-4">
          <Input
            title="Correo"
            placeholder="Agrega un correo"
            type="email"
            name="email"
            id="email"
          />
          <Input
            title="Usuario"
            placeholder="Agrega un usuario"
            type="text"
            name="username"
            id="username"
          />
          <Input
            title="Contraseña"
            placeholder="Agrega una contraseña"
            type="password"
            name="password"
            id="password"
          />
          <Input
            title="Confirma contraseña"
            placeholder="Repite tu contraseña"
            type="password"
            name="confirm_password"
            id="confirm_password"
          />
          <div className="pt-2">
            <Button text="Continuar" path="" variant="green" />
          </div>
        </form>
        <div className="text-center">
          <Button text="Iniciar sesión" path="/sign-in" variant="link" />
        </div>
      </div>
    </div>
  );
}
