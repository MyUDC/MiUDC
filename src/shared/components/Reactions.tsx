import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
} from "react-icons/fa";
import SkeletonText from "@/shared/components/Skeletons/SkeletonText";
import { TfiExport } from "react-icons/tfi";
import { likePost } from "@/shared/actions/Post/likePost";
import AuthWrapper from "@/features/auth/components/AuthWrapper";

interface ReactionsProps {
  postSlug: string;
  userId: string;
  initialHeartCount: number;
  initialLikedState: boolean;
  commentCount?: number;
}

export default function Reactions({
  postSlug,
  userId,
  initialHeartCount,
  initialLikedState,
  commentCount,
}: ReactionsProps) {
  const [heartCount, setHeartCount] = useState(initialHeartCount);
  const [isLiked, setIsLiked] = useState(initialLikedState);

  useEffect(() => {
    setHeartCount(initialHeartCount);
    setIsLiked(initialLikedState);
  }, [initialHeartCount, initialLikedState]);

  const handleLike = async () => {
    try {
      const newIsLiked = !isLiked;
      const newHeartCount = newIsLiked
        ? heartCount + 1
        : Math.max(0, heartCount - 1);

      // Update local state optimistically
      setIsLiked(newIsLiked);
      setHeartCount(newHeartCount);

      // Call the server action
      const result = await likePost(postSlug, userId);

      if (!result.success) {
        // Revert local changes if server action fails
        console.error("Error processing like:", result.error);
        setIsLiked(!newIsLiked);
        setHeartCount(heartCount);
      }
    } catch (error) {
      console.error("Error processing like:", error);
      // Revert local changes in case of error
      setIsLiked(!isLiked);
      setHeartCount(heartCount);
    }
  };

  return (
    <div className="ml-[4.3rem] flex space-x-4 mt-2">
      <AuthWrapper>
        <div className="flex space-x-4">
          <button
            className="flex items-center space-x-1 text-green"
            onClick={handleLike}
          >
            {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
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

        </div>
      </AuthWrapper>
      <button title="share" className="flex items-center space-x-1 text-green">
        <TfiExport />
      </button>
    </div>
  );
}
