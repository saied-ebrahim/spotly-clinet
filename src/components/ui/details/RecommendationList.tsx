"use client";
import { useCallback, useEffect, useState } from "react";
import EventCard from "../home/EventCard";
import { EventObject } from "@/types/PaginationInterface";
import useFilter from "@/hooks/useFilter";

const RecommendationList = ({ event }: { event: EventObject }) => {
  // const [events, setEvents] = useState<EventObject[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  // Default to 3, will be updated by useEffect on mount
  const [eventsPerPage, setEventsPerPage] = useState(3);
  const filterEvents = useCallback(
    (e: EventObject) => {
      return e.organizer === event.organizer;
    },
    [event.organizer] // Only recreate this function if the organizer changes
  );
  const [items] = useFilter("http://localhost:8080/events", filterEvents);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // If Tablet (between 640px and 1024px), show 2 items
      if (width >= 640 && width < 1024) {
        setEventsPerPage(2);
      }
      // Otherwise (Mobile < 640px OR Desktop >= 1024px), show 3 items
      else {
        setEventsPerPage(3);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(items.length / eventsPerPage);

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const currentEvents = items.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );
  console.log(items);
  return (
    <section className="md:py-16 max-w-7xl mx-auto  sm:px-6 lg:px-8">
      <div className="w-full py-12 pt-0 sm:pb-0">
        <div className="max-w-7xl mx-auto p-0 md:p-3">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 sm:mb-0">
              Other events you may like
            </h2>

            {/* Navigation Buttons - Visible on all screens now so mobile can use them */}
            <div className="flex gap-2 w-full sm:w-[100px] sm:justify-start justify-end">
              <button
                onClick={scrollLeft}
                disabled={currentPage === 0}
                className={`p-2 rounded-full border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  ${
                    currentPage === 0
                      ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                disabled={currentPage >= totalPages - 1}
                className={`p-2 rounded-full border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  ${
                    currentPage >= totalPages - 1
                      ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid Container */}
          <div className="relative group">
            <div
              key={currentPage} // Keeps your slide animation working
              className="
                grid 
                gap-5 md:gap-6 xl:gap-[25px] 
                
                animate-slide-in
                
                /* Mobile: 1 Column (Column Shape) */
                grid-cols-1 
                
                /* Tablet (<1024px): 2 Columns */
                sm:grid-cols-2 
                
                /* Desktop (>=1024px): 3 Columns */
                lg:grid-cols-3
              "
            >
              {/* {currentEvents.map((event, index) => (
                // Use a stable key (like event.id) if possible, index is a fallback
                <EventCard key={event.id || index} event={event} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationList;
