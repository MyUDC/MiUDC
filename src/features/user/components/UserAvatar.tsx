import React from "react";
import Image from "next/image";
import SkeletonImage from "@/shared/components/Skeletons/SkeletonImage";
import SkeletonText from "@/shared/components/Skeletons/SkeletonText";
import Link from "next/link";

interface UserAvatarProps {
  name?: string;
  username?: string;
  photoUrl?: string;
  width?: number;
  height?: number;
  textColor?: string;
  showName?: boolean;
  redirect?: boolean;
}

export default function UserAvatar({
  name,
  photoUrl,
  username,
  width = 32,
  height = 32,
  textColor = "text-black",
  showName = false,
  redirect = true,
}: UserAvatarProps) {
  const userUrl = username ? `/user/${username}` : ``;

  const content = (
    <>
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`${name}'s profile`}
          className="rounded-full"
          width={width}
          height={height}
        />
      ) : (
        <SkeletonImage width={width} height={height} className="rounded-full" />
      )}
      {showName && (
        <div className={`text-lg font-semibold ${textColor}`}>
          {name ? (
            <span>{name}</span>
          ) : (
            <SkeletonText width="100px" height="1rem" />
          )}
        </div>
      )}
    </>
  );

  return redirect ? (
    <Link href={userUrl} className="flex items-center gap-4">
      {content}
    </Link>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
}
