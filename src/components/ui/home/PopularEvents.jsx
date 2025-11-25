import React, { useState } from "react";
// import { FiHeart, FiTag, FiStar } from "react-icons/fi";
import EventCard from "./EventCard";

// 1. Mock Data based on the image
// In a real app, this would come from an API.
const eventsData = [
  {
    id: 1,
    title: "Lakeside Camping at Pawna",
    organizer: "Adventure Geek - Explore the Unexplored",
    imageUrl:
      "https://images.unsplash.com/photo-1504280390367-361c6d9e38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Placeholder image
    category: "Travel & Adventure",
    month: "NOV",
    date: "25",
    time: "8:30 AM - 7:30 PM",
    price: "INR 1,400",
    interested: 14,
    categoryColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 2,
    title: "Sound Of Christmas 2023",
    organizer: "Bal Gandharva Rang Mandir, Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1576686853644-3373cb1fb70f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Cultural & Arts",
    month: "DEC",
    date: "02",
    time: "6:30 PM - 9:30 PM",
    price: "INR 499",
    interested: 16,
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "Meet the Royal College of Art in Mumbai 2023",
    organizer: "Sofitel Mumbai BKC, Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Educational & Business",
    month: "DEC",
    date: "02",
    time: "10 AM - 5 PM",
    price: "FREE",
    isFree: true,
    interested: 0,
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    title: "Global Engineering Education Expo 2023",
    organizer: "The St. Regis, Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Educational & Business",
    month: "DEC",
    date: "03",
    time: "10 AM - 2 PM",
    price: "FREE",
    isFree: true,
    interested: 48,
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 5,
    title: "Cricket Business Meetup",
    organizer: "Play The Turf, Malad, Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Sports & Fitness",
    month: "DEC",
    date: "08",
    time: "6:30 PM - 9:30 PM",
    price: "INR 399",
    interested: 0,
    categoryColor: "bg-lime-100 text-lime-800",
  },
  {
    id: 6,
    title: "Valentine's Day Sail on a Yacht in Mumbai",
    organizer: "Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1540339832862-46d3a6772a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Travel & Adventure",
    month: "FEB",
    date: "14",
    time: "7 AM - 8 PM",
    price: "INR 2,999",
    interested: 160,
    categoryColor: "bg-yellow-100 text-yellow-800",
  },
];

// 2. The Individual Event Card Component

// 3. The Main Container Component
const PopularEvents = () => {
  const filters = ["All", "Today", "Tomorrow", "This Weekend", "Free"];
  let [currentFilter, setCurrentFilter] = useState("All");
  console.log(currentFilter);
  let eventArr = [...eventsData];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 font-sans">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Popular Events in Mumbai
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
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900" // Inactive style
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-md hover:border-gray-900 hover:text-gray-900 transition-colors duration-300 tracking-wide uppercase text-sm">
          See More
        </button>
      </div>
    </div>
  );
};

export default PopularEvents;
