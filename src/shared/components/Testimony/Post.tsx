"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import UserAvatar from "@/features/user/components/UserAvatar";
import Reactions from "../Reactions";
import RelativeTime from "../RelativeTime";
import { PostType } from '@prisma/client';
import { postTypeHumanized } from "@/app/(auth)/(no-app-bar))/career-forum/[careerSlug]/testimony/[testimonySlug]/page";
import { PostImages } from "./PostImages";

type Props = {
  postType: PostType;
  postTitle: string;
  postSlug: string;
  userPhotoUrl?: string;
  userName?: string;
  content?: string;
  careerSlug: string;
  careerName: string;
  heartCount?: number;
  repliesCount?: number;
  imageUrls?: string[]
  createdAt: Date;
};

export default function Post({
  postType,
  postTitle,
  postSlug,
  userPhotoUrl,
  userName,
  content,
  careerSlug,
  careerName,
  heartCount,
  repliesCount: commentCount,
  imageUrls,
  createdAt,
}: Props) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleTestimonyClick = () => {
    router.push(`/career-forum/${careerSlug}/testimony/${postSlug}`)
  }

  return (
    <div className="border-b pb-2 max-w-lg w-full bg-white border-gray-200">
      <div className="mt-10 xs:mt-4">

        {/* Post Header */}
        <div className=" mx-4 flex gap-4 mb-2">
          <UserAvatar
            name={userName}
            photoUrl={userPhotoUrl}
            width={36}
            height={36}
          />

          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-medium">
                {`${userName} · `}
              </p>
              <p className="text-xs text-gray-500">
                <RelativeTime createdAt={createdAt} currentTime={currentTime} />
              </p>
            </div>
            <div className="flex items-center text-xs text-green">
              <p>{postTypeHumanized[postType]}</p>
            </div>
          </div>

          <div className="flex flex-1 justify-end align-middle">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-gray-500 w-6 h-6"
            />
          </div>
        </div>

        <div className="ml-[4.3rem] pr-3">
          {/* Post Title */}
          <div className="flex flex-col gap- mb-1">
            <div>
              <Link href={`/career-forum/${careerSlug}/testimony/${postSlug}`}>
                <p className="font-semibold break-words leading-5 text-gray-800">{postTitle}</p>
              </Link>
            </div>

            {/* Post Career */}
            <div className="text-gray-500 text-xs">
              <Link href={`/career-forum/${careerSlug}`}>
                {careerName}
              </Link>
            </div>
          </div>

          {/* Post Content */}
          <div className="pr-4">
            <p className="text-sm break-words leading-5 text-gray-700 mb-4">{content}</p>
          </div>
        </div>
        <PostImages imageUrls={imageUrls} />
        <Reactions heartCount={heartCount} commentCount={commentCount} />
      </div>
    </div >
  );
}
