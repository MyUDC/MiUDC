import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import {Mousewheel, FreeMode} from "swiper/modules"
import SkeletonImage from "@/components/Skeletons/SkeletonImage";
import ImageView from "@/components/ImageView/ImageView";

type ManyImagesProps = {
  imageSources: string[];
};

export default function ManyImages({ imageSources }: ManyImagesProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageClick = (index: number) => {
    setInitialIndex(index);
    setShowImageView(true);
  };

  return (
    <div className="mt-4 relative">
      {!isLoaded && (
        <div className="grid grid-cols-3 gap-3 absolute top-0 left-0 right-0 bottom-0">
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
          <SkeletonImage
            width="100%"
            height="100%"
            className="rounded-lg border border-gray-200"
          />
        </div>
      )}
      <Swiper
        spaceBetween={5}
        slidesPerView={2.5}
        freeMode={true}
        mousewheel={true}
        direction="horizontal"
        modules={[Mousewheel, FreeMode]}
      >
        {imageSources.map((url, index) => (
          <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
            <Image
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
          </SwiperSlide>
        ))}
      </Swiper>
      {showImageView && (
        <ImageView
          imageUrls={imageSources}
          initialIndex={initialIndex}
          onClose={() => setShowImageView(false)}
        />
      )}
    </div>
  );
}
