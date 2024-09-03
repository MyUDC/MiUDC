import React from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SlideProps {
  imageSrc?: string; // Hacemos que imageSrc sea opcional
  altText: string;
  title: string;
  subtitle: string;
  bgColor: string;
  currentStep: number;
  totalSteps: number;
}

const Slide: React.FC<SlideProps> = ({
  imageSrc,
  altText,
  title,
  subtitle,
  bgColor,
  currentStep,
  totalSteps,
}) => {
  const router = useRouter();

  // Si imageSrc no está definido, no renderizamos nada
  if (!imageSrc) {
    return null;
  }

  return (
    <div className={`h-svh px-4 flex flex-col justify-between ${bgColor}`}>
      {currentStep === 0 && (
        <button
          className="absolute top-4 left-4 text-white text-3xl"
          onClick={() => router.push("/onboarding")}
        >
          <FaArrowLeft />
        </button>
      )}
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex justify-center mb-6">
          <Image
            src={imageSrc}
            alt={altText}
            width={280}
            height={280}
            priority
          />
        </div>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg">
            {title}
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
