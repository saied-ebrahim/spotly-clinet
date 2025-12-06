import { EgyptTopEventInterace } from "@/types/EgyptTopEventInterface";
import { getMonthDay } from "@/utils/details/formatting";

import { getImageUrl } from "@/utils/general";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiUsers } from "react-icons/fi";
const COLORS = [
  "bg-gradient-to-r from-gray-900 via-zinc-800 to-gray-800",
  "bg-gradient-to-r from-slate-900 to-indigo-900",
  "bg-gradient-to-r from-rose-900 to-pink-800",
  "bg-gradient-to-r from-emerald-900 to-teal-800",
  "bg-gradient-to-r from-amber-900 to-orange-800",
  "bg-gradient-to-r from-sky-900 to-indigo-800",
];
export default function EgyptTopEventCard({
  event,
}: {
  event: EgyptTopEventInterace;
  // event: EventDocument;
}) {
  // derive display values that are compatible with older mock data and the EventObject shape
  const categoryText = Array.isArray(event.category)
    ? event.category[0]
    : (event.category as unknown as string) || "";

  const legacy = event as unknown as {
    image?: string;
    registeredCount?: string;
  };
  const { month, date: dayDate } = getMonthDay(event.date);

  const imageUrl = getImageUrl(event.media?.mediaUrl || legacy.image);
  // local formatter to match EgyptTopEvents formatting (e.g. 1200 -> 1.2k+)
  const formatCountLocal = (value?: number | string) => {
    if (value == null) return "0";
    const n =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
    if (n >= 1000000) {
      const v = n / 1000000;
      return `${(Math.round(v * 10) / 10).toString()}M+`;
    }
    if (n >= 1000) {
      const v = n / 1000;
      return `${(Math.round(v * 10) / 10).toString()}k+`;
    }
    return String(n);
  };

  const registered =
    legacy.registeredCount ??
    (event.analytics?.ticketsSold
      ? formatCountLocal(event.analytics.ticketsSold)
      : "0");

  // color: prefer explicit colorSchemeDark, otherwise pick from COLORS by id
  const colorClass = event.colorSchemeDark
    ? event.colorSchemeDark
    : (() => {
        const idStr = String(event._id ?? "");
        let hash = 0;
        for (let i = 0; i < idStr.length; i++)
          hash = (hash * 31 + idStr.charCodeAt(i)) | 0;
        const idx = Math.abs(hash) % COLORS.length;
        return COLORS[idx];
      })();

  return (
    <Link href={`/events/${event._id}`}>
      <div
        className={`mb-10 bg-linear-to-r ${colorClass} p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 px-4 sm:px-6 lg:px-8`}
      >
        {/* Image Section */}
        <div className="relative lg:w-1/3 w-full h-48 lg:h-64">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="rounded-lg w-full object-cover shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-2/3 text-white">
        <div className="flex flex-wrap gap-2">
        {event.category.map((category) => (
          <span key={category._id} className="inline-block bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase">
            {category.name}
          </span>
        ))}</div>

          <h3 className="text-3xl font-extrabold mb-3">{event.title}</h3>

          <p className="mb-4 text-emerald-100 line-clamp-2">{event.description}</p>

          <div className="flex text-left items-center space-x-6 text-sm">
            <span className="flex gap-2 items-center font-medium">
              <FiCalendar />
              <span>{`${month} ${dayDate}`}</span>
            </span>

            <span className="flex gap-2 items-center font-medium">
              <FiUsers />
              <span>{registered}{event.analytics.ticketsSold > 1000 ? "+" : ""} Registered</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
