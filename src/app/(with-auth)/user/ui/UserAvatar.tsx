import React from "react";
import Image from "next/image";
import SkeletonImage from "@/components/Skeletons/SkeletonImage";
import SkeletonText from "@/components/Skeletons/SkeletonText";

interface UserAvatarProps {
  name?: string;
  photoUrl?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

export default function UserAvatar({
  name,
  photoUrl,
  width = 48,
  height = 48,
  textColor = "text-black",
}: UserAvatarProps) {
  return (
    <div className="flex items-center">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`${name}'s profile`}
          className="rounded-full mr-4"
          width={width}
          height={height}
        />
      ) : (
        <SkeletonImage
          width={width}
          height={height}
          className="rounded-full mr-4"
        />
      )}
      <div className={`text-lg font-semibold ${textColor}`}>
        {name ? (
          <span>{name}</span>
        ) : (
          <SkeletonText width="100px" height="1rem" />
        )}
      </div>
    </div>
  );
}
