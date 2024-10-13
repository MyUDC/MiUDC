import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import PostList from "@/shared/components/Testimony/PostList/PostList";
import { PostWithRelations } from "@/shared/types/PostWithRelations";
import { Card } from "@/components/ui/card";

interface SavedPostsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  savedPosts: PostWithRelations[];
}

export default function SavedPostsSheet({
  isOpen,
  onClose,
  title,
  savedPosts,
}: SavedPostsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-full flex flex-col p-0">
        <SheetHeader className="flex-shrink-0 p-6 border-b">
          <SheetTitle className="text-3xl font-bold text-black tracking-tight leading-none text-left">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4">
            {savedPosts.length > 0 ? (
              <div className="flex justify-center items-center">
                <Card className="max-w-lg w-svw">
                  <PostList
                    initPosts={savedPosts}
                    paginateHandler={async () => []}
                  />
                </Card>
              </div>
            ) : (
              <div className="p-6">
                <h1 className="mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
                  No hay posts guardados
                </h1>
                <p className="mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                  Una vez que guardes posts, se mostrarán aquí.
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
