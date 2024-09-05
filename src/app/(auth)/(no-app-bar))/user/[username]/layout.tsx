import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import UserAvatar from "@/features/user/components/UserAvatar";
import Tabs from "@/shared/components/Tabs";
import Button from "@/shared/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { ServerTabs } from '../../../../../features/career/components/ServerTabs';

interface Props {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

export default async function UserLayout({ children, params }: Props) {
  const { username } = params;

  if (!username) notFound();
  const user = await getUserByUsername(username);
  if (!user) notFound();

  const tabs = [
    {
      text: 'Testimonios',
      path: `/user/${username}/testimonies`
    },
    {
      text: 'Preguntas',
      path: `/user/${username}/questions`
    },
    {
      text: 'Respuestas',
      path: `/user/${username}/replies`
    },
    {
      text: 'Likes',
      path: `/user/${username}/likes`
    },
    {
      text: 'Guardados',
      path: `/user/${username}/saved`
    }
  ]

  return (
    <div>
      <div className="h-svh bg-white flex flex-col items-center">
        <div className=" w-full relative">
          <div className="bg-green-500 relative p-8 pt-16 flex flex-col items-start text-black">
            <UserAvatar
              showName={false}
              name={user?.name!}
              photoUrl={user?.image!}
              width={80}
              height={80}
              username={user?.username!}
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
                variant="outlinedGreen"
              />
              <Button
                text="Compartir"
                path="/share-profile"
                variant="outlinedGreen"
              />
            </div>
            <Link href="/home">
              <IoArrowBack className="text-green text-3xl absolute top-6 left-6 cursor-pointer select-none" />
            </Link>
          </div>
          <div className="sticky top-0">
            <ServerTabs tabs={tabs} />
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>

  );
}