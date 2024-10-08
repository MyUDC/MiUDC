"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from "next-auth/react";
import { createComment } from "@/shared/actions/Comment/createComment";
import paginateComments from "@/shared/actions/Comment/paginateComments";
import { CommentWithRelations } from "@/shared/types/CommentWithRelations";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";
import Comment from "../Comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { PostType } from "@prisma/client";

interface Props {
  postId: string;
  initComments: CommentWithRelations[];
}

export const CommentsList = ({ initComments, postId }: Props) => {
  const [comments, setComments] = useState(initComments);
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast({
        title: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("content", content);
    formData.append("postId", postId);
    formData.append("userId", session.user.id);

    // Optimistic update
    const optimisticComment: CommentWithRelations = {
      id: Date.now().toString(),
      title: "", // Los comentarios generalmente no tienen título, pero el tipo lo requiere
      content,
      slug: `temp-${Date.now()}`, // Slug temporal
      type: "REPLY" as const, // Asumiendo que los comentarios son siempre de tipo REPLY
      authorId: session.user.id,
      careerId: "", // Idealmente, deberías tener acceso a este valor
      parentId: postId, // Asumiendo que estás comentando directamente en el post
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        name: session.user.name || null,
        image: session.user.image || null,
        username: session.user.username || "",
      },
      career: {
        name: "", // Idealmente, deberías tener acceso a este valor
        slug: "", // Idealmente, deberías tener acceso a este valor
      },
    };
    setComments([optimisticComment, ...comments]);
    setContent("");

    try {
      const result = await createComment(formData);
      if (result.success) {
        // Replace the optimistic comment with the real one
        setComments((comments) => [
          result.comment,
          ...comments.filter((c) => c.id !== optimisticComment.id),
        ]);
        toast({ title: "Comment added successfully" });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      // Revert the optimistic update
      setComments((comments) =>
        comments.filter((c) => c.id !== optimisticComment.id)
      );
      setContent(content);
      toast({
        title: "Failed to add comment",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const fetchMoreComments = async () => {
    const newComments = await paginateComments(3, comments.length, postId);
    if (!newComments.length) setHasMore(false);
    setComments(comments.concat(...newComments));
  };

  return (
    <div className="w-full">
      {status === "authenticated" ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="mb-2"
          />
          <Button type="submit" disabled={!content.trim()}>
            Post Comment
          </Button>
        </form>
      ) : status === "unauthenticated" ? (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <p className="mb-2">You must be logged in to comment.</p>
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      ) : (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <p>Loading...</p>
        </div>
      )}

      <InfiniteScroll
        className="w-full"
        hasMore={hasMore}
        dataLength={comments.length}
        loader={<Loading />}
        endMessage={<EndMessage />}
        next={fetchMoreComments}
      >
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
