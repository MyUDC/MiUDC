import { create } from 'zustand';

interface State {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAuthAlert = create<State>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));