// import Image from "next/image";

// // Mock data based on the image provided
// const categories = [
//   {
//     name: "Entertainment",
//     imageUrl: "https://placehold.co/150x150/1F2937/ffffff?text=Music",
//     color: "text-indigo-600",
//   },
//   {
//     name: "Educational & Business",
//     imageUrl: "https://placehold.co/150x150/4B5563/ffffff?text=Crowd",
//     color: "text-gray-600",
//   },
//   {
//     name: "Cultural & Arts",
//     imageUrl: "https://placehold.co/150x150/EF4444/ffffff?text=Colors",
//     color: "text-red-600",
//   },
//   {
//     name: "Sports & Fitness",
//     imageUrl: "https://placehold.co/150x150/10B981/ffffff?text=Stadium",
//     color: "text-green-600",
//   },
//   {
//     name: "Technology & Innovation",
//     imageUrl: "https://placehold.co/150x150/3B82F6/ffffff?text=Tech",
//     color: "text-blue-600",
//   },
//   {
//     name: "Travel & Adventure",
//     imageUrl: "https://placehold.co/150x150/F59E0B/ffffff?text=Tent",
//     color: "text-yellow-600",
//   },
// ];

// // Main App component for full file generation

// const Categories = () => {
//   return (
//     <section className="max-w-7xl mx-auto py-12">
//       <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 px-4 sm:px-0">
//         Explore Categories
//       </h2>

//       {/* Category Carousel Container */}
//       {/* Enables horizontal scrolling and hides scrollbar on smaller screens */}
//       <div className="flex justify-evenly overflow-x-auto space-x-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar pt-4">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center group cursor-pointer w-[120px] sm:w-[150px] flex-shrink-0 transition transform hover:scale-105 duration-300"
//             role="button"
//             tabIndex="0"
//           >
//             {/* Image Circle */}
//             {/* <div className="w-full h-[120px] sm:h-[150px] rounded-full overflow-hidden shadow-xl ring-4 ring-white transition duration-300 group-hover:ring-indigo-500">
//               <Image
//                 src={category.imageUrl}
//                 alt={category.name}
//                 width={150}
//                 height={150}
//                 className="w-full h-full object-cover"
//                 // Placeholder fallback for potential image load errors
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://placehold.co/150x150/CCCCCC/000000?text=Category";
//                 }}
//               />
//             </div> */}
//             <div className="w-full h-[120px] sm:h-[150px] rounded-full overflow-hidden shadow-xl ring-4 ring-white transition duration-300 group-hover:ring-indigo-500 relative">
//               <Image
//                 // 2. Use the state variable here, not the direct prop
//                 src="/event.jpg"
//                 // src={category.imageUrl}
//                 alt={category.name}
//                 width={150}
//                 height={150}
//                 className="w-full h-full object-cover"
//                 // 3. Update state on error
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://placehold.co/150x150/CCCCCC/000000?text=Category";
//                 }}
//               />
//             </div>

//             {/* Category Name */}
//             <p
//               className={`mt-4 text-sm sm:text-base font-semibold text-center text-gray-700 transition duration-300 group-hover:${category.color} leading-snug`}
//             >
//               {category.name}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Custom styles to hide the scrollbar for aesthetics */}
//       <style jsx="true">{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// };
// export default Categories;
"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

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

// 2. Individual Category Item Component
const CategoryItem = ({ category }) => {
  // const [imgSrc, setImgSrc] = useState(category.imageUrl);

  return (
    // Updated Width Classes:
    // Mobile: w-[calc(50%-8px)] -> Fits 2 items with gap-4 (16px/2 = 8px)
    // Tablet (md): w-[calc(25%-18px)] -> Fits 4 items with gap-6 (3*24px/4 = 18px)
    // Widescreen (xl): w-[calc(14.28%-21px)] -> Fits 7 items with gap-6 (6*24px/7 = ~20.5px)
    <div
      className="group flex flex-col items-center cursor-pointer snap-start shrink-0 
                    w-[calc(50%-8px)] 
                    md:w-[calc(25%-18px)] 
                    xl:w-[calc(14.28%-21px)]"
    >
      {/* Circle Container - Responsive sizing */}
      <div
        className={`relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden shadow-lg border-4 border-white transition-all duration-300 transform hover:scale-110 ${category.ringColor} ring-2 ring-transparent`}
      >
        {/* <img
          src={imgSrc}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={() => {
            setImgSrc("https://placehold.co/150x150/CCCCCC/000000?text=Error");
          }}
        /> */}
        <Image
          // src={category.imageUrl}
          src="/event.jpg"
          alt={category.name}
          fill
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/150x150/CCCCCC/000000?text=Category";
          }}
        />
      </div>

      {/* Label */}
      <span
        className={`mt-4 text-sm sm:text-base font-bold text-gray-700 transition-colors duration-300 ${category.color} text-center px-1 truncate w-full`}
      >
        {category.name}
      </span>
    </div>
  );
};

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
