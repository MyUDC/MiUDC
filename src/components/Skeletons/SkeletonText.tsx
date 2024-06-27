import React from "react";

interface SkeletonTextProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function SkeletonText({
  width = "100%",
  height = "1rem",
  className,
}: SkeletonTextProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
}
