

"use client";
import { useEffect, useRef, useState } from "react";

import PaginationList from "./PaginationList";

import filterEvents from "@/utils/home/filterPopularEvents";

import useGeolocation from "@/hooks/useGeolocation";
import { EventDocument } from "@/types/eventInterface";
import { useCityMatcher } from "@/utils/home/useCityMatcher";
import { useTranslations } from "next-intl";

// 3. The Main Container Component
const PopularEvents = ({events}: {events: EventDocument[]}) => {
  const t = useTranslations("homePage.popularEvents");
  console.log(events);
  const filterKeys = ["all", "today", "tomorrow", "thisWeek", "free"];
  const filters = filterKeys.map(key => ({
    key,
    label: t(`filters.${key}`)
  }));
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
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const filterMap: Record<string, string> = {
    all: "All",
    today: "Today",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    free: "Free"
  };
  const filtered = filterEvents(events, filterMap[currentFilter] || "All");
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
console.log(findClosestMatch("Al-Sayyida Zeinab"));
  return (
    <section ref={ref} className="py-16 pb-0 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t("title", { location: matchedCity || t("yourLocation") })}
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setCurrentFilter(filter.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
                filter.key === currentFilter
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="mb-8 text-center sm:text-left">
          <h3 className="text-2xl font-bold text-gray-900">{t("upcomingEvents")}</h3>
          <p className="text-gray-500 mt-2">
            {t("upcomingDescription")}
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
            <h1 className="text-center w-full text-xl">{t("noEventsFound")}</h1>
          )
        }
      </div>
    </section>
  );
};

export default PopularEvents;

