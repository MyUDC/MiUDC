import { useState, useCallback, useEffect } from 'react';

import SwiperType from "swiper";

export const useFormSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSwiper = useCallback((swiperInstance: SwiperType | null) => {
    setSwiper(swiperInstance);
  }, []);

  useEffect(() => {
    console.log(swiper);
  }, [swiper]);

  const goToNextSlide = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const goToPrevSlide = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  return {
    swiper,
    onSwiper,
    goToNextSlide,
    goToPrevSlide,
  };
};