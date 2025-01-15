import { useState, useEffect, useRef } from "react";

import type SwiperType from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Keyboard } from "swiper/modules";
import { FaUserGraduate, FaUser } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

import { Role } from "@prisma/client";
import { a } from "@react-spring/web";
import clsx from "clsx";

interface ProfileCardProps {
  selectedProfile: Role | null;
  onSelect: (profile: Role | null) => void;
}

export default function ProfileCard({
  selectedProfile,
  onSelect,
}: ProfileCardProps) {

  // ----[ Instances and States ]----
  const [localSelectedProfile, setLocalSelectedProfile] = useState<string | null>(selectedProfile);
  const swiperInstance = useRef<SwiperType | null>(null);


  // ----[ Functions ]----
  const handleSelect = (profile: Role) => {
    const newSelection = localSelectedProfile === profile ? null : profile;
    setLocalSelectedProfile(newSelection);
    onSelect(newSelection); // Update parent component
  };

  const handleSlideChange = () => {
    if (localSelectedProfile) {
      setLocalSelectedProfile(null);
      onSelect(null); // Reset selection in parent component
    }
  };


  // ----[ Effects ]----
  useEffect(() => { // Update swiper on init to load the state from global state
    if (swiperInstance.current && selectedProfile) {
      swiperInstance.current.slideTo(profileIndex[selectedProfile as keyof typeof profileIndex]);
      setLocalSelectedProfile(selectedProfile);
    }
  }, [selectedProfile]);


  // ----[ Render ]----
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Swiper
        className={clsx(
          "flex items-center justify-center w-full cursor-pointer border rounded-md transition-all duration-300 ease-in-out",
          {
            "border-yellow border-2 text-yellow": localSelectedProfile === Role.ASPIRANT,
            "border-green border-2 text-green": localSelectedProfile === Role.STUDENT,
            "border-gray-300 border": !localSelectedProfile,
          }
        )}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Keyboard]}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => swiperInstance.current = swiper}
        keyboard={{ enabled: true, onlyInViewport: true }}
      >
        {profilesData.map((profile) => (
          <SwiperSlide
            key={profile.label}
            className="p-4"
            onClick={() => handleSelect(profile.value)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {profile.icon}
              <h2 className="text-lg font-semibold mt-4">{profile.label}</h2>
              <p className="text-left text-sm mt-2 p-4 text-black">
                {profile.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination absolute bottom-2 left-0 right-0 flex justify-center" />
      </Swiper>
    </div>
  );
}

// parse the profile string to an index based on his slider position
const profileIndex = {
  ASPIRANT: 0,
  STUDENT: 1,
};

interface Profile {
  label: string;
  icon: JSX.Element;
  value: Role;
  index: number;
  description: JSX.Element;
}

const profilesData: Profile[] = [
  {
    label: "Aspirante",
    icon: <FaUserGraduate className="text-6xl" />,
    value: Role.ASPIRANT,
    index: 0,
    description: (
      <>
        Como aspirante a alguna carrera de la UdC podrás hacer{" "}
        <strong>preguntas</strong> para discernir cualquier tipo de duda sobre la
        carrera que deseas!
      </>
    ),
  },
  {
    label: "Estudiante",
    icon: <FaUser className="text-6xl" />,
    value: Role.STUDENT,
    index: 1,
    description: (
      <>
        Como estudiante de alguna carrera de la UdC podrás hacer{" "}
        <strong>testimonios</strong> y <strong>preguntas</strong>. Solo asegúrate
        de tener activo tu correo Ucol y tu número de cuenta!
      </>
    ),
  },
];