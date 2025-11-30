"use client";
import { useEffect, useRef, useState } from "react";
import { CategoryItem } from "./CategoryItem";

// Main Slider Component
const Categories = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        const arr = data.slice(0, 7);
        console.log(arr);
        setEvents(arr);
      });
  }, []);
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

  console.log(events);
  return (
    <section className="md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full py-12 sm:pb-0">
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
              className="flex overflow-x-auto pb-8 gap-5 md:gap-6 xl:gap-[25px] snap-x snap-mandatory scroll-smooth no-scrollbar p-3"
            >
              {events.map((category, index) => (
                <CategoryItem key={index} category={category} />
              ))}
              {/* {categories.map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))} */}
            </div>
          </div>
        </div>

        {/* CSS to hide scrollbar */}
        {/* <style jsx global>{`
       
      `}</style> */}
      </div>{" "}
    </section>
  );
};

export default Categories;
