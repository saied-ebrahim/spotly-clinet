"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic"; // Required for Leaflet
import { useParams } from "next/navigation";
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
  FaExternalLinkAlt,
} from "react-icons/fa";
import { EventObject } from "@/types/PaginationInterface";

// --- 1. Dynamic Import for Map (Disables SSR) ---
const EventMap = dynamic(() => import("@/components/ui/details/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 rounded-xl">
      Loading Map...
    </div>
  ),
});

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
  const { eventId } = useParams();
  const [myEvent, setMyEvent] = useState<EventObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        const myEvnt = data.find((e: EventObject) => String(e.id) === eventId);

        setMyEvent(myEvnt);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setLoading(false);
      });
  }, [eventId]);

  // --- Helper Functions ---
  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price?: number | string) => {
    if (price === 0 || price === "0") return "FREE";
    return `EGP ${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-white">
        Loading event details...
      </div>
    );
  }

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
            src={
              myEvent.media && myEvent.media.length > 0
                ? myEvent.media[0].mediaUrl
                : "https://via.placeholder.com/1200x400?text=No+Image"
            }
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
      </main>
    </div>
  );
}
