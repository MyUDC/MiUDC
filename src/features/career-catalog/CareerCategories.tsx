"use client";

import React, { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";
import CategoryCard from "./components/CategoryCard";
import { careerCategories } from "./data/careerCategoriesData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ClientOnlyProps {
  children: ReactNode;
}

function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
}

export default function CareerCategories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkIsMobile() {
      setIsMobile(window.innerWidth <= 640);
    }

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  function renderCategories() {
    if (isMobile) {
      const groupedCategories = [];
      for (let i = 0; i < careerCategories.length; i += 4) {
        groupedCategories.push(careerCategories.slice(i, i + 4));
      }

      return (
        <Swiper slidesPerView={1.15} spaceBetween={8} className="w-full -ml-2">
          {groupedCategories.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex} className="pl-2 md:basis-4/5">
              <div className="grid grid-cols-2 gap-2">
                {group.map((category, index) => (
                  <CategoryCard
                    key={index}
                    title={category.title}
                    gradient={category.gradient}
                    image={category.image}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return (
        <div className="grid grid-cols-4 gap-2">
          {careerCategories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              gradient={category.gradient}
              image={category.image}
            />
          ))}
        </div>
      );
    }
  }

  return (
    <ClientOnly>
      <div className="w-full">{renderCategories()}</div>
    </ClientOnly>
  );
}
