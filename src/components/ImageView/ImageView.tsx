import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import Image from "next/image";
import "tailwindcss/tailwind.css";

type ImageViewProps = {
  imageUrls: string[];
  initialIndex: number;
  onClose: () => void;
};

export default function ImageView({
  imageUrls,
  initialIndex,
  onClose,
}: ImageViewProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  }, [swiperInstance]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev, onClose]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        ref={containerRef}
      >
        <button title="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:opacity-75 z-50"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button title="Previous Image"
          onClick={handlePrev}
          className={`absolute top-1/2 -translate-y-1/2 left-4 text-white text-3xl hover:opacity-75 z-50 ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-75"
          } ${"hidden sm:block"}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button title="Next Image"
          onClick={handleNext}
          className={`absolute top-1/2 -translate-y-1/2 right-4 text-white text-3xl hover:opacity-75 z-50 ${
            currentIndex === imageUrls.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-75"
          } ${"hidden sm:block"}`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          className="w-full h-full z-0"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={url}
                alt={`Image ${index}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
