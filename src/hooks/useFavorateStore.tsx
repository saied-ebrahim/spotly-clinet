import { create } from "zustand";
import { EventDocument } from "@/types/eventInterface";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";

interface FavoriteStore {
  favorites: EventDocument[];
  toggleFavorite: (event: EventDocument) => void;
  loadFavorites: () => void;
  clearFavorites: () => void;
}

// Get user ID from token
const getUserId = (): string | null => {
  try {
    const cookie = Cookies.get("token");
    if (!cookie) {
      console.log("No token cookie found");
      return null;
    }

    const decrypted = decryptData(cookie) as { token?: string };
    if (!decrypted?.token) {
      console.log("No token in decrypted data");
      return null;
    }

    const decoded = parseJwt(decrypted.token);
    console.log("Decoded token:", decoded);

    const userId =
      decoded?.nameid || decoded?.sub || decoded?.userId || decoded?.id || null;
    console.log("User ID:", userId);

    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

// Load favorites from localStorage for specific user
const loadFavoritesFromStorage = (): EventDocument[] => {
  if (typeof window === "undefined") return [];

  const userId = getUserId();
  if (!userId) {
    console.log("No user ID, cannot load favorites");
    return [];
  }

  try {
    const key = `favorites_${userId}`;
    const stored = localStorage.getItem(key);
    console.log(`Loading favorites for user ${userId}:`, stored);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

// Save favorites to localStorage for specific user
const saveFavoritesToStorage = (favorites: EventDocument[]) => {
  if (typeof window === "undefined") return;

  const userId = getUserId();
  if (!userId) return;

  try {
    const key = `favorites_${userId}`;
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: loadFavoritesFromStorage(),

  toggleFavorite: (event: EventDocument) =>
    set((state) => {
      const isFavorite = Boolean(
        state.favorites.find((ev) => ev._id === event._id)
      );
      const newFavorites = isFavorite
        ? state.favorites.filter((ev) => ev._id !== event._id)
        : [...state.favorites, event];

      console.log(
        "Toggling favorite:",
        event.title,
        "New count:",
        newFavorites.length
      );
      saveFavoritesToStorage(newFavorites);
      return { favorites: newFavorites };
    }),

  loadFavorites: () =>
    set(() => ({
      favorites: loadFavoritesFromStorage(),
    })),

  clearFavorites: () =>
    set(() => {
      const userId = getUserId();
      if (userId && typeof window !== "undefined") {
        localStorage.removeItem(`favorites_${userId}`);
      }
      return { favorites: [] };
    }),
}));

export default useFavoriteStore;
