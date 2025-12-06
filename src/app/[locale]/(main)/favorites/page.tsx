"use client";

import { useEffect, useState } from "react";
import useFavoriteStore from "@/hooks/useFavorateStore";
import EventCard from "@/components/ui/home/EventCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { FiStar } from "react-icons/fi";

const FavoritesPage = () => {
  const router = useRouter();
  const { favorites, loadFavorites } = useFavoriteStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeFavorites = () => {
      // Check if user is logged in
      const cookie = Cookies.get("token");
      if (!cookie) {
        router.push("/auth/login");
        return;
      }

      try {
        const decrypted = decryptData(cookie) as { token?: string };
        if (!decrypted || !decrypted.token) {
          router.push("/auth/login");
          return;
        }

        // Load favorites from localStorage
        loadFavorites();
      } catch (err) {
        console.error("Token validation failed", err);
        router.push("/auth/login");
        return;
      }

      // Set loading to false after all checks
      setIsLoading(false);
    };

    initializeFavorites();
  }, [router, loadFavorites]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading favourites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          My Favourites
        </h1>
        <p className="text-slate-600">
          {favorites.length > 0
            ? `You have ${favorites.length} event${
                favorites.length > 1 ? "s" : ""
              } in your favourites`
            : "Start adding events to your favourites"}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 p-6 bg-yellow-50 rounded-full">
            <FiStar size={64} className="text-yellow-500" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            There is yet no item in favourites
          </h2>
          <p className="text-slate-500 mb-6">
            Browse events and add them to your favourites to see them here
          </p>
          <button
            onClick={() => router.push("/events")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
