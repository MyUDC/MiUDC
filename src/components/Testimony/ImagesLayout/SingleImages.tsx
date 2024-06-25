import Image from "next/image";
import SkeletonImage from "@/components/Skeletons/SkeletonImage";
import { useState } from "react";
import ImageView from "@/components/ImageView/ImageView";

type SingleImagesProps = {
  imageUrl: string;
};

export default function SingleImages({ imageUrl }: SingleImagesProps) {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showImageView, setShowImageView] = useState(false);

  const handleImageLoad = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = currentTarget;
    setIsHorizontal(naturalWidth >= naturalHeight);
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt="Testimony Image"
        width={isHorizontal ? 400 : 280}
        height={isHorizontal ? 280 : 400}
        className={`select-none cursor-pointer rounded-lg border border-gray-200 object-cover transition-opacity duration-300 ${
          isHorizontal ? "w-[400px] h-[280px]" : "w-[280px] h-[400px]"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleImageLoad}
        onError={() => setIsLoaded(false)}
        onClick={() => setShowImageView(true)}
        draggable="false"
      />
      {!isLoaded && (
        <SkeletonImage
          width="400px"
          height="280px"
          className="rounded-lg border border-gray-200 absolute top-0 left-0"
        />
      )}
      {showImageView && (
        <ImageView
          imageUrls={[imageUrl]}
          initialIndex={0}
          onClose={() => setShowImageView(false)}
        />
      )}
    </div>
  );
}
