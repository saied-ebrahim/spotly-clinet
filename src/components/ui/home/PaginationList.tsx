import React, { useState } from "react";

import EventCard from "./EventCard";
import { it } from "node:test";

// 1. Mock Data Generator

// const allEvents = generateEvents(24); // Generating 24 items for 4 pages of 6

const PaginatedEvents = ({ itemsPerPage, allEvents }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  console.log(allEvents.length);
  console.log(itemsPerPage);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
        <p className="text-gray-500 mt-2">
          Browse through our latest events and workshops.
        </p>
      </div>

      <div
        key={currentPage}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-in"
      >
        {currentItems.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Pagination Controls */}
      {allEvents.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={allEvents.length}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}

      {/* Custom Styles for Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
export default PaginatedEvents;
// 3. Pagination Component
const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
        {/* <ChevronLeft className="w-5 h-5" /> */} Prev
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
