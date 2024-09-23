"use client";
import { useState } from "react";
import ProfileCard from "@/features/onboarding/components/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { useFormSwiper } from "../hooks/useFormSwiper";

export default function ProfileTypeForm() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const router = useRouter();
  const {
    goToNextSlide
  } = useFormSwiper();

  const handleSelect = (profile: string | null) => {
    setSelectedProfile(profile);
  };

  return (
    // <section className="bg-gray-50 relative">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
    <div>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        ¿Qué tipo de perfil deseas crear?
      </h1>
      <ProfileCard
        selectedProfile={selectedProfile}
        onSelect={handleSelect}
      />
      <button
        onClick={() => {
          // Cookie.set("profile", selectedProfile!);
          // router.push("/sign-up/career");
          goToNextSlide();
        }}
        className={`mt-4 py-2 px-4 w-full rounded-md text-white font-semibold ${selectedProfile
          ? "bg-green hover:bg-green-600"
          : "bg-gray-300 cursor-not-allowed"
          }`}
        disabled={!selectedProfile}
      >
        Continuar
      </button>
    </div>
    //     </div>
    //   </div>
    // </section>
  );
}
