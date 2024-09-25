import Image from "next/image";
import { useState } from "react";
import ImageView from "../ImageView";

interface Props {
  imageUrls?: string[];
}

export const PostImages = ({ imageUrls }: Props) => {
  const [showImageView, setShowImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  if (!imageUrls) return null;

  const handleImageOpen = (index: number) => {
    setImageIndex(index);
    setShowImageView(true);
  };

  const handleImageClose = () => {
    setShowImageView(false);
  };

  return (
    <>
      <div className=" ml-[4.3rem]  relative flex overflow-x-auto no-scrollbar">
        {imageUrls.map((src, index) => (
          <PostImage
            key={index}
            src={src}
            handleClick={() => handleImageOpen(index)}
          />
        ))}
      </div>
      {showImageView && (
        <ImageView
          imageUrls={imageUrls}
          initialIndex={imageIndex}
          onClose={handleImageClose}
        />
      )}
    </>
  );
};

interface PostImageProps {
  src: string;
  handleClick: () => void;
}

const PostImage = ({ src, handleClick }: PostImageProps) => {
  return (
    <div className="flex-none h-36 relative min-w-36 mr-4">
      <Image
        src={src}
        alt="Image"
        fill
        className="rounded-md border object-cover"
        onClick={handleClick}
      />
    </div>
  );
};
