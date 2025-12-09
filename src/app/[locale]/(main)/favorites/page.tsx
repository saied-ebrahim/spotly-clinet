"use client";

import dynamic from "next/dynamic";

const FavoritesList = dynamic(
  () => import("@/components/Favorites/FavoritesList"),
  {
    ssr: false,
    loading: () => (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export default function FavoritesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <FavoritesList />
    </div>
  );
}
