import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import UserAvatar from "@/features/user/components/UserAvatar";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserProfileEditor from "@/shared/components/UserProfileEditor";
import BackButton from "@/shared/components/BackButton";
import ServerTabs from "@/features/career/components/ServerTabs";
import { getUserData } from "@/shared/actions/User/getUserData";

import { Card } from "@/components/ui/card";

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

  const userData = await getUserData(user.id);
  if ("error" in userData) {
    console.error(userData.error);
    // Handle the error appropriately
    // For now, we'll just show a generic error message
    return <div>Error loading user data</div>;
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Fecha no disponible";
    return new Date(date).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tabs = [
    { text: "Testimonios", path: `/user/${username}/testimonies` },
    { text: "Preguntas", path: `/user/${username}/questions` },
    { text: "Respuestas", path: `/user/${username}/replies` },
    { text: "Likes", path: `/user/${username}/likes` },
    { text: "Guardados", path: `/user/${username}/saved` },
  ];

  return (
    <div className="flex justify-center items-center p-1">
      <Card className="w-full sm:max-w-5xl mt-16 px-1 md:px-4">
        <div className="bg-white flex flex-col items-center">
          <div className="w-full relative border-none">
            <div className="bg-green-500 relative p-8 pt-16 flex flex-col items-start text-black">
              <BackButton />
              <UserAvatar
                showName={false}
                name={user.name || ""}
                photoUrl={user.image || ""}
                width={80}
                height={80}
                username={user.username}
              />
              <h1 className="text-xl font-bold pt-2">
                {user.username || "Usuario sin nombre"}
              </h1>
              <div className="text-sm text-gray-500 mt-1">
                <p>{userData.career?.name ?? "Carrera no especificada"}</p>
                <p>
                  {userData.user?.semester
                    ? `Semestre ${userData.user.semester}`
                    : "Semestre no especificado"}
                </p>
                <p>Se unió el {formatDate(userData.user?.createdAt)}</p>
              </div>

              <p className="text-sm text-black mt-4">
                Este usuario aún no ha añadido una descripción.
              </p>
              <div className="w-full max-w-xs flex gap-4 mt-4">
                <UserProfileEditor
                  triggerButton={
                    <Button variant="outlineGreen">Editar perfil</Button>
                  }
                />
                <Button variant="outlineGreen">Compartir</Button>
              </div>
            </div>
            <div className="sticky top">
              <ServerTabs tabs={tabs} />
            </div>
          </div>
          <div className="w-full mt-4">{children}</div>
        </div>
      </Card>
    </div>
  );
}
