"use client";

import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { GoSignOut } from "react-icons/go";


export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(() => {
    setIsLoading(true);
    signOut({ redirectTo: "/sign-in" })
  }, []);

  return (
    <AlertDialog>

      {/* trigger */}
      <AlertDialogTrigger asChild>
        <Button variant="outlineDestructive" className="w-full">
          <GoSignOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </AlertDialogTrigger>

      {/* content */}
      <AlertDialogContent>

        {/* header */}
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas cerrar la sesión?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* actions */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              loading={isLoading}
              variant="destructive"
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Si, estoy seguro
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}