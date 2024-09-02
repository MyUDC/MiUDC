"use client";

import { useRouter } from "next/navigation";
import Slide from "@/shared/components/Slide";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Swiper as SwiperType } from "swiper/modules";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { slidesData } from "@/features/onboarding/data/slidesData";

export default function OnboardingSlides() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const { activeIndex } = swiperRef.current;
      setActiveIndex(activeIndex);
    }
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      const { activeIndex, slides } = swiperRef.current;
      if (activeIndex >= slides.length - 1) {
        router.push("/welcome");
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  const handleSkip = () => {
    router.push("/welcome"); // Redirects the user after onboarding
  };

  const isSingleSlide = slidesData.length === 1;

  return (
    <div className="relative h-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="h-full"
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide
              imageSrc={slide.imageSrc}
              altText={slide.altText || ""}
              title={slide.title || ""}
              subtitle={slide.subtitle || ""}
              bgColor={slide.bgColor || ""}
              currentStep={index}
              totalSteps={slidesData.length}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="swiper-pagination"></div>
      </div>

      {/* Navigation buttons */}
      {isSingleSlide ? (
        <>
          <button
            className="absolute bottom-4 left-4 transform text-white text-sm z-10"
            onClick={handleSkip}
          >
            Saltar
          </button>
          <button
            className="absolute bottom-4 right-4 transform text-white text-sm z-10"
            onClick={() => router.push("/welcome")}
          >
            Comenzar
          </button>
        </>
      ) : (
        <>
          {activeIndex === 0 && (
            <>
              <button
                className="absolute bottom-4 left-4 transform text-white text-sm z-10"
                onClick={handleSkip}
              >
                Saltar
              </button>
              <button
                className="absolute bottom-4 right-4 transform text-white text-sm z-10 flex items-center"
                onClick={handleNextSlide}
              >
                Siguiente <FaArrowRight className="ml-2" />
              </button>
            </>
          )}

          {activeIndex > 0 && activeIndex < slidesData.length - 1 && (
            <>
              <button
                className="absolute bottom-4 left-4 transform text-white text-sm z-10 flex items-center"
                onClick={handlePrevSlide}
              >
                <FaArrowLeft className="mr-2" /> Atrás
              </button>
              <button
                className="absolute bottom-4 right-4 transform text-white text-sm z-10 flex items-center"
                onClick={handleNextSlide}
              >
                Siguiente <FaArrowRight className="ml-2" />
              </button>
            </>
          )}

          {activeIndex === slidesData.length - 1 && (
            <>
              <button
                className="absolute bottom-4 left-4 transform text-white text-sm z-10 flex items-center"
                onClick={handlePrevSlide}
              >
                <FaArrowLeft className="mr-2" /> Atrás
              </button>
              <button
                className="absolute bottom-4 right-4 transform text-white text-sm z-10"
                onClick={() => router.push("/welcome")}
              >
                Comenzar
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
