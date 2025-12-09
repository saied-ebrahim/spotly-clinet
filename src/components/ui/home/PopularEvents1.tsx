"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

import PaginationList from "./PaginationList1";

import filterEvents from "@/utils/home/filterPopularEvents";

import useGeolocation from "@/hooks/useGeolocation";
import { EventDocument } from "@/types/eventInterface";
import { useCityMatcher } from "@/utils/home/useCityMatcher";
import { useGetGovArEn } from "@/hooks/useGetGovArEn";
import { PaginationProps } from "@/types/PaginationInterface";
//------------------------
const Pagination = ({
  totalPages,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
          currentPage === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === number
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Mobile Page Indicator (Visible only on small screens) */}
      <span className="sm:hidden text-sm text-gray-600 font-medium px-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
        }`}
      >
        Next
      </button>
    </nav>
  );
};
//------------------------
// 3. The Main Container Component
const PopularEvents = () => {
  const filters = ["All", "Today", "Tomorrow", "This Week", "Hybrid", "Free"];
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [eventsInOnePage, setEventsInOnePage] = useState<EventDocument[]>([]); // state for events in one page
  const {
    location: { city }, // this is the city of the user
  } = useGeolocation();
  const [currentPage, setCurrentPage] = useState(1); // current page number
  let itemsPerPage = 6; // items per page

  const closestCity = useCityMatcher().findClosestMatch(city as string); // convert the district to the correct spelling

  // let eventsInOnePageInCurrentLocation = eventsInOnePage.filter((e) => e.location.district === closestCity);
  
  let eventsInOnePageInCurrentLocation = eventsInOnePage;
  const filteredEventsOffline = filterEvents(eventsInOnePageInCurrentLocation, currentFilter).filter((e) => e.type !== "online"); // filter events based on filter
  console.log("eventsInOnePageInCurrentLocation",eventsInOnePageInCurrentLocation);
  console.log("filteredEventsOffline",filteredEventsOffline);

  useEffect(() => {
    axiosInstance
      .get(`/events?limit=6&page=${currentPage}`)
      .then((res) => {
        console.log("\n----------\n");
        console.log(currentPage);
        console.log(res.data.data.events);
        console.log("\n----------\n");
        setEventsInOnePage(res.data.data.events);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);
  return (
    <section className="py-16 pb-0 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Popular Events in {closestCity || "Your Location"}
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
          <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
          <p className="text-gray-500 mt-2">
            Browse through our latest events and workshops.
          </p>
        </div>
        {filteredEventsOffline?.length > 0 ? (
          <PaginationList itemsPerPage={itemsPerPage} events={filteredEventsOffline} >
            <Pagination
              totalPages={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationList> // this is a COMMON COMPONENT for pagination
        ) : (
          <h1 className="text-center w-full text-xl">No Events Found</h1>
        )}
      </div>
    </section>
  );
};

export default PopularEvents;
