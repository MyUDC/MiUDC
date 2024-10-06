"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperType from "swiper";

import ProfileTypeForm from "./ProfileTypeForm";
import ChooseCareerForm from "./ChooseCareerForm";
import RegisterForm from "./RegisterForm";

import "swiper/css";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";

interface Props {
  onSwiper: (swiper: SwiperType) => void;
}

export default function FormSwiper({ onSwiper }: Props) {
  const { values } = useFormSwiperStore();

  return (
    <div className="max-w-sm self-center">
      <Swiper
        initialSlide={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={onSwiper}
        allowTouchMove={false}
        centeredSlides
        centeredSlidesBounds
        centerInsufficientSlides
      >
        <SwiperSlide>
          <ProfileTypeForm />
        </SwiperSlide>

        {/* this slide is only for students */}
        {values?.profileType?.profileType === "STUDENT" && (
          <SwiperSlide>
            <ChooseCareerForm />
          </SwiperSlide>
        )}

        <SwiperSlide>
          <RegisterForm />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}