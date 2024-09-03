import { auth } from "@/auth";
import Button from "@/shared/components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import UserAvatar from "@/features/user/components/UserAvatar";
import UserTabs from "@/features/user/components/UserTabs"; // Asegúrate de que la ruta sea correcta

export default async function UserPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white w-full relative">
        <div className="bg-green-500 relative p-8 pt-16 flex flex-col items-start text-black">
          <UserAvatar
            showName={false}
            name={user?.name!}
            photoUrl={user?.image!}
            width={80}
            height={80}
          />
          <h1 className="text-xl font-bold pt-2">{user?.name!}</h1>
          <p className="text-sm text-gray-500">Arquitectura · 5° Semestre</p>
          <p className="text-sm text-gray-500">
            Ingreso a la carrera en el 2021
          </p>
          <p className="text-sm text-black mt-2">
            Me encantaban demasiado los juegos de construir como SimCity y ahora
            soy estudiante de Arquitectura :)
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              text="Editar perfil"
              path="/edit-profile"
              variant="transparentGreen"
            />
            <Button
              text="Compartir"
              path="/share-profile"
              variant="transparentGreen"
            />
          </div>
          <Link href="/home">
            <IoArrowBack className="text-green text-3xl absolute top-6 left-6 cursor-pointer select-none" />
          </Link>
        </div>
      </div>
      <UserTabs />
    </div>
  );
}
