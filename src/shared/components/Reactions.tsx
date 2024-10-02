import { useState, useCallback, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
} from "react-icons/fa";
import SkeletonText from "@/shared/components/Skeletons/SkeletonText";
import { TfiExport } from "react-icons/tfi";
import { useLikeStore } from "@/stores/useLikeStore";
import { likePost } from "@/shared/actions/Post/likePost";

interface ReactionsProps {
  postSlug: string;
  userId: string;
  initialHeartCount: number;
  commentCount?: number;
}

export default function Reactions({
  postSlug,
  userId,
  initialHeartCount,
  commentCount,
}: ReactionsProps) {
  const [heartCount, setHeartCount] = useState(initialHeartCount);
  const likedPosts = useLikeStore((state) => state.likedPosts);
  const toggleLike = useLikeStore((state) => state.toggleLike);

  const isLiked = useCallback(
    (slug: string) => likedPosts.includes(slug),
    [likedPosts]
  );

  useEffect(() => {
    setHeartCount(initialHeartCount);
  }, [initialHeartCount]);

  const handleLike = async () => {
    try {
      const newIsLiked = !isLiked(postSlug);
      const newHeartCount = newIsLiked
        ? heartCount + 1
        : Math.max(0, heartCount - 1);

      // Update local state first
      toggleLike(postSlug);
      setHeartCount(newHeartCount);

      // Call the server action
      const result = await likePost(postSlug, userId);

      if (!result.success) {
        // Revert local changes if server action fails
        console.error("Error processing like:", result.error);
        toggleLike(postSlug);
        setHeartCount(heartCount);
      }
    } catch (error) {
      console.error("Error processing like:", error);
      // Revert local changes in case of error
      toggleLike(postSlug);
      setHeartCount(heartCount);
    }
  };

  return (
    <div className="ml-[4.3rem] flex space-x-4 mt-2">
      <button
        className="flex items-center space-x-1 text-green"
        onClick={handleLike}
      >
        {isLiked(postSlug) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
        <span className="text-black">{heartCount}</span>
      </button>
      <button className="flex items-center space-x-1 text-green">
        <FaRegComment />
        <span className="text-black">
          {commentCount !== undefined ? (
            commentCount
          ) : (
            <SkeletonText width="20px" height="1rem" />
          )}
        </span>
      </button>
      <button title="share" className="flex items-center space-x-1 text-green">
        <FaRegBookmark />
      </button>
      <button title="share" className="flex items-center space-x-1 text-green">
        <TfiExport />
      </button>
    </div>
  );
}
