import React from "react";

interface SkeletonImageProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function SkeletonImage({
  width = "100%",
  height = "100%",
  className,
}: SkeletonImageProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
}
