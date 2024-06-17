// /src/components/Skeletons/SkeletonImage.tsx
import React from "react";

interface SkeletonImageProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  width = "100%",
  height = "100%",
  className,
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonImage;
