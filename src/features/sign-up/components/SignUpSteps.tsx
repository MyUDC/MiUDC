"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { IoArrowBack } from "react-icons/io5";

import FormSwiper from "@/features/sign-up/components/FormSwiper";
import Stepper from "@/features/sign-up/components/Stepper";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";
import { Button } from "@/components/ui/button";

export default function SignUpSteps() {
  const router = useRouter();
  const {
    values,
    setSwiper,
    goToPrevSlide,
    index,
  } = useFormSwiperStore();

  const handleBackButton = () => {
    if (index === 0) {
      router.back();
    } else {
      goToPrevSlide();
    }
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex justify-center">
        <Button
          variant="outline"
          className="fixed top-4 left-4 flex items-center z-20"
          onClick={handleBackButton}
        >
          <IoArrowBack className="text-green h-4 w-4" />
        </Button>
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