'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/swiper-bundle.css";

type ImageViewProps = {
  imageUrls: string[];
  initialIndex?: number;
  onClose: () => void;
};

export default function ImageView({
  imageUrls,
  initialIndex = 0,
  onClose,
}: ImageViewProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMovement, setDragMovement] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const bind = useDrag(
    ({ down, movement: [, my], cancel }) => {
      setIsDragging(down);
      setDragMovement(my);
      if (!down && Math.abs(my) > 150) {
        onClose();
        cancel();
      } else {
        api.start({ y: down ? my : 0, immediate: down });
      }
    },
    { axis: "y", filterTaps: true }
  );

  const opacity = isDragging
    ? 1 - Math.min(Math.abs(dragMovement) / 300, 1)
    : 1;

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    },
    [handleNext, handlePrev, onClose]
  );

  const handleClickOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        ref={containerRef}
      >
        <button
          title="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:opacity-75 z-50"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button
          title="Previous Image"
          onClick={handlePrev}
          className={`absolute top-1/2 -translate-y-1/2 left-4 text-white text-3xl hover:opacity-75 z-50 ${currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-75"
            } hidden sm:block`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          title="Next Image"
          onClick={handleNext}
          className={`absolute top-1/2 -translate-y-1/2 right-4 text-white text-3xl hover:opacity-75 z-50 ${currentIndex === imageUrls.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-75"
            } hidden sm:block`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          className="w-full h-full"
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <animated.div
                {...bind()}
                style={{ y, cursor: isDragging ? "grabbing" : "grab" }}
                className="w-full h-full flex items-center justify-center touch-none select-none"
              >
                <Image
                  src={url}
                  alt={`Image ${index}`}
                  layout="fill"
                  objectFit="contain"
                  className="max-w-full max-h-full"
                  style={{ opacity }}
                />
              </animated.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
