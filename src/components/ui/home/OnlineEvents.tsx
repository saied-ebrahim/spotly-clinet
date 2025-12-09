"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

import PaginationList from "./PaginationList1";

import { EventDocument } from "@/types/eventInterface";

const OnlineEvents = () => {
  const [events, setEvents] = useState<EventDocument[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/events")
      .then((res) => {
        const events = res.data.data.events;
        const onlineEvents = events.filter(
          (e: EventDocument) => e.type === "online"
        );
        setEvents(onlineEvents);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className="py-16 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Discover Best of Online Events
        </h2>

        {events.length > 0 ? (
          <PaginationList itemsPerPage={6} allEvents={events} />
        ) : (
          <h1 className="text-center w-full text-xl">No Events Found</h1>
        )}
      </div>
    </section>
  );
};

export default OnlineEvents;
