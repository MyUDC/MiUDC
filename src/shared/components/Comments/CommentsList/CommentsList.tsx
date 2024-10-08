"use client";

import React, { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  postId: string;
  initComments: CommentWithRelations[];
}

export const CommentsList: React.FC<Props> = ({ initComments, postId }) => {
  const [comments, setComments] = useState(initComments);
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async () => {
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

    const result = await createComment(formData);
    if (result.success) {
      setComments([result.comment, ...comments]);
      setContent("");
      setIsDialogOpen(false);
      toast({ title: "Comment added successfully" });
    } else {
      toast({
        title: "Failed to add comment",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const fetchMoreComments = async () => {
    const newComments = await paginateComments(3, comments.length, postId);
    if (!newComments.length) setHasMore(false);
    setComments(comments.concat(newComments));
  };

  return (
    <div className="w-full">
      {status === "authenticated" ? (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="green">Add Comment</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add a Comment</AlertDialogTitle>
              <AlertDialogDescription>
                Write your comment below.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              className="mb-2"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Post Comment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
