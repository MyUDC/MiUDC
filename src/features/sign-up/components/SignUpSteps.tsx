"use client";

import FormSwiper from "@/features/sign-up/components/FormSwiper";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";
import Stepper from "@/features/sign-up/components/Stepper";

export default function SignUpSteps() {
  const {
    values,
    setSwiper,
    goToNextSlide,
    goToPrevSlide,
    index,
  } = useFormSwiperStore();

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex justify-center">
        <button
          title="Back"
          type="button"
          className="absolute top-4 left-4 text-green"
          onClick={goToPrevSlide}
        >
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={230}
          height={230}
          priority
        />
      </header>
      <section>
        <div className="mx-auto bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
          <div className="flex flex-col justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
            <Stepper
              totalSteps={values?.profileType?.profileType === "STUDENT" ? 3 : 2}
              currentStep={index} />
            <FormSwiper onSwiper={setSwiper} />
          </div>
        </div>
      </ section>
    </div>
  );
}