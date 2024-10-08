"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { CommentWithRelations } from "@/shared/types/CommentWithRelations";
import Post from "@/shared/components/Testimony/Post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/shared/actions/Comment/createComment";
import paginateComments from "@/shared/actions/Comment/paginateComments";

interface CommentProps {
  comment: CommentWithRelations;
  postId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<CommentWithRelations[]>([]);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const fetchReplies = async () => {
      const fetchedReplies = await paginateComments(3, 0, comment.id);
      setReplies(fetchedReplies);
    };
    fetchReplies();
  }, [comment.id]);

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast({
        title: "You must be logged in to reply",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("content", replyContent);
    formData.append("postId", postId);
    formData.append("parentId", comment.id);
    formData.append("userId", session.user.id);

    const result = await createComment(formData);
    if (result.success) {
      setReplies([result.comment, ...replies]);
      setReplyContent("");
      setIsReplying(false);
      toast({ title: "Reply added successfully" });
    } else {
      toast({
        title: "Failed to add reply",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4">
      <Post
        userId={session?.user?.id || ""}
        postType={comment.type}
        postTitle={comment.title}
        postSlug={comment.slug}
        authorId={comment.authorId}
        userPhotoUrl={comment.author.image || undefined}
        userName={comment.author.name || undefined}
        content={comment.content}
        careerSlug={comment.career.slug}
        careerName={comment.career.name}
        heartCount={0} // You might want to implement likes for comments
        initialLikedState={false}
        createdAt={comment.createdAt}
      />

      <div className="ml-8 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
        >
          Reply
        </Button>

        {isReplying && (
          <form onSubmit={handleReply} className="mt-2">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2"
            />
            <Button type="submit" size="sm" disabled={!replyContent.trim()}>
              Post Reply
            </Button>
          </form>
        )}

        {replies.length > 0 && (
          <div className="mt-4">
            <Button
              variant="link"
              onClick={() => setShowAllReplies(!showAllReplies)}
            >
              {showAllReplies
                ? "Hide replies"
                : `Show ${replies.length} replies`}
            </Button>
            {showAllReplies && (
              <div className="ml-4">
                {replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} postId={postId} />
                ))}
              </div>
            )}
          </div>
        )}

        {!showAllReplies && replies.length > 0 && (
          <div className="mt-2">
            <Link href={`/career/${comment.career.slug}/post/${comment.slug}`}>
              <Button variant="link">View full thread</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
