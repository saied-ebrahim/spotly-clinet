import Image from "next/image";
import { FiHeart, FiStar, FiTag } from "react-icons/fi";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans cursor-pointer group">
      {/* Image Header Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* <Image src={event.imageUrl} alt={event.title} fill /> */}

        <span
          className={`absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm ${event.categoryColor}`}
        >
          {event.category}
        </span>
        {/* Favorite Icon overlay */}
        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:text-red-500 transition-colors">
          <FiHeart size={18} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex gap-4">
        {/* Date Block (Left side) */}
        <div className="flex flex-col items-center text-blue-700 shrink-0">
          <span className="text-sm font-bold uppercase tracking-wide">
            {event.month}
          </span>
          <span className="text-2xl font-extrabold leading-none mt-1">
            {event.date}
          </span>
        </div>

        {/* Details Block (Right side) */}
        <div className="flex flex-col gap-1 grow font-medium">
          <h3 className="text-lg leading-tight font-bold text-gray-900 line-clamp-2 h-[45px]">
            {event.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{event.organizer}</p>
          <p className="text-xs text-gray-400 mb-3">{event.time}</p>

          {/* Price and Interest Footer */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-gray-100">
            {/* Price Section */}
            <div
              className={`flex items-center gap-1 text-sm ${
                event.isFree ? "text-green-600 font-bold" : "text-gray-700"
              }`}
            >
              <FiTag
                size={14}
                className={event.isFree ? "text-green-600" : "text-gray-400"}
              />
              <span>{event.price}</span>
            </div>

            {/* Interest Section - Only show if interested count > 0 */}
            {event.interested > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                <FiStar size={14} className="text-blue-600 fill-blue-600" />
                <span>{event.interested} interested</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
