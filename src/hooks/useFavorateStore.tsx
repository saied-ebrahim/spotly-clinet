import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EventDocument } from "@/types/eventInterface";

interface FavoriteStore {
  favorites: EventDocument[];
  toggleFavorite: (event: EventDocument) => void;
}

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (event: EventDocument) =>
        set((state) => {
          const isFavorite = Boolean(
            state.favorites.find((ev) => ev._id === event._id)
          );
          return {
            favorites: isFavorite
              ? state.favorites.filter((ev) => ev._id !== event._id) // Remove if exists
              : [...state.favorites, event], // Add if doesn't exist
          };
        }),
    }),
    {
      name: "favorites-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useFavoriteStore;
