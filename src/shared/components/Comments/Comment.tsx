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
        heartCount={0}
        initialLikedState={false}
        createdAt={comment.createdAt}
      />

      <div className="ml-8 mt-2">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-black text-sm"
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </Button>

          {replies.length > 0 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-black text-sm"
                onClick={() => setShowAllReplies(!showAllReplies)}
              >
                {showAllReplies
                  ? "Hide replies"
                  : `Show ${replies.length} replies`}
              </Button>

              <Link
                href={`/career/${comment.career.slug}/post/${comment.slug}`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-black text-sm"
                >
                  View full thread
                </Button>
              </Link>
            </>
          )}
        </div>

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

        {showAllReplies && replies.length > 0 && (
          <div className="mt-4 relative">
            <div className="space-y-4 max-h-[500px] overflow-hidden">
              {replies.slice(0, 3).map((reply, index) => (
                <div key={reply.id} className={index === 2 ? "opacity-50" : ""}>
                  <Comment comment={reply} postId={postId} />
                </div>
              ))}
            </div>
            {replies.length > 3 && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
