import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ForumView from "@/features/career-forum/components/ForumView";
import DetailsView from "@/features/career-forum/components/DetailsView";
import SwitchButton from "@/shared/components/SwitchButton";
import FavoritesButton from "@/shared/components/FavoritesButton";

export default function CareerContent() {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleViewChange = (index: number) => {
    swiperInstance.slideTo(index);
    setActiveIndex(index);
  };

  const toggleSwitch = () => {
    const newIndex = activeIndex === 0 ? 1 : 0;
    handleViewChange(newIndex);
  };

  return (
    <div className="relative z-10 w-full">
      <div className="flex flex-col xs:flex-row justify-between items-center mb-4">
        <SwitchButton
          activeIndex={activeIndex}
          onToggle={toggleSwitch}
          labels={["Foro", "Detalles"]}
        />
        <div className="flex items-center xs:mt-0 mt-2">
          <span className="mr-2 text-gray-500 font-semibold text-base">
            Favoritos
          </span>
          <FavoritesButton />
        </div>
      </div>
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <ForumView />
        </SwiperSlide>
        <SwiperSlide>
          <DetailsView />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
