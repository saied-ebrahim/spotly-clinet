import axiosInstance from '@/lib/axios';
import { create } from 'zustand';
interface FavoriteStore {
  favorites: (string | number)[];
  toggleFavorite: (id: string | number) => void;
}
// let getFavorites = await axiosInstance.get('/favorites').then((res) => {
//     return res.data;
//   });
const useFavoriteStore = create<FavoriteStore>((set) => {

//  let favorites = getFavorites;
  return {
//   favorites: favorites,
  favorites: [],
  toggleFavorite: (id) => set((state) => {
    const isFavorite = state.favorites.includes(id);
    return {
      favorites: isFavorite
        ? state.favorites.filter((favId) => favId !== id) // Remove if exists
        : [...state.favorites, id], // Add if doesn't exist
    };
  }),
}});
export default useFavoriteStore;