

"use client";
import { useEffect, useRef, useState } from "react";

import PaginationList from "./PaginationList";

import filterEvents from "@/utils/home/filterPopularEvents";

import useGeolocation from "@/hooks/useGeolocation";
import { EventDocument } from "@/types/eventInterface";
import { useCityMatcher } from "@/utils/home/useCityMatcher";

// 3. The Main Container Component
const PopularEvents = ({events}: {events: EventDocument[]}) => {
  console.log(events);
  const filters = ["All", "Today", "Tomorrow", "This Week", "Free"];
  const ref = useRef<HTMLDivElement>(null);
  const {
    location: { city },
  } = useGeolocation();

const smoothScroll = () => {
  console.log("smoothScroll");
  if (ref.current) {
    ref.current.scrollIntoView({ 
      behavior: "smooth",
      block: "start" 
    });
  }
};
const [matchedCity, setMatchedCity] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("All");

  const filtered = filterEvents(events, currentFilter);
  const filteredEvents = filtered.filter((e) => e.type !== "online" && e.location.district === matchedCity);
const { findClosestMatch } = useCityMatcher();
  

  useEffect(() => {
    if (city) {
      const match = findClosestMatch(city);
      if (match) {
        setMatchedCity(match);
      }
    }
  }, [city, findClosestMatch]); 

  return (
    <section ref={ref} className="py-16 pb-0 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Popular Events in {matchedCity ||  "Your Location"}
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setCurrentFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
                filter === currentFilter
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mb-8 text-center sm:text-left">
          <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
          <p className="text-gray-500 mt-2">
            Browse through our latest events and workshops.
          </p>
        </div>
        {
          filteredEvents.length > 0 ? (
            <PaginationList
              itemsPerPage={6}
              allEvents={filteredEvents}
              smoothScroll={smoothScroll}
            /> // this is a COMMON COMPONENT for pagination
          ) : (
            <h1 className="text-center w-full text-xl">No Events Found</h1>
          )
        }
      </div>
    </section>
  );
};

export default PopularEvents;

