"use client";
import { useEffect, useState } from "react";

import PaginationList from "./PaginationList";

import filterEvents from "@/components/Custom/filterPopularEvents";
import { EventObject } from "@/types/PaginationInterface";
// import useGeolocation from "@/hooks/useGeolocation";

// 3. The Main Container Component
const OnlineEvents = () => {
  // const filters = ["All", "Today", "Tomorrow", "This Weekend"];

  const [events, setEvents] = useState<EventObject[]>([]);
  // const [currentFilter, setCurrentFilter] = useState<string>("All");

  // const filteredEvents = filterEvents(events, currentFilter);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  return (
    <section className="py-16 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 font-sans">
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
