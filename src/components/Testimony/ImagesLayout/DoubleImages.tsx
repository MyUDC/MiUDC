import React, { useState } from "react";
import Image from "next/image";
import SkeletonImage from "@/components/Skeletons/SkeletonImage";

type DoubleImagesProps = {
  imageSources: string[];
};

export default function DoubleImages({ imageSources }: DoubleImagesProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="mt-4 relative">
      {!isLoaded && (
        <div className="grid grid-cols-2 gap-2 absolute top-0 left-0 right-0 bottom-0">
          <SkeletonImage
            width="100%"
            height="100%"
            className="rounded-lg border border-gray-200"
          />
          <SkeletonImage
            width="100%"
            height="100%"
            className="rounded-lg border border-gray-200"
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {imageSources.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Testimony Image ${index}`}
            width={400}
            height={280}
            className={`select-none cursor-pointer w-[400px] h-[280px] rounded-lg border border-gray-200 object-cover ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
}
