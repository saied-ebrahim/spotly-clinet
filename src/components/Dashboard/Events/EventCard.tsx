import { FiCalendar, FiTag, FiHeart } from "react-icons/fi";
import Image from "next/image";

interface EventCardProps {
  event: {
    id: number | string;
    title: string;
    date: string;
    venue: string;
    time: string;
    price: string;
    category: string;
    image: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative w-full sm:w-48 h-48 bg-slate-200 shrink-0">
        {event.image ? (
          <Image
            src={event.image}
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
        <div className="absolute bottom-2 left-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">
          {event.category}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm">
          <FiHeart size={16} />
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
                {event.date} | {event.venue}
              </span>
            </div>
            <div className="text-sm text-slate-500">{event.time}</div>
          </div>
        </div>

        <div className="flex items-center text-brand-primary font-bold text-sm">
          <FiTag className="mr-1.5" />
          {event.price}
        </div>
      </div>
    </div>
  );
}
