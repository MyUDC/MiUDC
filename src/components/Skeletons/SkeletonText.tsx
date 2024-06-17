// /src/components/Skeletons/SkeletonText.tsx
import React from "react";

interface SkeletonTextProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  width = "100%",
  height = "1rem",
  className,
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonText;
