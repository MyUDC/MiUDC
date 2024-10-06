import { User } from "next-auth";
import UserAvatar from "@/features/user/components/UserAvatar";
import Link from "next/link";
import { FaHeart, FaEdit, FaSignOutAlt } from "react-icons/fa";
import UserProfileEditor from "./UserProfileEditor";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

interface UserMenuSheetProps {
  user?: User;
}

export default function UserMenuSheet({ user }: UserMenuSheetProps) {
  if (!user) {
    return null;
  }

  const userUrl = user.username ? `/user/${user.username}` : ``;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer w-8 h-8">
          <UserAvatar
            username={user.username!}
            photoUrl={user.image || ""}
            height={40}
            width={40}
            redirect={false}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between">
        <div>
          <Link href={userUrl}>
            <SheetHeader>
              <div className="flex items-center text-left gap-4">
                <UserAvatar
                  username={user.username!}
                  photoUrl={user.image || ""}
                  height={50}
                  width={50}
                  redirect={false}
                />
                <div>
                  <SheetTitle>{user.username}</SheetTitle>
                  <SheetDescription className="text-black font-medium">
                    {user.name}
                  </SheetDescription>
                  <div>
                    <SheetDescription className="text-xs font-medium">
                      Arquitectura
                    </SheetDescription>
                  </div>
                </div>
              </div>
            </SheetHeader>
          </Link>

          {/* Opciones */}
          <div className="py-10 space-y-4 px-2">
            {/* Sección de Configuración */}
            <div className="pb-2">
              <p className="text-gray-500 text-sm font-medium">Configuración</p>
              {/* Aquí usamos el componente del cliente */}
              <UserProfileEditor
                triggerButton={
                  <button className="w-full flex items-center text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all px-2 py-4 rounded-md">
                    <FaEdit className="mr-4 h-4 w-4 text-black" />
                    Editar perfil
                  </button>
                }
              />{" "}
            </div>

            {/* Sección de Favoritos */}
            <div className="pb-2">
              <p className="text-gray-500 text-sm font-medium">Favoritos</p>
              <button className="w-full flex items-center text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all px-2 py-4 rounded-md">
                <FaHeart className="mr-4 h-4 w-4 text-black" />
                Carreras favoritas
              </button>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto text-black">
          <SignOutButton /> 
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
