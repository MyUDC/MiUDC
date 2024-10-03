"use client";

import FormSwiper from "@/features/sign-up/components/FormSwiper";
import Image from "next/image";
import {FaArrowLeft} from "react-icons/fa";
import {useFormSwiperStore} from "@/stores/useFormSwiperStore";
import Stepper, {Step} from "@/features/sign-up/components/Stepper";
import {Progress} from "@/components/ui/progress";

export default function SignUpSteps() {
  const {
    setSwiper,
    goToNextSlide,
    goToPrevSlide,
    swiper
  } = useFormSwiperStore();

  const steps: Step[] = [
    {
      icon: <div>1</div>,
      message: "step 1"
    },
    {
      icon: <div>2</div>,
      message: "step 2"
    }, {
      icon: <div>3</div>,
      message: "step 3"
    },
  ]


  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex justify-center">
        <button
          className="absolute top-4 left-4 text-green"
          onClick={goToPrevSlide}
        >
          <FaArrowLeft className="w-6 h-6"/>
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
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Stepper steps={steps} currentStep={swiper?.activeIndex ?? 0}/>
            <FormSwiper onSwiper={setSwiper}/>
          </div>
        </div>
        <button onClick={goToNextSlide}>Next</button>
        <button onClick={goToPrevSlide}>Prev</button>
      </ section>
    </div>
  );
}