import Image from "next/image";
import { useState } from "react";
import ImageView from "../ImageView";

interface Props {
  imageUrls?: string[];
}

export const PostImages = ({ imageUrls }: Props) => {
  if (!imageUrls) return;
  const [showImageView, setShowImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageOpen = (index: number) => {
    setImageIndex(index);
    setShowImageView(true);
  }

  const handleImageClose = () => {
    setShowImageView(false);
  }

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
      {showImageView &&
        //todo: la vista de imagen no funciona
        <ImageView
          imageUrls={imageUrls}
          initialIndex={1}
          onClose={handleImageClose}
        />
      }
    </>
  )
}

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
        layout="fill"
        objectFit="cover"
        className="rounded-md border"
        onClick={handleClick}
      />
    </div>
  )
}
