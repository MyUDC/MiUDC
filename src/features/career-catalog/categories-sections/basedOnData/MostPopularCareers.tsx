"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Autoplay from "embla-carousel-autoplay";
import CardWithDynamicText from "../../components/CardWithDynamicText";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCareersWithMoreInteractions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreInteractions";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  interactionsCount: number;
};

export default function MostPopularCareers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  useEffect(() => {
    const fetchCareers = async () => {
      const popularCareers = await getCareersWithMoreInteractions(5);
      setCareers(popularCareers);
      setLoading(false);
    };
    fetchCareers();
  }, []);

  function renderSkeletons() {
    return (
      <>
        <Skeleton className="h-[300px] w-full" />
      </>
    );
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
              el: ".swiper-pagination-popular-careers",
            }}
          >
            {careers.map((career) => (
              <SwiperSlide key={career.id}>
                <CardWithDynamicText
                  title={career.name}
                  subtitle={career.faculty}
                  imageSrc={`/telematica.jpg`}
                  slug={career.slug} // Pasa el slug para redirigir
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-popular-careers flex justify-center space-x-2 mt-2"></div>
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
                <CardWithDynamicText
                  title={career.name}
                  subtitle={career.faculty}
                  imageSrc={`/telematica.jpg`}
                  slug={career.slug} // Pasa el slug aquí también
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
