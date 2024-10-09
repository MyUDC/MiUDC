"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthAlert } from "@/stores/useAuthAlert";
import { useRouter } from "next/navigation";

export default function AuthAlert() {
  const router = useRouter();
  const {isOpen, close} = useAuthAlert();

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inicia sesión</AlertDialogTitle>
          <AlertDialogDescription>
            Para acceder a esta funcionalidad, debes iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Continuar como invitado
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="green"
              className="bg-green text-white shadow hover:bg-green/90"
              onClick={() => {
                router.push("/sign-in");
              }}
            >Iniciar sesión</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}