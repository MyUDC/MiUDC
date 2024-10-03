import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaUserGraduate, FaUser } from "react-icons/fa";
import { Role } from "@prisma/client";

interface ProfileCardProps {
  selectedProfile: Role | null;
  onSelect: (profile: Role | null) => void;
}

const profileDescriptions: { [key: string]: JSX.Element } = {
  Estudiante: (
    <>
      Como estudiante de alguna carrera de la UdC podrás hacer{" "}
      <strong>testimonios</strong> y <strong>preguntas</strong>. Solo asegúrate
      de tener activo tu correo Ucol y tu número de cuenta!
    </>
  ),
  Aspirante: (
    <>
      Como aspirante a alguna carrera de la UdC podrás hacer{" "}
      <strong>preguntas</strong> para discernir cualquier tipo de duda sobre la
      carrera que deseas!
    </>
  ),
};

interface Profile {
  label: Role;
  icon: JSX.Element;
}

const profiles: Profile[] = [
  { label: "ASPIRANT", icon: <FaUserGraduate className="text-6xl" /> },
  { label: "STUDENT", icon: <FaUser className="text-6xl" /> },
];

export default function ProfileCard({
  selectedProfile,
  onSelect,
}: ProfileCardProps) {
  const [localSelectedProfile, setLocalSelectedProfile] = useState<
    string | null
  >(selectedProfile);

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

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-md px-4">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {profiles.map(({ label, icon }) => (
          <SwiperSlide
            key={label}
            className={`flex flex-col items-center justify-center h-full p-4 ${localSelectedProfile === label
                ? label === "STUDENT"
                  ? "text-green border-2 border-green rounded-md"
                  : "text-yellow border-2 border-yellow rounded-md"
                : "bg-white text-black border border-gray-300"
              } rounded-md transition-all duration-300 ease-in-out`}
            onClick={() => handleSelect(label)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {icon}
              <h2 className="text-lg font-semibold mt-4">{label}</h2>
              <p className="text-left text-sm mt-2 p-4 text-black">
                {profileDescriptions[label]}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination absolute bottom-2 left-0 right-0 flex justify-center" />
      </Swiper>
    </div>
  );
}
