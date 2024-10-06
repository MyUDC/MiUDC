"use client";
import { useEffect, useState } from "react";
import ProfileCard from "@/features/onboarding/components/ProfileCard";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";

export default function ProfileTypeForm() {
  const { values, goToNextSlide, setValue } = useFormSwiperStore();
  const [selectedProfile, setSelectedProfile] = useState<Role | null>(null);

  //todo: working on initial values

  const handleSelect = (profile: Role | null) => {
    setSelectedProfile(profile);
  };

  useEffect(() => {
    setSelectedProfile(values?.profileType?.profileType!);
  }, [values]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        ¿Qué tipo de perfil deseas crear?
      </h1>
      <ProfileCard
        selectedProfile={selectedProfile}
        onSelect={handleSelect}
      />
      <button
        type="button"
        disabled={!selectedProfile}
        onClick={() => {
          setValue("profileType", {
            profileType: selectedProfile
          })
          goToNextSlide();
        }}
        className={`mt-4 py-2 px-4 w-full rounded-md text-white font-semibold ${selectedProfile
          ? "bg-green hover:bg-green-600"
          : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        Continuar
      </button>
    </div>
  );
}
