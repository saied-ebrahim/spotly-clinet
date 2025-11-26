import React from "react";
import { EventSearchSection } from "@/components/Dashboard/Events/EventSearchSection";
import { EventFilters } from "@/components/Dashboard/Events/EventFilters";
import { EventCard } from "@/components/Dashboard/Events/EventCard";
import dummyEvents from "@/data/dummyEvents.json";
import { FiChevronDown } from "react-icons/fi";

const EventsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <EventSearchSection />

      <div className="flex flex-col lg:flex-row mt-12 gap-8">
        {/* Sidebar Filters */}
        <EventFilters />

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Events</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-900 border border-slate-300 rounded px-3 py-1.5 bg-white">
                Relevance <FiChevronDown />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
