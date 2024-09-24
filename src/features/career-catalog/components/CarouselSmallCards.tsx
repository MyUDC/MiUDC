"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Autoplay from "embla-carousel-autoplay";
import SmallCareerCard from "./SmallCareerCard";
import { Skeleton } from "@/components/ui/skeleton";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
};

type CarouselSmallCardsProps = {
  fetchFunction: (limit: number) => Promise<Career[]>;
  paginationClass: string;
};

export default function CarouselSmallCards({
  fetchFunction,
  paginationClass,
}: CarouselSmallCardsProps) {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchCareers = async () => {
      const careersData = await fetchFunction(5);
      setCareers(careersData);
      setLoading(false);
    };
    fetchCareers();
  }, [fetchFunction]);

  const renderSkeletons = () => <Skeleton className="h-[300px] w-full" />;

  const renderSwiperSlides = () =>
    careers.map((career) => (
      <SwiperSlide key={career.id} className="py-4">
        <div className="flex justify-center">
          <SmallCareerCard
            title={career.name}
            subtitle={career.faculty}
            imageUrl="/telematica.jpg"
            slug={career.slug}
          />
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 relative pb-10">
      {loading ? (
        renderSkeletons()
      ) : (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          onMouseEnter={autoplayRef.current.stop}
          onMouseLeave={autoplayRef.current.reset}
          pagination={{
            clickable: true,
            el: `.${paginationClass}`,
          }}
          breakpoints={{
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
