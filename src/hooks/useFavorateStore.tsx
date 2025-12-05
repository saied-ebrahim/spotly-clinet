import { create } from 'zustand';
interface FavoriteStore {
  favorites: (string | number)[];
  toggleFavorite: (id: string | number) => void;
}

const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  toggleFavorite: (id) => set((state) => {
    const isFavorite = state.favorites.includes(id);
    return {
      favorites: isFavorite
        ? state.favorites.filter((favId) => favId !== id) // Remove if exists
        : [...state.favorites, id], // Add if doesn't exist
    };
  }),
}));
export default useFavoriteStore;