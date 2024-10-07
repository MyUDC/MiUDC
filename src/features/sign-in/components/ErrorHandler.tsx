"use client";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorHandler() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");

  useEffect(() => {
    if (error === 'USER_NOT_REGISTERED') {
      setTimeout(() => { // without this setTimeout, the toast doesn't show up
        toast({
          variant: "destructive",
          title: "Usuario no registrado",
          description: "Por favor, regístrate para poder iniciar sesión.",
          action: (
            <ToastAction onClick={() => router.push("/sign-up")} altText="Entendido">
              Ir a registrarme
            </ToastAction>
          ),
        });
      });
    }
  }, [error, router, toast]);

  return null;
}