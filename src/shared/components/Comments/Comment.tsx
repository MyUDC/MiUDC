"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faReply } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "@/features/user/components/UserAvatar";
import RelativeTime from "../RelativeTime";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/shared/actions/Comment/createComment";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { CommentWithRelations } from "@/shared/types/CommentWithRelations";

interface Props {
  comment: CommentWithRelations;
  postId: string;
}

const Comment = ({ comment, postId }: Props) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<CommentWithRelations[]>([]);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="rounded-lg p-4 mb-4 relative border border-gray-200">
      <div className="absolute top-2 right-2">
        <button title="More options">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-gray-500 w-6 h-6 m-4"
          />
        </button>
      </div>
      <div className="mt-10 xs:mt-4">
        <UserAvatar
          name={comment.author.name ?? ""}
          photoUrl={comment.author.image ?? ""}
          width={48}
          height={48}
          showName
          username={comment.author.username}
        />
      </div>
      <div className="ml-16">
        <div className="mt-2">
          <p className="text-gray-500">
            <RelativeTime
              createdAt={comment.createdAt}
              currentTime={currentTime}
            />
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 max-w-xs mb-4">{comment.content}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
          className="mt-2"
        >
          <FontAwesomeIcon icon={faReply} className="mr-2" />
          Reply
        </Button>
      </div>

      {isReplying && (
        <form onSubmit={handleReply} className="mt-4 ml-16">
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
        <div className="mt-4 ml-16">
          <Button
            variant="link"
            onClick={() => setShowAllReplies(!showAllReplies)}
          >
            {showAllReplies ? "Hide replies" : `Show ${replies.length} replies`}
          </Button>
          {showAllReplies ? (
            replies.map((reply) => (
              <Comment key={reply.id} comment={reply} postId={postId} />
            ))
          ) : (
            <Comment comment={replies[0]} postId={postId} />
          )}
        </div>
      )}

      {!showAllReplies && replies.length > 1 && (
        <div className="mt-2 ml-16">
          <Link href={`/career/${comment.career.slug}/post/${comment.slug}`}>
            <Button variant="link">View full thread</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Comment;
