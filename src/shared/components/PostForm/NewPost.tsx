"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PostCard } from "./PostCard";
import PostForm from "./PostForm";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCareerId } from "@/shared/actions/Careers/getCareerId";
import { getUserData } from "@/shared/actions/User/getUserData";
import { canCreatePost } from "@/utils/postRestrictions";

interface NewPostProps {
  careerSlug: string;
}

export default function NewPost({ careerSlug }: NewPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"student" | "aspirant" | null>(
    null
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [postType, setPostType] = useState<"TESTIMONY" | "QUESTION">(
    "TESTIMONY"
  );
  const [careerId, setCareerId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.includes("/testimonies")) {
      setPostType("TESTIMONY");
    } else if (pathname.includes("/questions")) {
      setPostType("QUESTION");
    }

    const fetchCareerId = async () => {
      const id = await getCareerId(careerSlug);
      setCareerId(id);
    };

    fetchCareerId();
  }, [pathname, careerSlug]);

  const handlePostCardClick = async () => {
    if (!session?.user) return;

    try {
      const { allowed, alertType: restrictionAlertType } = await canCreatePost(
        session,
        postType,
        careerSlug
      );

      if (!allowed && restrictionAlertType) {
        setAlertType(restrictionAlertType);
        setShowAlert(true);
        return;
      }

      setIsOpen(true);
    } catch (error) {
      console.error("Error checking post creation permissions:", error);
    }
  };

  const handleAlertAction = async (
    action: "myCareer" | "addQuestion" | "close"
  ) => {
    setShowAlert(false);

    switch (action) {
      case "myCareer":
        if (session?.user?.id) {
          try {
            const userData = await getUserData(session.user.id);

            if (userData.career) {
              router.push(`/career/${userData.career.slug}/forum/testimonies`);
            } else {
              console.error("No career found for user");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
        break;
      case "addQuestion":
        router.push(`/career/${careerSlug}/forum/questions`);
        // Add a small delay to ensure navigation completes before opening
        setTimeout(() => {
          setIsOpen(true);
        }, 100);
        break;
      case "close":
        break;
    }
  };

  const content = (
    <PostForm
      authorId={session?.user?.id || ""}
      careerId={careerId || ""}
      postType={postType}
      isDrawerOpen={isOpen}
      setIsDrawerOpen={setIsOpen}
    />
  );

  const renderAlert = () => {
    switch (alertType) {
      case "student":
        return (
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicación no permitida</AlertDialogTitle>
                <AlertDialogDescription>
                  Los testimonios solo pueden publicarse en tu propia carrera.
                  ¿Quieres ir a tu carrera o publicar una pregunta en esta
                  carrera?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => handleAlertAction("close")}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green mt-2 sm:mt-0"
                  onClick={() => handleAlertAction("myCareer")}
                >
                  Ir a mi carrera
                </AlertDialogAction>
                <Button
                  variant="outline"
                  onClick={() => handleAlertAction("addQuestion")}
                >
                  Publicar pregunta
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      case "aspirant":
        return (
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicación no permitida</AlertDialogTitle>
                <AlertDialogDescription>
                  Como aspirante, solo puedes publicar preguntas. ¿Quieres
                  publicar una pregunta en esta carrera?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => handleAlertAction("close")}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green"
                  onClick={() => handleAlertAction("addQuestion")}
                >
                  Publicar pregunta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      default:
        return null;
    }
  };

  // If no session, don't render PostCard at all
  if (!session?.user) return null;

  if (isDesktop) {
    return (
      <>
        {renderAlert()}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <PostCard onValidatedClick={handlePostCardClick} />
          </DialogTrigger>
          <DialogContent className="h-svh max-h-xl mt-10 overflow-y-auto no-scrollbar">
            <div className="mx-auto w-full max-w-md h-full flex flex-col">
              <DialogHeader className="flex justify-between items-center border-b pb-2">
                <DialogTitle className="flex-1">Nuevo Post</DialogTitle>
                <Button
                  variant="green"
                  type="submit"
                  form="post-form"
                  className="ml-auto"
                >
                  Publicar
                </Button>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {content}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      {renderAlert()}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <PostCard onValidatedClick={handlePostCardClick} />
        </DrawerTrigger>
        <DrawerContent className="h-svh mt-10">
          <div className="mx-auto w-full max-w-md h-full flex flex-col">
            <DrawerHeader className="flex justify-between items-center border-b">
              <DrawerTitle>Nuevo Post</DrawerTitle>
              <Button variant="green" type="submit" form="post-form">
                Publicar
              </Button>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto no-scrollbar">{content}</div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
