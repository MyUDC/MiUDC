import Image from "next/image";
import { useState, useEffect } from "react";
import ImageView from "../ImageView";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props {
  imageUrls?: string[];
}

export const PostImages = ({ imageUrls }: Props) => {
  const [showImageView, setShowImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      <div className="ml-[4.3rem] relative select-none">
        {isLoaded && (
          <Swiper
            slidesPerView={2.5}
            spaceBetween={16}
            className="mySwiper cursor-pointer pb-9"
          >
            {imageUrls.map((src, index) => (
              <SwiperSlide key={index}>
                <PostImage
                  src={src}
                  handleClick={() => handleImageOpen(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
    <div
      className="aspect-square relative w-full h-36 select-none"
      onClick={handleClick}
    >
      <Image
        src={src}
        alt="Image"
        fill
        className="rounded-md border object-cover"
        draggable="false"
      />
    </div>
  );
};
