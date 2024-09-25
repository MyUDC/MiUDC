"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Autoplay from "embla-carousel-autoplay";
import LargeCareerCard from "./LargeCareerCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
};

type CarouselLargeCardsProps = {
  careers: Career[];
  paginationClass: string;
};

export default function CarouselLargeCards({
  careers,
  paginationClass,
}: CarouselLargeCardsProps) {
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  useEffect(() => {
    setLoading(careers.length === 0);
  }, [careers]);

  function renderSkeletons() {
    return <Skeleton className="h-[300px] w-full" />;
  }

  function renderCareers() {
    if (isMobile) {
      return (
        <>
          <Swiper
            slidesPerView={1.15}
            spaceBetween={8}
            className="w-full -ml-2"
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: `.${paginationClass}`,
            }}
          >
            {careers.map((career) => (
              <SwiperSlide key={career.id}>
                <LargeCareerCard
                  title={career.name}
                  subtitle={career.faculty}
                  imageSrc={`/telematica.jpg`}
                  slug={career.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`${paginationClass} flex justify-center space-x-2 mt-2`}
          ></div>
        </>
      );
    } else {
      return (
        <Carousel
          plugins={[autoplayRef.current]}
          className="w-full"
          onMouseEnter={autoplayRef.current.stop}
          onMouseLeave={autoplayRef.current.reset}
        >
          <CarouselContent>
            {careers.map((career) => (
              <CarouselItem key={career.id}>
                <LargeCareerCard
                  title={career.name}
                  subtitle={career.faculty}
                  imageSrc={`/telematica.jpg`}
                  slug={career.slug}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      );
    }
  }

  return (
    <div className="w-full px-0 md:px-12">
      {loading ? renderSkeletons() : renderCareers()}
    </div>
  );
}
