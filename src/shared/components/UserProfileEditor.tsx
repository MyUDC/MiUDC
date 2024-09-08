"use client";
import * as React from "react";
import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
          <Button variant="outline">Editar perfil</Button>
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

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre de usuario</Label>
        <Input
          type="text"
          id="name"
          placeholder="Escribe tu nombre"
          defaultValue="John Doe"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="biography">Biografía</Label>
        <Input
          type="text"
          id="biography"
          maxLength={160}
          placeholder="Escribe tu biografía"
        />
        <span className="text-sm text-gray-500">Máximo 160 caracteres</span>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="major">Carrera Universitaria</Label>
        <Input type="text" id="major" defaultValue="Ingeniería en Sistemas" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="semester">Semestre</Label>
        <Input type="number" id="semester" defaultValue={3} min={1} max={10} />
      </div>
    </form>
  );
}
