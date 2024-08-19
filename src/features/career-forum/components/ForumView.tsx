import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ExperiencesView from "@/features/career-forum/components/ForumElements/ExperiencesView";
import AsksView from "@/features/career-forum/components/ForumElements/AsksView";

export default function ForumView() {
  const [selectedTab, setSelectedTab] = useState<"experiencias" | "preguntas">(
    "experiencias"
  );
  const swiperRef = useRef<any>(null); // Referencia para el Swiper

  const handleTabClick = (tab: "experiencias" | "preguntas") => {
    setSelectedTab(tab);
    const index = tab === "experiencias" ? 0 : 1;
    swiperRef.current.slideTo(index); // Desliza a la vista correspondiente
  };

  return (
    <div className="h-full">
      <div className="flex justify-center mb-4">
        <button
          className={`flex-1 py-2 border-b-2 transition-colors duration-300 text-lg ${
            selectedTab === "experiencias"
              ? "border-green text-green font-semibold"
              : "border-transparent text-gray-600 hover:text-green"
          }`}
          onClick={() => handleTabClick("experiencias")}
        >
          Experiencias
        </button>
        <button
          className={`flex-1 py-2 border-b-2 transition-colors duration-300 text-lg ${
            selectedTab === "preguntas"
              ? "border-green text-green font-semibold"
              : "border-transparent text-gray-600 hover:text-green"
          }`}
          onClick={() => handleTabClick("preguntas")}
        >
          Preguntas
        </button>
      </div>
      <div className="mt-6 h-[400px]">
        <Swiper
          onSlideChange={(swiper) => {
            const activeIndex = swiper.activeIndex;
            setSelectedTab(activeIndex === 0 ? "experiencias" : "preguntas");
          }}
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Guardar la referencia del swiper
          className="h-full"
        >
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <ExperiencesView />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <AsksView />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
