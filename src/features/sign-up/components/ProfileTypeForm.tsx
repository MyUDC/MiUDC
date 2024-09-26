"use client";
import { useState } from "react";
import ProfileCard from "@/features/onboarding/components/ProfileCard";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";

export default function ProfileTypeForm() {
  const [selectedProfile, setSelectedProfile] = useState<Role | null>(null);

  const router = useRouter();
  const MultiForm = useFormSwiperStore();

  const handleSelect = (profile: Role | null) => {
    setSelectedProfile(profile);
  };

  return (
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
          MultiForm.setValue("profileType", {
            profileType: selectedProfile
          })
          MultiForm.goToNextSlide();
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
  );
}
