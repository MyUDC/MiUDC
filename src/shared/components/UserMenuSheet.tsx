"use client";

import { useState } from "react";
import { User } from "next-auth";
import UserAvatar from "@/features/user/components/UserAvatar";
import Link from "next/link";
import { FaEdit, FaUniversity, FaSignOutAlt, FaBookmark } from "react-icons/fa";
import UserProfileEditor from "./UserProfileEditor";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CareerListSheet from "@/features/career-catalog/components/CareerListSheet";
import { getSavedCareers } from "@/shared/actions/Careers/getSavedCareers";
import { getSavedPosts } from "@/shared/actions/Post/getSavedPosts";
import SavedPostsSheet from "@/shared/components/Testimony/SavedPostsSheet";
import { Career, Faculty } from "@prisma/client";
import { SignOutButton } from "@/shared/components/SignOutButton";
import { PostWithRelations } from "@/shared/types/PostWithRelations";

type CareerWithRelations = Career & {
  faculty: Faculty;
  tags: string[];
};

interface UserMenuSheetProps {
  user?: User;
}

export default function UserMenuSheet({ user }: UserMenuSheetProps) {
  const [isCareerListOpen, setIsCareerListOpen] = useState(false);
  const [isSavedPostsOpen, setIsSavedPostsOpen] = useState(false);
  const [savedCareers, setSavedCareers] = useState<CareerWithRelations[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostWithRelations[]>([]);

  if (!user) {
    return null;
  }

  const userUrl = user.username ? `/user/${user.username}` : ``;

  const handleShowSavedCareers = async () => {
    const result = await getSavedCareers();
    if (Array.isArray(result)) {
      setSavedCareers(result);
      setIsCareerListOpen(true);
    }
  };

  const handleShowSavedPosts = async () => {
    if (user && user.id) {
      try {
        const result = await getSavedPosts(user.id);
        if (result.success && result.savedPosts) {
          setSavedPosts(
            result.savedPosts.map((sp) => ({
              ...sp.post,
              _count: {
                ...sp.post._count,
                PostLike: (sp.post._count as any).PostLike || 0,
              },
            }))
          );
          setIsSavedPostsOpen(true);
        } else {
          console.error("Failed to fetch saved posts:", result.error);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    }
  };
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

          <div className="py-10 space-y-4 px-2">
            <div className="pb-2">
              <p className="text-gray-500 text-sm font-medium">Configuración</p>
              <UserProfileEditor
                triggerButton={
                  <button className="w-full flex items-center text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all px-2 py-4 rounded-md">
                    <FaEdit className="mr-4 h-4 w-4 text-black" />
                    Editar perfil
                  </button>
                }
              />
            </div>

            <div className="pb-2">
              <p className="text-gray-500 text-sm font-medium">Guardados</p>
              <button
                onClick={handleShowSavedCareers}
                className="w-full flex items-center text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all px-2 py-4 rounded-md"
              >
                <FaUniversity className="mr-4 h-4 w-4 text-black" />
                Carreras
              </button>
              <button
                onClick={handleShowSavedPosts}
                className="w-full flex items-center text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all px-2 py-4 rounded-md"
              >
                <FaBookmark className="mr-4 h-4 w-4 text-black" />
                Posts
              </button>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto text-black">
          <Button variant="outline" className="w-full">
            <FaSignOutAlt className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </SheetFooter>
      </SheetContent>

      <CareerListSheet
        isOpen={isCareerListOpen}
        onClose={() => setIsCareerListOpen(false)}
        title="Carreras Guardadas"
        careers={savedCareers}
      />
      <SavedPostsSheet
        isOpen={isSavedPostsOpen}
        onClose={() => setIsSavedPostsOpen(false)}
        title="Posts Guardados"
        savedPosts={savedPosts}
      />
    </Sheet>
  );
}
