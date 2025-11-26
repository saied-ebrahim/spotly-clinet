"use client";
import { useEffect, useState } from "react";

import PaginationList from "./PaginationList";

import filterEvents from "@/components/Custom/filterPopularEvents";
import { EventObject } from "@/types/PaginationInterface";

// 3. The Main Container Component
const PopularEvents = ({ location }: { location?: string | null }) => {
  const filters = ["All", "Today", "Tomorrow", "This Weekend", "Free"];

  const [events, setEvents] = useState<EventObject[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");

  const filteredEvents = filterEvents(events, currentFilter);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 font-sans">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Popular Events in {location || "Your Location"}
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
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900" // Inactive style
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        <PaginationList itemsPerPage={6} allEvents={filteredEvents} />
      ) : (
        <h1 className="text-center w-full text-xl">No Events Found</h1>
      )}
    </div>
  );
};

export default PopularEvents;
