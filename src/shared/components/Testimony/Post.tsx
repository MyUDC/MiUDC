"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import UserAvatar from "@/features/user/components/UserAvatar";
import Reactions from "../Reactions";
import RelativeTime from "../RelativeTime";
import { PostType } from "@prisma/client";
import { PostImages } from "./PostImages";
import postTypeHumanized from "@/utils/PostTypeHumanized";
import { Card } from "@/components/ui/card";
import { PostActions } from "./PostActions";

type PostProps = {
  userId: string;
  postType: PostType;
  postTitle: string;
  postSlug: string;
  authorId: string;
  userPhotoUrl?: string;
  userName?: string;
  email?: string;
  content?: string;
  careerSlug: string;
  careerName: string;
  heartCount: number;
  initialLikedState: boolean;
  repliesCount?: number;
  imageUrls?: string[];
  createdAt: Date;
};

export default function Post({
  userId,
  postType,
  postTitle,
  postSlug,
  authorId,
  userPhotoUrl,
  userName,
  content,
  careerSlug,
  careerName,
  heartCount,
  initialLikedState,
  repliesCount: commentCount,
  imageUrls,
  createdAt,
}: PostProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const postUrl = `/career/${careerSlug}/post/${postSlug}`;

  return (
    <div className="pb-2 w-full">
      <div className="mt-10 xs:mt-4">
        <Card className="p-4">
          {/* Post Header */}
          <div className="mx-4 flex gap-4 mb-2">
            <UserAvatar
              name={userName}
              photoUrl={userPhotoUrl}
              username={userName}
            />
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-sm font-medium">{`${userName} · `}</p>
                <p className="text-xs text-gray-500">
                  <RelativeTime
                    createdAt={createdAt}
                    currentTime={currentTime}
                  />
                </p>
              </div>
              <div className="flex items-center text-xs text-green">
                <p>{postTypeHumanized[postType]}</p>
              </div>
            </div>

            <div className="flex flex-1 justify-end align-middle">
              <PostActions
                postSlug={postSlug}
                initialTitle={postTitle}
                initialContent={content || ""}
                path={`/career/${careerSlug}`}
                authorId={authorId}
              />
            </div>
          </div>
          <div className="ml-[4.3rem] pr-3">
            {/* Post Title */}
            <div className="flex flex-col gap- mb-1">
              <div>
                <Link href={postUrl}>
                  <p className="font-semibold break-words leading-5 text-gray-800">
                    {postTitle}
                  </p>
                </Link>
              </div>

              {/* Post Career */}
              <div className="text-gray-500 text-xs">
                <Link href={`/career/${careerSlug}`}>{careerName}</Link>
              </div>
            </div>

            {/* Post Content */}
            <div className="pr-4">
              <Link href={postUrl}>
                <p className="text-sm break-words leading-5 text-gray-700 mb-4">
                  {content}
                </p>
              </Link>
            </div>
          </div>
          <PostImages imageUrls={imageUrls} />
          <Reactions
            postSlug={postSlug}
            userId={userId}
            initialHeartCount={heartCount}
            initialLikedState={initialLikedState}
            commentCount={commentCount}
          />
        </Card>
      </div>
    </div>
  );
}
