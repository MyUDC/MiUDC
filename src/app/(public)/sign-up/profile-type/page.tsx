"use client";
import { useState } from "react";
import ProfileCard from "@/features/onboarding/components/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function ProfileSelection() {
  const router = useRouter();

  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleSelect = (profile: string | null) => {
    setSelectedProfile(profile);
  };

  return (
    <section className="bg-gray-50 relative">
      <Link href="/welcome" className="absolute top-4 left-4 text-green">
        <FaArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex justify-center mb-6">
          <Image
            src="/svgs/logo-inline.svg"
            alt="logotipo de MiUdc"
            width={230}
            height={230}
            priority
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Selección de Perfil
            </h1>
            <ProfileCard
              selectedProfile={selectedProfile}
              onSelect={handleSelect}
            />
            <button
              onClick={() => {
                Cookie.set("profile", selectedProfile!);
                router.push("/sign-up/career");
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
        </div>
      </div>
    </section>
  );
}
