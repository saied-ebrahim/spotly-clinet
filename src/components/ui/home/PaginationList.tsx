"use client";
import React, { useState } from "react";
import EventCard from "./EventCard";
import {
  PaginationProps,
  PaginationEventsProps,
} from "@/types/PaginationInterface";



// 1. Mock Data Generator
const Pagination = ({
  itemsPerPage,
  allEvents,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPages: number = Math.ceil(allEvents.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => prevPage(currentPage === 1)}
        // disabled={currentPage === 1}
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
          // <button
          //   key={number}
          //   onClick={() => paginate(number)}
           
          // >
          //   {number}
          // </button>
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
        onClick={() => nextPage(currentPage === totalPages)}
        // disabled={currentPage === totalPages} 
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

const PaginatedEvents = ({
  itemsPerPage,
  allEvents,
  smoothScroll,
}: PaginationEventsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    smoothScroll();
  };
  const nextPage = (noScroll?: boolean) =>{

    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    if (!noScroll) smoothScroll();
  }

  const prevPage = (noScroll?: boolean) => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    if (!noScroll) smoothScroll();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div
        key={currentPage}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-in"
      >
        {currentItems.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Pagination Controls */}
      {allEvents.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          allEvents={allEvents}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};
export default PaginatedEvents;
// 3. Pagination Component
