import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware"
import SwiperType from "swiper";

import { FormSchema } from '@/features/sign-up/types/FormSwiper';

interface State {
  swiper: SwiperType | null;
  setSwiper: (swiper: SwiperType | null) => void;
  values: FormSchema | null;
  setValues: (newValues: FormSchema) => void;
  setValue: <FormSchemaKey extends keyof FormSchema>(key: FormSchemaKey, value: FormSchema[FormSchemaKey]) => void;
  index: number;
  setIndex: (index: number) => void;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
}

export const useFormSwiperStore = create(
  persist<State>((set, get) => {
    const setSwiper = (swiper: SwiperType | null) => set({ swiper });

    const setValues = (newValues: FormSchema) => set({ values: newValues });

    const setValue = <FormSchemaKey extends keyof FormSchema>(key: FormSchemaKey, value: FormSchema[FormSchemaKey]) => set((state) => ({
      values: state.values ? {
        ...state.values,
        [key]: value
      } : { [key]: value } as unknown as FormSchema
    }));

    const setIndex = (index: number) => set({ index });

    const goToNextSlide = () => {
      const swiper = get().swiper;
      if (swiper) {
        swiper.slideNext();
        set({ index: swiper.activeIndex });
      }
    };
    
    const goToPrevSlide = () => {
      const swiper = get().swiper;
      if (swiper) {
        swiper.slidePrev();
        set({ index: swiper.activeIndex });
      }
    };

    return {
      swiper: null,
      values: null,
      index: 0,
      setIndex,
      setSwiper,
      setValues,
      setValue,
      goToNextSlide,
      goToPrevSlide
    };
  },
    {
      name: "form-swiper-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { swiper, setSwiper, index, ...partialState } = state;
        return partialState as State;
      },
    }
  )
);