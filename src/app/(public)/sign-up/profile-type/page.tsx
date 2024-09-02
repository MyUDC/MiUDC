"use client";

import Image from "next/image";
import ProfileButton from "@/features/onboarding/components/ProfileButton";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

export default function ProfileTypePage() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileClick = (profile: string) => {
    setSelectedProfile(selectedProfile === profile ? null : profile);
  };

  const profileDescriptions: { [key: string]: string } = {
    Estudiante: "Podrás hacer testimonios y preguntas de tu carrera.",
    Aspirante: "Podrás hacer preguntas para cualquier carrera.",
  };

  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center p-4">
      <Link href="/welcome" className="absolute top-4 left-4 text-green">
        <FaArrowLeft className="w-6 h-6" />
      </Link>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-center mb-6">
          <Image
            src="/svgs/logo-inline.svg"
            alt="logotipo de MiUdc"
            width={230}
            height={230}
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-6">
            Selecciona tu perfil
          </h3>
          <div className="flex justify-center gap-4 mb-6">
            <ProfileButton
              label="Estudiante"
              isSelected={selectedProfile === "Estudiante"}
              onClick={() => handleProfileClick("Estudiante")}
              description={profileDescriptions.Estudiante}
            />
            <ProfileButton
              label="Aspirante"
              isSelected={selectedProfile === "Aspirante"}
              onClick={() => handleProfileClick("Aspirante")}
              description={profileDescriptions.Aspirante}
            />
          </div>
        </div>
        <Link href={selectedProfile ? `/sign-up/register` : "#"}>
          <button
            className={`w-full py-3 text-base rounded-md font-semibold ${
              selectedProfile
                ? "bg-green text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedProfile}
          >
            Continuar
          </button>
        </Link>
      </div>
    </section>
  );
}
