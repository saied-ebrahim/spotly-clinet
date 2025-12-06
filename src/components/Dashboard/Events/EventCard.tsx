import { FiCalendar, FiTag, FiStar } from "react-icons/fi";
import Image from "next/image";
import { EventDocument } from "@/types/eventInterface";
import { formatDate } from "@/utils/details/formatting";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: EventDocument;
}

export function EventCard({ event }: EventCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { toggleFavorite, favorites } = useFavoriteStore();

  const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleFavorite(event);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const isFavorite = favorites.some((ev) => ev._id === event._id);

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative w-full sm:w-48 h-48 bg-slate-200 shrink-0">
        {event.media?.mediaUrl ? (
          <Image
            src={event.media?.mediaUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <FiCalendar size={32} />
          </div>
        )}

        {/* Category Badge */}
        {event.category?.[0]?.name && (
          <div className="absolute bottom-2 left-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">
            {event.category[0].name}
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleAddFavorites}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all duration-300 cursor-pointer 
            ${
              isFavorite
                ? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100"
                : "bg-white text-slate-400 hover:text-yellow-500 hover:bg-white"
            }
            ${
              isAnimating
                ? "scale-125 shadow-md ring-2 ring-yellow-100"
                : "hover:scale-110 active:scale-95"
            }
          `}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiStar
            size={16}
            fill={isFavorite ? "currentColor" : "none"}
            className={`transition-transform duration-300 ${
              isAnimating ? "scale-110" : ""
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-1 mb-3">
            <div className="flex items-center text-sm text-slate-600">
              <span className="font-medium mr-1">
                {formatDate(event.date)} | {event.location?.city || "N/A"}
              </span>
            </div>
            <div className="text-sm text-slate-500">{event.time}</div>
          </div>
        </div>

        <div className="flex items-center text-brand-primary font-bold text-sm">
          <FiTag className="mr-1.5" />
          {event.ticketType.price}
        </div>
      </div>
    </div>
  );
}
