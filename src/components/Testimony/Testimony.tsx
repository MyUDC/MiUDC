"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Reactions from "@/components/Reactions/Reactions";
import UserAvatar from "@/user/components/UserAvatar";
import SkeletonText from "@/components/Skeletons/SkeletonText";
import TestimonyImages from "@/components/Testimony/TestimonyImages";
import RelativeTime from "@/components/RelativeTime/RelativeTime";

type TestimonyProps = {
  userName?: string;
  userPhotoUrl?: string;
  career?: string;
  content?: string;
  heartCount?: number;
  commentCount?: number;
  imageUrls?: string[];
  createdAt: Date;
};

export default function Testimony({
  userName,
  userPhotoUrl,
  career,
  content,
  heartCount,
  commentCount,
  imageUrls,
  createdAt,
}: TestimonyProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg w-full bg-white rounded-lg p-4 mb-4 relative border border-gray-200">
      <div className="absolute top-2 right-2">
        <button title="avatar">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-gray-500 w-6 h-6 m-4"
          />
        </button>
      </div>
      <div className="mt-10 xs:mt-4">
        <UserAvatar
          name={userName}
          photoUrl={userPhotoUrl}
          width={48}
          height={48}
        />
        <div className="ml-16">
          <div className="mt-2">
            <p className="text-gray-500">
              <RelativeTime createdAt={createdAt} currentTime={currentTime} />
            </p>
          </div>
          <div className="text-gray-500 mt-2 font-semibold">
            {career ? (
              <p>{career}</p>
            ) : (
              <SkeletonText width="80px" height="1rem" />
            )}
          </div>
          <div className="mt-4">
            {content ? (
              <p className="text-gray-700 max-w-xs mb-4">{content}</p>
            ) : (
              <>
                <SkeletonText width="100%" height="1rem" className="mb-2" />
                <SkeletonText width="90%" height="1rem" className="mb-2" />
                <SkeletonText width="95%" height="1rem" />
              </>
            )}
            {imageUrls && <TestimonyImages imageUrls={imageUrls} />}
          </div>
          <Reactions heartCount={heartCount} commentCount={commentCount} />
        </div>
      </div>
    </div>
  );
}
