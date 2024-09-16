"use client";
import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import { PostCard } from "./PostCard";
import PostForm from "./PostForm";
import { Button } from "@/components/ui/button";
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

export default function NewPost() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const content = (
    <PostForm
      authorId="Partemnitiae aut sunt facilitia voluptas praeterius cum ipsa, in dialectis contra celer sed."
      careerId="Praeteret nullam eximicar molesse mei omnisi, voluptasse esse voluptatis bella philos evoli es est."
      postType="TESTIMONY"
      isDrawerOpen={isOpen}
      setIsDrawerOpen={setIsOpen}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <PostCard onClick={() => setIsOpen(true)} />
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
            <div className="flex-1 overflow-y-auto no-scrollbar">{content}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <PostCard onClick={() => setIsOpen(true)} />
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
  );
}
