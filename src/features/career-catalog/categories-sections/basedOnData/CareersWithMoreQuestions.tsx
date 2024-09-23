"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Autoplay from "embla-carousel-autoplay";
import CardWithDynamicText from "../../components/CardWithDynamicText";
import { Skeleton } from "@/components/ui/skeleton";
import { getCareersWithMoreQuestions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreQuestions";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  questionsCount: number;
};

export default function CareersWithMoreQuestions() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchCareers = async () => {
      const careersData = await getCareersWithMoreQuestions(5);
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
    <div className="w-full px-0 relative pb-10">
      {loading ? (
        renderSkeletons()
      ) : (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.15}
          spaceBetween={8}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          onMouseEnter={autoplayRef.current.stop}
          onMouseLeave={autoplayRef.current.reset}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-questions",
          }}
          className="w-full"
        >
          {careers.map((career) => (
            <SwiperSlide key={career.id}>
              <CardWithDynamicText
                title={career.name}
                subtitle={career.faculty}
                slug={career.slug}
                imageSrc={`/telematica.jpg`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="swiper-pagination-questions flex justify-center space-x-2 mt-2"></div>
    </div>
  );
}
