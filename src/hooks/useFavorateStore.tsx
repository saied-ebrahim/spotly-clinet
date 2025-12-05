import axiosInstance from '@/lib/axios';
import { create } from 'zustand';
import { EventDocument } from '@/types/eventInterface';
interface FavoriteStore {
  favorites: EventDocument[];
  toggleFavorite: (event: EventDocument) => void;
}
// let getFavorites = await axiosInstance.get('/favorites').then((res) => {
//     return res.data;
//   });
const useFavoriteStore = create<FavoriteStore>((set) => {

//  let favorites = getFavorites;
  return {
//   favorites: favorites,
  favorites: [],
  toggleFavorite: (event: EventDocument) => set((state) => {
    console.log(state.favorites);
    const isFavorite = Boolean(state.favorites.find((ev) => ev._id === event._id));
    console.log(isFavorite);
    return {
      favorites: isFavorite
        ? state.favorites.filter((ev) => ev._id !== event._id) // Remove if exists
        : [...state.favorites, event], // Add if doesn't exist
    };
  }),
}});
export default useFavoriteStore;