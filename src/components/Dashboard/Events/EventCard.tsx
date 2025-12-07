import { FiCalendar, FiTag, FiHeart } from "react-icons/fi";
import Image from "next/image";
import { EventDocument } from "@/types/eventInterface";
import { formatDate } from "@/utils/details/formatting";

interface EventCardProps {
  event: EventDocument;
}

import Link from "next/link";
// ... existing imports

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event._id}`}
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
          <div className="absolute bottom-2 left-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">
            {event.category[0].name}
          </div>
        )}

        {/* Favorite Button - Changed to div to prevent button inside link */}
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle favorite logic here if needed
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm z-10 transition-colors"
        >
          <FiHeart size={16} />
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
    </Link>
  );
}
