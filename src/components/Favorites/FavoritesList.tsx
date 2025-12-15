"use client";

import { useTranslations } from "next-intl";
import { FiHeart } from "react-icons/fi";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { EventCard } from "@/components/Dashboard/Events/EventCard";
import Link from "next/link";

export default function FavoritesList() {
  const t = useTranslations("favorites");
  const tCommon = useTranslations("common");
  const { favorites } = useFavoriteStore();

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <FiHeart className="text-red-500 fill-red-500" />
          {t("myFavorites")}
        </h1>
        <p className="text-slate-600 mt-2">
          {favorites.length} {favorites.length === 1 ? tCommon("event") : tCommon("events")}{" "}
          {t("saved")}
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-100/50">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
            <FiHeart className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {t("noFavorites")}
          </h3>
          <p className="text-slate-500 mb-8 text-center max-w-sm">
            {t("noFavoritesDescription")}
          </p>
          <Link
            href="/events"
            className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            {t("browseEvents")}
          </Link>
        </div>
      )}
    </>
  );
}
