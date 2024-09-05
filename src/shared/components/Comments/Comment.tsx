"use client";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import UserAvatar from "@/features/user/components/UserAvatar";
import RelativeTime from "../RelativeTime";
import SkeletonText from "../Skeletons/SkeletonText";

interface Props {
  authorData: {
    name: string,
    photoUrl: string,
    username: string
  },
  content: string
  createdAt: Date
}

const Comment = ({ authorData, content, createdAt }: Props) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" rounded-lg p-4 mb-4 relative border border-gray-200">
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
          name={authorData.name}
          photoUrl={authorData.photoUrl}
          width={48}
          height={48}
          showName
          username={authorData.username}
        />
      </div>
      <div className="ml-16">
        <div className="mt-2">
          <p className="text-gray-500">
            <RelativeTime createdAt={createdAt} currentTime={currentTime} />
          </p>
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
        </div>
      </div>
    </div>
  )
}

export default Comment;
