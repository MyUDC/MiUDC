"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Autoplay from "embla-carousel-autoplay";
import SmallCareerCard from "./SmallCareerCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Career } from "@/features/career-catalog/types/Career";

type CarouselSmallCardsProps = {
  careers: Career[];
  paginationClass: string;
};

export default function CarouselSmallCards({
  careers,
  paginationClass,
}: CarouselSmallCardsProps) {
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    setLoading(careers.length === 0);
  }, [careers]);

  const renderSkeletons = () => (
    <div className="flex space-x-4">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="h-[300px] w-full" />
      ))}
    </div>
  );

  const renderSwiperSlides = () =>
    careers.map((career) => (
      <SwiperSlide key={career.id} className="py-4">
        <div className="">
          <SmallCareerCard
            title={career.name}
            subtitle={career.faculty.name}
            imageUrl="/telematica.jpg"
            slug={career.slug}
          />
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="w-full pb-10">
      {loading ? (
        renderSkeletons()
      ) : (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.25}
          spaceBetween={10}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          onMouseEnter={autoplayRef.current.stop}
          onMouseLeave={autoplayRef.current.reset}
          pagination={{
            clickable: true,
            el: `.${paginationClass}`,
          }}
          breakpoints={{
            340: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            750: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.15,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {renderSwiperSlides()}
        </Swiper>
      )}
      <div
        className={`${paginationClass} flex justify-center space-x-2 mt-4`}
      ></div>
    </div>
  );
}
