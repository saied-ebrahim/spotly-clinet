import { FiCalendar, FiTag, FiStar } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EventDocument } from "@/types/eventInterface";
import { formatDate } from "@/utils/details/formatting";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { useState, useEffect } from "react";

interface EventCardProps {
  event: EventDocument;
}

const colors = [
  "bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-green-600 text-white",
  "bg-teal-500 text-white",
  "bg-blue-500 text-white",
  "bg-indigo-500 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",

  "bg-slate-800 text-white",
  "bg-zinc-900 text-white",
  "bg-neutral-800 text-white",
  "bg-stone-800 text-white",
];

export const getCategoryColor = (category: string) => {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const { toggleFavorite, favorites } = useFavoriteStore();

  const isFavorite = favorites.some((fav) => fav._id === event._id);

  const handleCardClick = () => {
    router.push(`/events/${event._id}`);
  };

  const handleAddFavorites = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer"
    >
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
          <div
            className={`absolute bottom-2 left-2 text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded-sm ${getCategoryColor(
              event.category[0].name
            )} text-white bg-opacity-90`}
          >
            {event.category[0].name}
          </div>
        )}

        {/* Favorite Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleAddFavorites}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-all duration-300 z-20 cursor-pointer 
            ${
              isFavorite
                ? "bg-red-50 text-yellow-500 hover:bg-yellow-100"
                : "bg-white/90 text-gray-400 hover:text-yellow-500 hover:bg-white"
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
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
            className={`transition-transform duration-300 ${
              isAnimating ? "scale-110" : ""
            }`}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
          {event.ticketType.price === 0
            ? "Free"
            : `${event.ticketType.price} EGP`}
        </div>
      </div>
    </div>
  );
}
