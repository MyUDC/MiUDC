import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

type LikeState = {
  likedPosts: string[];
  toggleLike: (postSlug: string) => void;
};

const isClient = typeof window !== "undefined";

const storage: StateStorage = {
  getItem: (name): string | null => {
    if (!isClient) return null;
    return localStorage.getItem(name);
  },
  setItem: (name, value): void => {
    if (!isClient) return;
    localStorage.setItem(name, value);
  },
  removeItem: (name): void => {
    if (!isClient) return;
    localStorage.removeItem(name);
  },
};

export const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      likedPosts: [],
      toggleLike: (postSlug: string) =>
        set((state) => {
          const index = state.likedPosts.indexOf(postSlug);
          if (index > -1) {
            return {
              likedPosts: state.likedPosts.filter((slug) => slug !== postSlug),
            };
          } else {
            return { likedPosts: [...state.likedPosts, postSlug] };
          }
        }),
    }),
    {
      name: "like-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
