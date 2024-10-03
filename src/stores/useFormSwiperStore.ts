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

    const goToNextSlide = () => get().swiper?.slideNext();

    const goToPrevSlide = () => get().swiper?.slidePrev();

    return {
      swiper: null,
      setSwiper,
      values: null,
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
        const { swiper, setSwiper, ...partialState } = state;
        return partialState as State;
      },
    }
  )
);