import Image from "next/image";
import Link from "next/link";

import {
  FaArrowLeft,
  FaRegStar,
  FaShareAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import EventMap from "@/components/ui/details/EventMap";
import { formatDate } from "@/utils/details/formatting";
import TicketSidebar from "@/components/ui/details/TicketSidebar";
import RecommendationList from "@/components/ui/details/RecommendationList";
import AddToCalendarButton from "@/components/ui/details/AddToCallender";
import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { getImageUrl } from "@/utils/general";

// --- 1. Dynamic Import for Map (Disables SSR) ---
// const EventMap = dynamic(() => import("@/components/ui/details/EventMap"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 rounded-xl">
//       Loading Map...
//     </div>
//   ),
// });
// async function getEvents() {
//   const res = await fetch("http://localhost:8080/events");

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
 

  console.log(eventId);


  const myEvent :EventDocument= await axiosInstance
    .get(`/events/${eventId}`)
    .then((res) => res.data.data.event)
    .catch((err) => console.error(err));
 
  const imageUrl = getImageUrl(myEvent?.media?.mediaUrl);
  console.log(myEvent);

  // --- Helper Functions ---

  if (!myEvent) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-gray-500 bg-white">
        <h2 className="text-xl font-bold">Event not found</h2>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-yellow-200">
      {/* --- Top Navigation --- */}
      <nav className="p-4 flex items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <FaArrowLeft className="text-gray-600" />
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* --- Hero Image --- */}
        <div className="relative w-full h-48 md:h-[400px] rounded-2xl overflow-hidden shadow-sm group">
          <Image
            src={imageUrl}
            alt={myEvent.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 text-white md:hidden">
            <h1 className="text-2xl font-bold">{myEvent.title}</h1>
          </div>
        </div>

        {/* --- Title Section --- */}
        <div className="flex justify-between items-start mt-8 mb-6">
          <h1 className="hidden md:block text-3xl lg:text-4xl font-extrabold text-gray-900">
            {myEvent.title}
          </h1>
          <div className="flex gap-3">
            <button
              // onClick={() => setIsLiked(!isLiked)}
              className="p-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 border border-gray-200"
            >
              <FaRegStar
                className={`w-5 h-5 ${
                  ""
                  // isLiked ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                }`}
              />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 border border-gray-200">
              <FaShareAlt className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Date & Time */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Date and Time</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaRegCalendarAlt className="text-gray-400 w-5 h-5" />
                  <span className="font-medium">
                    {formatDate(myEvent.date)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaRegClock className="text-gray-400 w-5 h-5" />
                  <span className="font-medium">{myEvent.time}</span>
                </div>
                <AddToCalendarButton event={myEvent} />
              </div>
            </section>

            {/* Location & Map */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
              <div className="flex gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-bold">
                    {myEvent.location.city + ", " +( myEvent.location.country || "Egypt")}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    {myEvent.location.district}
                  </p>
                </div>
              </div>

              {/* --- MAP COMPONENT --- */}
              <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mt-4 border border-gray-200 shadow-sm z-0">
                <EventMap
                  lat={myEvent.location.latitude}
                  lng={myEvent.location.longitude}
                />

                {/* Optional 'Open in Google Maps' Floating Button */}
                <div className="absolute bottom-3 right-3 z-400">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${myEvent.location.latitude},${myEvent.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-gray-700 hover:text-blue-600 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Open in Google Maps{" "}
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* Host Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Hosted by</h2>
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
      
      {/* 1. Organizer Avatar & Name */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-gray-200 bg-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100"
            alt={`${myEvent.organizer.firstName} ${myEvent.organizer.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-bold text-gray-900 break-words">
          {`${myEvent.organizer.firstName} ${myEvent.organizer.lastName}`}
        </span>
      </div>

      {/* 2. Contact Info Section */}
      {/* Stacks vertically on mobile (flex-col), goes horizontal on tablet/desktop (sm:flex-row) */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        
        {/* Email Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors w-full sm:w-auto bg-transparent">
          <FaEnvelope className="text-gray-500 shrink-0" />
          <span className="truncate max-w-[200px] sm:max-w-xs">
            {myEvent.organizer?.user?.email  ||
              `${myEvent.organizer.firstName}-${myEvent.organizer.lastName}@spotly.com`}
          </span>
        </div>

        {/* Phone Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors w-full sm:w-auto bg-transparent">
          <FaPhone className="text-gray-500 shrink-0" />
          <span className="whitespace-nowrap">
            {myEvent.organizer?.user?.phone || "010 0000 0000"}
          </span>
        </div>

      </div>
    </div>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Event Description
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                <p>{myEvent.description}</p>
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {myEvent.tags && myEvent.tags.length > 0 ? (
                  myEvent.tags.map((tag: { name: string }) => (
                    <span
                      key={tag.name}
                      className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No tags</span>
                )}
              </div>
            </section>
          </div>

          {/* Right Column (Ticket Sidebar) */}
         
          <TicketSidebar event={myEvent} />
        </div>

        {/* --- Divider --- */}
        <hr className="my-16 border-gray-200" />

        {/* --- Related Events (Mock Data) --- */}
        <RecommendationList event={myEvent} />
      </main>
    </div>
  );
}
