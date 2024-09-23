"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Autoplay from "embla-carousel-autoplay";
import SmallCardWithDynamicText from "../../components/SmallCardWithDynamicText";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomCreativeCareers } from "@/shared/actions/Careers/categories/basedOnTags/getRandomCreativeCareers";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  creativeTags: string[];
};

export default function MostCreativeCareers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchCareers = async () => {
      const careersData = await getRandomCreativeCareers(5);
      setCareers(careersData);
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
            el: ".swiper-pagination-creative",
          }}
          breakpoints={{
            400: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {careers.map((career) => (
            <SwiperSlide key={career.id} className="py-4">
              <div className="flex justify-center">
                <SmallCardWithDynamicText
                  title={career.name}
                  subtitle={career.faculty}
                  imageUrl="/telematica.jpg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="swiper-pagination-creative flex justify-center space-x-2 mt-4"></div>
    </div>
  );
}
