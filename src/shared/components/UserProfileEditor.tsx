"use client";
import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ProfileForm from "./ProfileForm";

export default function UserProfileEditor() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const content = (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">Editar perfil</DialogTitle>
        <DialogDescription className="text-left">
          Haz cambios en tu perfil aquí. Haz clic en Guardar cuando hayas
          terminado.
        </DialogDescription>
      </DialogHeader>
      <ProfileForm />
      <DrawerFooter className="pt-2">
        <Button variant="green">Guardar cambios</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outlineGreen">Editar perfil</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="">
        <Button variant="outlineGreen">Editar perfil</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">Editar perfil</DrawerTitle>
          <DrawerDescription className="text-left">
            Haz cambios en tu perfil aquí. Haz clic en Guardar cuando hayas
            terminado.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <Button variant="green">Guardar cambios</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
