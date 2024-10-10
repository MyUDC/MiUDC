"use client";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { TfiExport } from "react-icons/tfi";
import { likePost } from "@/shared/actions/Post/likePost";
import { savePost } from "@/shared/actions/Post/savePostAction";
import { getInitialSaveState } from "@/shared/actions/Post/getInitialSaveState";
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
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setHeartCount(initialHeartCount);
    setIsLiked(initialLikedState);

    const fetchSaveState = async () => {
      const result = await getInitialSaveState(postSlug, userId);
      if (result.success) {
        setIsSaved(result.isSaved ?? false);
      }
    };
    fetchSaveState();
  }, [initialHeartCount, initialLikedState, postSlug, userId]);

  const handleLike = async () => {
    try {
      const newIsLiked = !isLiked;
      const newHeartCount = newIsLiked
        ? heartCount + 1
        : Math.max(0, heartCount - 1);

      setIsLiked(newIsLiked);
      setHeartCount(newHeartCount);

      const result = await likePost(postSlug, userId);

      if (!result.success) {
        console.error("Error processing like:", result.error);
        setIsLiked(!newIsLiked);
        setHeartCount(heartCount);
      }
    } catch (error) {
      console.error("Error processing like:", error);
      setIsLiked(!isLiked);
      setHeartCount(heartCount);
    }
  };

  const handleSave = async () => {
    try {
      const result = await savePost(postSlug, userId);

      if (result.success) {
        setIsSaved(result.isSaved ?? false);
      } else {
        console.error("Error saving/unsaving post:", result.error);
      }
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
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
            <span className="text-black">{commentCount}</span>
          </button>
          <button
            onClick={handleSave}
            title="save"
            className="flex items-center space-x-1 text-green"
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </AuthWrapper>
      <button title="share" className="flex items-center space-x-1 text-green">
        <TfiExport />
      </button>
    </div>
  );
}
