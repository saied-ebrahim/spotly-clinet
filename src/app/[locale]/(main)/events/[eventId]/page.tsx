"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  FaArrowLeft,
  FaRegCalendarAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { formatDate } from "@/utils/details/formatting";
import TicketSidebar from "@/components/ui/details/TicketSidebar";
import RecommendationList from "@/components/ui/details/RecommendationList";
import AddToCalendarButton from "@/components/ui/details/AddToCallender";
import { EventDocument } from "@/types/eventInterface";
import { getImageUrl } from "@/utils/general";

import EventMapWrapper from "@/components/ui/details/EventMapWrapper";
import axiosInstance from "@/lib/axios";
import FavoriteBtn from "@/components/ui/details/FavoriteBtn";
import OrganizerAvatar from "@/components/ui/details/OrganizerAvatar";
import CopyBtn from "@/components/ui/details/CopyBtn";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const t = useTranslations("eventDetails");
  const [myEvent, setMyEvent] = useState<EventDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${eventId}`);
        console.log(response.data);
        setMyEvent(response.data.data.event);
      } catch (error) {
        console.error(error);
        setMyEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const imageUrl = getImageUrl(myEvent?.media?.mediaUrl);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!myEvent) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-gray-500 bg-white">
        <h2 className="text-xl font-bold">{t("eventNotFound")}</h2>
        <Link href="/" className="text-blue-500 hover:underline">
          {t("goBackHome")}
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
           
            <FavoriteBtn event={myEvent} />
            {/* <button className="p-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 border border-gray-200">
              <FaCopy className="w-5 h-5 text-gray-600" />
            </button> */}
            <CopyBtn/>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Date & Time */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">{t("dateAndTime")}</h2>
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
              <h2 className="text-xl font-bold text-gray-900">{t("location")}</h2>
              {myEvent.type === "online" ? (
                <div className="flex gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold">{t("onlineEvent")}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1">
                      {t("onlineEventDescription")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 text-gray-700">
                    <FaMapMarkerAlt className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                    <div>
                      <p className="font-bold">
                        {myEvent.location.city +
                          ", " +
                          (myEvent.location.country || "Egypt")}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed mt-1">
                        {myEvent.location.district}
                      </p>
                    </div>
                  </div>

                  {/* --- MAP COMPONENT --- */}
                  <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mt-4 border border-gray-200 shadow-sm z-0">
                    <EventMapWrapper
                      lat={myEvent.location.latitude}
                      lng={myEvent.location.longitude}
                    />

                    <div className="absolute bottom-3 right-3 z-400">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${myEvent.location.latitude},${myEvent.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-gray-700 hover:text-blue-600 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        {t("openInGoogleMaps")}{" "}
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* Host Info */}
                      <OrganizerAvatar event={myEvent} />
            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t("eventDescription")}
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                <p>{myEvent.description}</p>
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">{t("tags")}</h2>
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
                  <span className="text-gray-400 text-sm">{t("noTags")}</span>
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
