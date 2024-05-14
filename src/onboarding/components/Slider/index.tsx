'use client'

// Dependencies
import { useRef, useState } from 'react';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperInstance from 'swiper';

import OnboardingPageOne from '../OnboardingPageOne';
import OnboardingPageTwo from '../OnboardingPageTwo';

// Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './styles.css'

// Component
export default function Slider() {

  const swiperReference = useRef<SwiperInstance | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const nextSlide = () => {
    swiperReference.current?.slideNext();
  }

  const prevSlide = () => {
    swiperReference.current?.slidePrev();
  }

  return (
    <div className='h-full w-full'>
      <Swiper
        className='w-full h-full bg-primary'
        modules={[Pagination]}
        pagination={{ type: 'bullets' }}
        onSwiper={(swiper) => (swiperReference.current = swiper)}
        onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
      >
        <SwiperSlide>
          <OnboardingPageOne />
        </SwiperSlide>
        <SwiperSlide>
          <OnboardingPageTwo />
        </SwiperSlide>
      </Swiper >

      {/* TODO: finish navigation buttons */}
      <div className='navigation-buttons text-white h-28 w-full flex text-center'>
        <button className="w-full" onClick={prevSlide}>
          Anterior
        </button>
        <button className="w-full" onClick={nextSlide}>
          Siguiente
        </button>
      </div>
    </div>
  );
};