"use client";
import { useEffect, useState } from "react";

import PaginationList from "./PaginationList";

// import filterEvents from "@/components/Custom/filterPopularEvents";
import filterEvents from "@/components/Custom/filterPopularEvents2";
import { EventObject } from "@/types/PaginationInterface";
import useGeolocation from "@/hooks/useGeolocation";

// 3. The Main Container Component
const PopularEvents = () => {
  const filters = ["All", "Today", "Tomorrow", "This Weekend", "Free"];
  const {
    location: { city },
  } = useGeolocation();
  const [events, setEvents] = useState<EventObject[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  console.log(events);
  const filteredEvents = filterEvents(events, currentFilter);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEvents(data);
      });
  }, []);
  return (
    <section className="py-16 pb-0 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Popular Events in {city || "Your Location"}
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setCurrentFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
                filter === currentFilter
                  ? "bg-gray-900 text-white border-gray-900" // Active style for "All"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-500 mt-2">
            Browse through our latest events and workshops.
          </p>
        </div>
        {filteredEvents.length > 0 ? (
          <PaginationList itemsPerPage={6} allEvents={filteredEvents} /> // this is a COMMON COMPONENT for pagination
        ) : (
          <h1 className="text-center w-full text-xl">No Events Found</h1>
        )}
      </div>
    </section>
  );
};

export default PopularEvents;
