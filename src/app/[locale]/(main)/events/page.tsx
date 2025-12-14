"use client";
import { useState } from "react";
import { EventSearchSection } from "@/components/Dashboard/Events/EventSearchSection";
import { EventFilters } from "@/components/Dashboard/Events/EventFilters";
import { EventCard } from "@/components/Dashboard/Events/EventCard";
import { DateSelectionModal } from "@/components/Dashboard/Events/DateSelectionModal";
import { FiChevronDown } from "react-icons/fi";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useEventStore from "@/store/useEventStore";

const EventsPage = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >(() => {
    // Initialize with category from URL
    const initialFilters: Record<string, string[]> = {};
    if (categoryFromUrl) {
      initialFilters.Category = [categoryFromUrl];
    }
    return initialFilters;
  });
  const { events, isLoading, fetchEvents } = useEventStore();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [customDate, setCustomDate] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (
    category: string,
    value: string,
    isChecked: boolean
  ) => {
    if (category === "Date" && value === "Pick a Date") {
      if (isChecked) {
        setIsDateModalOpen(true);
      } else {
        setCustomDate(null);
        setSelectedFilters((prev) => ({
          ...prev,
          [category]: (prev[category] || []).filter((item) => item !== value),
        }));
      }
      return;
    }

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

  const handleDateSelect = (date: string) => {
    setCustomDate(date);
    setSelectedFilters((prev) => ({
      ...prev,
      Date: [
        ...(prev.Date || []).filter((item) => item !== "Pick a Date"),
        "Pick a Date",
      ],
    }));
    setIsDateModalOpen(false);
  };

  const parseEventDate = (dateStr: string): Date | null => {
    // Expected format: "Oct 15, 2025"
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const checkPriceFilter = (
    eventPrice: string,
    selectedPrices: string[] | undefined
  ): boolean => {
    if (!selectedPrices || selectedPrices.length === 0) return true;
    const isFree = eventPrice.toLowerCase() === "free" || eventPrice === "0";
    const isPaid = !isFree;

    return selectedPrices.some((price) => {
      if (price === "Free") return isFree;
      if (price === "Paid") return isPaid;
      return false;
    });
  };

  const checkDateFilter = (
    eventDateStr: string,
    selectedDates: string[] | undefined
  ): boolean => {
    if (!selectedDates || selectedDates.length === 0) return true;
    const eventDate = parseEventDate(eventDateStr);
    if (!eventDate) return false;

    // Normalize event date to midnight for comparison
    const normalizedEventDate = new Date(eventDate);
    normalizedEventDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return selectedDates.some((filter) => {
      if (filter === "Today") {
        return normalizedEventDate.getTime() === today.getTime();
      }
      if (filter === "Tomorrow") {
        return normalizedEventDate.getTime() === tomorrow.getTime();
      }
      if (filter === "This Week") {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return normalizedEventDate >= today && normalizedEventDate <= nextWeek;
      }
      if (filter === "This Weekend") {
        const friday = new Date(today);
        friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));
        const sunday = new Date(friday);
        sunday.setDate(friday.getDate() + 2);
        return normalizedEventDate >= friday && normalizedEventDate <= sunday;
      }
      if (filter === "Pick a Date" && customDate) {
        const selected = new Date(customDate);
        selected.setHours(0, 0, 0, 0);
        return normalizedEventDate.getTime() === selected.getTime();
      }
      return false;
    });
  };

  // const getImageUrl = (url?: string) => {
  //   if (!url) return "";
  //   if (url.startsWith("http") || url.startsWith("/")) return url;
  //   return `https://${url}`;
  // };

  const filteredEvents = events.filter((event) => {
    // Search Filter
    const matchesSearch =
      !searchQuery ||
      (event.title &&
        event.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Price Filter
    const matchesPrice = checkPriceFilter(
      String(event.ticketType.price),
      selectedFilters["Price"]
    );

    // Date Filter
    const matchesDate = checkDateFilter(event.date, selectedFilters["Date"]);

    // Category/Other Filters
    const matchesOtherFilters = Object.entries(selectedFilters).every(
      ([category, values]) => {
        if (category === "Price" || category === "Date") return true; // Handled separately
        if (values.length === 0) return true;

        if (category === "Category") {
          // Check if event belongs to any of the selected categories
          const eventCategories = Array.isArray(event.category)
            ? event.category
            : [event.category];

          return values.some((selectedCat) =>
            eventCategories.some((cat) =>
              cat?.name?.toLowerCase().includes(selectedCat.toLowerCase())
            )
          );
        }

        if (category === "Tags") {
          // Check if event has any of the selected tags (by name)
          const eventTags = Array.isArray(event.tags)
            ? event.tags
            : [event.tags];

          return values.some((selectedTag) =>
            eventTags.some((tag) =>
              tag?.name?.toLowerCase().includes(selectedTag.toLowerCase())
            )
          );
        }

        return true;
      }
    );

    return matchesSearch && matchesPrice && matchesDate && matchesOtherFilters;
  });

  const handleReset = () => {
    setSelectedFilters({});
    setSearchQuery("");
    setCustomDate(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <EventSearchSection onSearchChange={setSearchQuery} />

      <div className="flex flex-col lg:flex-row mt-12 gap-8">
        {/* Sidebar Filters */}
        <EventFilters
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
          onReset={handleReset}
        />

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
            {isLoading ? (
              <div className="col-span-2 flex justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div
                      className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full animate-spin"
                      style={{ animationDuration: "1.5s" }}
                    ></div>
                  </div>
                  <p className="text-slate-600 font-medium">
                    Loading events...
                  </p>
                </div>
              </div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-500">
                No events found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      <DateSelectionModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onSelectDate={handleDateSelect}
      />
    </div>
  );
};

export default EventsPage;
