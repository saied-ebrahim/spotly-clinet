import { EgyptTopEventInterace } from "@/types/EgyptTopEventInterface";
import Image from "next/image";
import Link from "next/link";

export default function EgyptTopEventCard({
  event,
}: {
  event: EgyptTopEventInterace;
}) {
  return (
    <Link href={`/events/${event.id}`}>
      <div
        className={`mb-10 bg-linear-to-r ${event.colorSchemeDark} p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8`}
      >
        {/* Image Section */}
        <div className="relative lg:w-1/3 w-full h-48 lg:h-64">
          <Image
            src={event.image} // Connected to mock data
            alt={event.title} // Connected for better SEO/Accessibility
            fill
            className="rounded-lg w-full object-cover shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-2/3 text-white">
          <span className="inline-block bg-yellow-300 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase">
            {event.category}
          </span>

          <h3 className="text-3xl font-extrabold mb-3">{event.title}</h3>

          <p className="mb-4 text-emerald-100">{event.description}</p>

          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center font-medium">
              <i data-lucide="calendar" className="w-4 h-4 mr-1"></i>
              {event.date}
            </span>

            <span className="flex items-center font-medium">
              <i data-lucide="users" className="w-4 h-4 mr-1"></i>
              {/* Connected to mock data with a fallback just in case */}
              {event.registeredCount || "10k+"} Registered
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
