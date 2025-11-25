"use client";
import React, { useRef } from "react";
import { CategoryItem } from "./CategoryItem";

// 1. Mock Data
const categories = [
  {
    name: "Entertainment",
    imageUrl: "https://placehold.co/150x150/1F2937/ffffff?text=Music",
    color: "hover:text-indigo-600",
    ringColor: "hover:ring-indigo-500",
  },
  {
    name: "Educational",
    imageUrl: "https://placehold.co/150x150/4B5563/ffffff?text=Edu",
    color: "hover:text-gray-600",
    ringColor: "hover:ring-gray-500",
  },
  {
    name: "Cultural & Arts",
    imageUrl: "https://placehold.co/150x150/EF4444/ffffff?text=Art",
    color: "hover:text-red-600",
    ringColor: "hover:ring-red-500",
  },
  {
    name: "Sports",
    imageUrl: "https://placehold.co/150x150/10B981/ffffff?text=Sport",
    color: "hover:text-green-600",
    ringColor: "hover:ring-green-500",
  },
  {
    name: "Technology",
    imageUrl: "https://placehold.co/150x150/3B82F6/ffffff?text=Tech",
    color: "hover:text-blue-600",
    ringColor: "hover:ring-blue-500",
  },
  {
    name: "Travel",
    imageUrl: "https://placehold.co/150x150/F59E0B/ffffff?text=Travel",
    color: "hover:text-yellow-600",
    ringColor: "hover:ring-yellow-500",
  },
  {
    name: "Dining",
    imageUrl: "https://placehold.co/150x150/EC4899/ffffff?text=Food",
    color: "hover:text-pink-600",
    ringColor: "hover:ring-pink-500",
  },
];

// 3. Main Slider Component
const Categories = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      // Scroll by roughly one screen width
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: -width / 2, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: width / 2, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto p-3">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Explore Categories
          </h2>

          <div className="hidden sm:flex xl:hidden gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Previous categories"
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
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Next categories"
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

        {/* Slider Container Wrapper */}
        <div className="relative group">
          <div
            ref={sliderRef}
            // Gap logic:
            // - gap-4 (16px) on mobile
            // - gap-6 (24px) on md+
            className="flex overflow-x-auto pb-8 gap-4 md:gap-6 snap-x snap-mandatory scroll-smooth no-scrollbar p-3"
          >
            {categories.map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Categories;
