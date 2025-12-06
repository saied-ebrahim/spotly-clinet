import Image from "next/image";
import { FiStar, FiTag } from "react-icons/fi";

import Link from "next/link";
import { formatTime, getMonthDay } from "@/utils/details/formatting";
import { EventDocument } from "@/types/eventInterface";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/utils/general";


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



const EventCard = ({ event }: { event: EventDocument }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { toggleFavorite } = useFavoriteStore();
console.log(event)
 const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleFavorite(event);
  };


  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300); // 300ms matches CSS duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  const { month, date: dayDate } = getMonthDay(event.date);
  const imageUrl = getImageUrl(event.media?.mediaUrl);
  const interested = event.analytics?.likes || 0;

  const isFavorite = useFavoriteStore((state) => state.favorites.includes(event));


  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans relative flex flex-col h-full w-full max-w-sm mx-auto">
    
      <Link href={`/events/${event._id}`} className="flex flex-col h-full text-inherit no-underline">
        {/* Image Header Section - Responsive Height */}
        <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-gray-100">
          {/* Replaced Next.js Image with standard img tag */}
          <Image
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
          />

          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-[#811b49] text-white bg-opacity-90`}
          >
            {event.type}
          </span>
          <div className="absolute flex gap-1 bottom-3 left-3">

          {event.category.length > 0 && event.category.map((category) => (
            <span key={category._id} className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded-sm ${getCategoryColor(category.name)} text-white bg-opacity-90`}>
              {category.name}
            </span>
          ))}
          </div>
           
        </div>

        {/* Content Section - Responsive Padding */}
        <div className="p-3 sm:p-4 relative flex gap-3 sm:gap-4 flex-1">
          {/* Date Block (Left side) - Responsive Text */}
          <div className="flex flex-col items-center text-blue-700 shrink-0 min-w-[3rem]">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
              {month}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold leading-none mt-1">
              {dayDate}
            </span>
          </div>

          {/* Details Block (Right side) - Flex Grow to fill space */}
          <div className="flex flex-col gap-1 grow font-medium min-w-0 pr-3">
            {/* Title - Responsive Text & Auto Height */}
            <h3 className="text-base sm:text-lg leading-tight font-bold text-gray-900 line-clamp-2 min-h-[2.5rem]">
              {event.title}
            </h3>
            
            <p className="text-sm text-gray-500 truncate w-full">
              {event.organizer.firstName + " " + event.organizer.lastName}
            </p>
            <div className="flex justify-between gap-1 items-center">
            <p className="text-xs text-gray-400 mb-3 truncate">
              {formatTime(event.time)}
            </p>
            <p className="text-xs text-gray-400 mb-3 truncate">
              {`${event.location?.city === "Alexandria" ? "Alex" : event.location?.city}/${event.location?.district}`}
            </p>
            </div>

           
            <div className={`flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100 w-full `}>
              {/* Price Section */}
              <div
                className={`flex items-center gap-1 text-xs sm:text-sm ${
                  event.ticketType.price === 0 
                    ? "text-green-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <FiTag
                  size={14}
                  className={
                    event.ticketType.price === 0 
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {event.ticketType.price === 0 ? "Free" : event.ticketType.price + " EGP"}
                </span>
              </div>

              {/* Interest Section */}
              {event.analytics.likes > 0 ? (
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-semibold ml-2">
                  <FiStar size={12} className="text-blue-600 fill-blue-600 shrink-0 sm:w-[14px] sm:h-[14px]" />
                  <span className="whitespace-nowrap">{interested} interested</span>
                </div>
              ) : <span></span>}
            </div>
          </div>
        </div>
      </Link>

    
         <button
        type="button"
        onClick={handleAddFavorites}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all duration-300 z-20 cursor-pointer 
          ${isFavorite 
            ? "bg-red-50 text-yellow-500 hover:bg-yellow-100" 
            : "bg-white/90 text-gray-400 hover:text-yellow-500 hover:bg-white"
          }
          ${isAnimating ? "scale-125 shadow-md ring-2 ring-yellow-100" : "hover:scale-110 active:scale-95"}
        `}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FiStar 
          size={18} 
          fill={isFavorite ? "currentColor" : "none"} 
          className={`transition-transform duration-300 ${isAnimating ? "scale-110" : ""}`}
        />
      </button>
    </div>
  );

};
export default EventCard;
