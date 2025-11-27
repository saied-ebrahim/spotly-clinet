"use client";
import React from "react";
import { EventSearchSection } from "@/components/Dashboard/Events/EventSearchSection";
import { EventFilters } from "@/components/Dashboard/Events/EventFilters";
import { EventCard } from "@/components/Dashboard/Events/EventCard";
import dummyEvents from "@/data/eventsdata/dummyEvents.json";
import { FiChevronDown } from "react-icons/fi";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({});

  const handleFilterChange = (
    category: string,
    value: string,
    isChecked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const currentCategoryFilters = prev[category] || [];
      if (isChecked) {
        return {
          ...prev,
          [category]: [...currentCategoryFilters, value],
        };
      } else {
        return {
          ...prev,
          [category]: currentCategoryFilters.filter((item) => item !== value),
        };
      }
    });
  };

  const filteredEvents = dummyEvents.filter((event) => {
    // Search Filter
    // Safely access properties and handle missing description
    const matchesSearch =
      (event.title &&
        event.title.toLowerCase().includes(searchQuery.toLowerCase())) ;

    // Location Filter
    // Mapping 'location' filter to 'venue' property in data
    const matchesLocation =
      location === "" ||
      (event.venue &&
        event.venue.toLowerCase().includes(location.toLowerCase()));

    // Category/Other Filters
    const matchesFilters = Object.entries(selectedFilters).every(
      ([category, values]) => {
        if (values.length === 0) return true;

        // Map UI filter categories to Event properties
        let eventProperty;
        if (category === "Price") eventProperty = event.price;
        else if (category === "Category") eventProperty = event.category;
        // else if (category === "Format") eventProperty = event.format; // format not in dummy data
        // Date filtering is complex (Today, Tomorrow, etc.), skipping for now or implementing basic string match if event.date exists
        else return true; // Skip unknown filters for now

        if (!eventProperty) return true; // If event doesn't have this property, don't filter out (or do, depending on requirements)

        // Check if event property matches any of the selected values
        // Assuming eventProperty is a string. If it's an array (e.g. multiple categories), use includes.
        return values.some((val) =>
          eventProperty.toString().toLowerCase().includes(val.toLowerCase())
        );
      }
    );

    return matchesSearch && matchesLocation && matchesFilters;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <EventSearchSection
        onSearchChange={setSearchQuery}
        onLocationChange={setLocation}
      />

      <div className="flex flex-col lg:flex-row mt-12 gap-8">
        {/* Sidebar Filters */}
        <EventFilters onFilterChange={handleFilterChange} />

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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-500">
                No events found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
