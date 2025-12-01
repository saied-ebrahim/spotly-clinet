"use client";
import { useState } from "react";
import { EventSearchSection } from "@/components/Dashboard/Events/EventSearchSection";
import { EventFilters } from "@/components/Dashboard/Events/EventFilters";
import { EventCard } from "@/components/Dashboard/Events/EventCard";
import { DateSelectionModal } from "@/components/Dashboard/Events/DateSelectionModal";
import { FiChevronDown } from "react-icons/fi";
import axiosInstance from "@/lib/axios";
import { EventObject } from "@/types/PaginationInterface";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const EventsPage = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
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
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [customDate, setCustomDate] = useState<string | null>(null);
  const [events, setEvents] = useState<EventObject[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/events")
      .then((res) => {
        setEvents(res.data.data.events);
      })
      .catch((err) => console.error(err));
  }, []);

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
    const isFree = eventPrice.toLowerCase() === "free";
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return selectedDates.some((filter) => {
      if (filter === "Today") {
        return eventDate.getTime() === today.getTime();
      }
      if (filter === "Tomorrow") {
        return eventDate.getTime() === tomorrow.getTime();
      }
      if (filter === "This Week") {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= nextWeek;
      }
      if (filter === "This Weekend") {
        const friday = new Date(today);
        friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));
        const sunday = new Date(friday);
        sunday.setDate(friday.getDate() + 2);
        return eventDate >= friday && eventDate <= sunday;
      }
      if (filter === "Pick a Date" && customDate) {
        const selected = new Date(customDate);
        selected.setHours(0, 0, 0, 0);
        // Compare year, month, day to avoid time issues if eventDate has time (it shouldn't based on parsing)
        return (
          eventDate.getFullYear() === selected.getFullYear() &&
          eventDate.getMonth() === selected.getMonth() &&
          eventDate.getDate() === selected.getDate()
        );
      }
      return false;
    });
  };

  const getImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return `https://${url}`;
  };

  const filteredEvents = events.filter((event) => {
    // Search Filter
    const matchesSearch =
      !searchQuery ||
      (event.title &&
        event.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Location Filter
    const matchesLocation =
      location === "" ||
      (event.location?.city &&
        event.location.city.toLowerCase().includes(location.toLowerCase())) ||
      (event.location?.address &&
        event.location.address.toLowerCase().includes(location.toLowerCase()));

    // Price Filter
    const matchesPrice = checkPriceFilter(
      String(event.price),
      selectedFilters["Price"]
    );

    // Date Filter
    const matchesDate = checkDateFilter(event.date, selectedFilters["Date"]);

    // Category/Other Filters
    const matchesOtherFilters = Object.entries(selectedFilters).every(
      ([category, values]) => {
        if (category === "Price" || category === "Date") return true; // Handled separately
        if (values.length === 0) return true;

        let eventProperty;
        if (category === "Category") eventProperty = event.category;
        else return true;

        if (!eventProperty) return true;

        return values.some((val) =>
          eventProperty.toString().toLowerCase().includes(val.toLowerCase())
        );
      }
    );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice &&
      matchesDate &&
      matchesOtherFilters
    );
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <EventSearchSection
        onSearchChange={setSearchQuery}
        onLocationChange={setLocation}
      />

      <div className="flex flex-col lg:flex-row mt-12 gap-8">
        {/* Sidebar Filters */}
        <EventFilters
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={{
                    id: event._id,
                    title: event.title,
                    date: event.date,
                    venue:
                      event.location?.city || event.location?.address || "",
                    time: event.time,
                    price: String(event.price),
                    category: Array.isArray(event.category)
                      ? event.category[0]
                      : event.category,
                    image: getImageUrl(event.media?.[0]?.mediaUrl),
                  }}
                />
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
