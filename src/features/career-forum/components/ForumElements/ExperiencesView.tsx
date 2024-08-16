import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Testimony from "@/shared/components/Testimony/Testimony";

type TestimonyType = {
  id: number;
  userName: string;
  userPhotoUrl: string;
  career: string;
  content: string;
  heartCount: number;
  commentCount: number;
  createdAt: Date;
};

const testimonies: TestimonyType[] = [
  {
    id: 1,
    userName: "Eduardo Chacón",
    userPhotoUrl: "/svgs/user.svg",
    career: "Arquitectura",
    content:
      "Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees.",
    heartCount: 121,
    commentCount: 12,
    createdAt: new Date(),
  },
];

export default function ExperiencesView() {
  return (
    <Swiper spaceBetween={16} slidesPerView={1}>
      {testimonies.map((testimony) => (
        <SwiperSlide key={testimony.id}>
          <Testimony {...testimony} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
