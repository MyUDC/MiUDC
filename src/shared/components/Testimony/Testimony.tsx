"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import UserAvatar from "@/features/user/components/UserAvatar";
import Reactions from "../Reactions";
import RelativeTime from "../RelativeTime";
import SkeletonText from "../Skeletons/SkeletonText";
import TestimonyImages from "./TestimonyImages";

type TestimonyProps = {
  userName?: string;
  userPhotoUrl?: string;
  testimonySlug: string;
  careerData?: {
    name: string,
    slug: string
  };
  content?: string;
  heartCount?: number;
  commentCount?: number;
  imageUrls?: string[];
  createdAt: Date;
};

export default function Testimony({
  userName,
  userPhotoUrl,
  testimonySlug,
  careerData,
  content,
  heartCount,
  commentCount,
  imageUrls,
  createdAt,
}: TestimonyProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleTestimonyClick = () => {
    router.push(`/career-forum/${careerData?.slug}/testimony/${testimonySlug}`)
  }

  return (
    <div
      className="max-w-lg w-full bg-white rounded-lg p-4 mb-4 relative border border-gray-200"
    >
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
          showName
        />
        <div className="ml-16">
          <div className="mt-2">
            <p className="text-gray-500">
              <RelativeTime createdAt={createdAt} currentTime={currentTime} />
            </p>
          </div>
          <div className="text-gray-500 mt-2 font-semibold">
            {careerData ? (
              <Link href={`/career-forum/${careerData.slug}`}>
                {careerData.name}
              </Link>
            ) : (
              <SkeletonText width="80px" height="1rem" />
            )}
          </div>
          <div className="mt-4" onClick={handleTestimonyClick}>
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
