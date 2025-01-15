"use client";

import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { deletePost } from "@/shared/actions/Post/deletePost";
import { updatePost } from "@/shared/actions/Post/updatePost";
import AuthWrapper from "@/features/auth/components/AuthWrapper";

type Props = {
  postSlug: string;
  initialTitle: string;
  initialContent: string;
  path: string;
  authorId: string;
};

export function PostActions({
  postSlug,
  initialTitle,
  initialContent,
  path,
  authorId,
}: Props) {
  const { data: session } = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const userId = session?.user?.id;
  const isOwner = userId === authorId;

  const handleDelete = async () => {
    const result = await deletePost(postSlug, path);
    if (result.success) {
      setIsDeleteDialogOpen(false);
      // Success notification
    } else {
      // Error handling
    }
  };

  const handleUpdate = async () => {
    const result = await updatePost({
      postSlug,
      title,
      content,
      path,
    });
    if (result.success) {
      setIsEditDialogOpen(false);
      // Success notification
      console.log("Update successful");
    } else {
      console.log("Update failed");
    }
  };

  return (
    <>
      <AuthWrapper>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2">
              <IoEllipsisHorizontal className="text-gray-500 w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isOwner ? (
              <>
                <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                  Eliminar
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>Reportar</DropdownMenuItem>
                <DropdownMenuItem>No me interesa</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                ¿Estás seguro de que quieres eliminar este post?
              </DialogTitle>
              <p>Esta acción no se puede deshacer.</p>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Post Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Title Field */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Field */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="content">Contenido</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="h-32"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="green" onClick={handleUpdate}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AuthWrapper>
    </>
  );
}
