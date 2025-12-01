"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaRegStar,
  FaShareAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaPlus,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

// --- Mock Data Types ---
interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  description: string;
  tags: string[];
  host: {
    name: string;
    avatar: string;
  };
}

// --- Mock Data ---
const eventData: EventData = {
  title: "Sound Of Christmas 2023",
  date: "Saturday, 2 December 2023",
  time: "6:30 PM - 9:30 PM",
  location: "Bal Gandharva Rang Mandir",
  address:
    "Junction Of 24th & 32nd Road & Patwardhan Park, Off Linking Road, Bandra West, Mumbai, India",
  price: 200,
  description:
    "Get ready to kick off the Christmas season in Mumbai with SOUND OF CHRISTMAS - your favourite LIVE Christmas concert! City Youth Movement invites you to the 4th edition of our annual Christmas festivities. Bring your family and friends and sing along to your favourite carols.",
  tags: [
    "Holiday Concert",
    "Live Performance",
    "Seasonal Event",
    "Family-Friendly",
    "#Christmas_Spirit",
  ],
  host: {
    name: "City Youth Movement",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100", // Placeholder avatar
  },
};

const relatedEvents = [
  {
    id: 1,
    title: "Lakeside Camping at Pawna",
    date: "Nov 25 - 26",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600",
    category: "Travel & Adventure",
  },
  {
    id: 2,
    title: "Project Earth Exhibition",
    date: "Dec 16",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600",
    category: "Cultural & Arts",
  },
  {
    id: 3,
    title: "Royal College of Art Meet",
    date: "Dec 02",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1544928147-79a77456a1d3?auto=format&fit=crop&q=80&w=600",
    category: "Educational",
  },
];

export default function EventDetailsPage() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-yellow-200">
      {/* --- Top Navigation --- */}
      <nav className="p-4 flex items-center max-w-7xl mx-auto">
        <Link
          href="#"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <FaArrowLeft className="text-gray-600" />
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* --- Hero Image --- */}
        <div className="relative w-full h-48 md:h-[400px] rounded-2xl overflow-hidden shadow-sm group">
          <Image
            src="https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&fit=crop&q=80&w=1600" // Christmas concert placeholder
            alt="Event Banner"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>

          <div className="absolute bottom-6 left-6 text-white md:hidden">
            <h1 className="text-2xl font-bold">{eventData.title}</h1>
          </div>
        </div>

        {/* --- Title Section (Desktop) --- */}
        <div className="flex justify-between items-start mt-8 mb-6">
          <h1 className="hidden md:block text-3xl lg:text-4xl font-extrabold text-gray-900">
            {eventData.title}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 border border-gray-200"
            >
              <FaRegStar
                className={`w-5 h-5 ${
                  isLiked ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
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
                  <span className="font-medium">{eventData.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaRegClock className="text-gray-400 w-5 h-5" />
                  <span className="font-medium">{eventData.time}</span>
                </div>
                <button className="text-blue-600 text-sm font-semibold hover:underline ml-8 flex items-center gap-1">
                  <FaPlus className="w-3 h-3" /> Add to Calendar
                </button>
              </div>
            </section>

            {/* Location */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
              <div className="flex gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-bold">{eventData.location}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    {eventData.address}
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mt-4 border border-gray-200 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" // Map lookalike
                  alt="Map View"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold text-gray-800 group-hover:scale-105 transition-transform">
                    View on Map
                  </div>
                </div>
              </div>
            </section>

            {/* Host Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Hosted by</h2>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={eventData.host.avatar}
                      alt={eventData.host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-900">
                    {eventData.host.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors">
                    Contact
                  </button>
                  <button className="px-4 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    + Follow
                  </button>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Event Description
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                <p>{eventData.description}</p>
                <p className="mt-4 italic text-sm text-gray-500">
                  &quot;City Youth Movement invites you to the 4th edition of
                  our annual Christmas festivities...&quot;
                </p>

                <h3 className="font-bold text-gray-900 mt-6 mb-2">
                  3 Reasons to attend the event:
                </h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>The FIRST Christmas concert of Mumbai!</li>
                  <li>A special Christmas Choir!</li>
                  <li>Special Dance performances and many more surprises!</li>
                </ol>
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {eventData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Ticket Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Ticket Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Ticket Information
                  </h3>
                  <div className="flex items-center gap-3 text-gray-700 mb-2">
                    <FaTicketAlt className="text-gray-400 rotate-90" />
                    <span className="font-medium text-sm">
                      Standard Ticket: ₹ {eventData.price} each
                    </span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex justify-center items-center gap-2">
                  <FaTicketAlt className="-rotate-45" />
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <hr className="my-16 border-gray-200" />

        {/* --- Other Events Section --- */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Other events you may like
            </h2>
            <div className="flex gap-2">
              <button className="p-2 border rounded-full hover:bg-gray-50">
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-50">
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedEvents.map((event) => (
              <div key={event.id} className="group cursor-pointer">
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-3">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                    {event.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full">
                    <FaRegStar className="w-3 h-3 text-white fill-transparent hover:fill-yellow-400" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-start pt-1 text-blue-600 font-bold leading-tight w-12 shrink-0">
                    <span className="text-xs uppercase">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-lg">
                      {event.date.split(" ")[1] || "01"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.price === 0 ? "FREE" : `EGP ${event.price}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
