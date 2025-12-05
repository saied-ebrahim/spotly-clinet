import Image from "next/image";
import { FiStar, FiTag } from "react-icons/fi";
import { EventObject } from "@/types/PaginationInterface";
import Link from "next/link";
import { getMonthDay } from "@/utils/details/formatting";
import { EventDocument } from "@/types/eventInterface";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { useEffect, useState } from "react";

// const EventCard = ({ event }: { event: EventObject }) => {
//   const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
//     // 1. Prevent the default button behavior
//     e.preventDefault();
//     // 2. STOP the event from bubbling up to the parent <Link>
//     e.stopPropagation();

//     console.log(`Added event ID ${event.id} to favorites!`);
//   };
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans relative group">
//       {/* 1. The Link wraps the content, but NOT the button */}
//       <Link href={`/events/${event.id}`} className="block h-full">
//         {/* Image Header Section */}
//         <div className="relative h-48 overflow-hidden">
//           <Image
//             src={event.imageUrl}
//             alt={event.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             fill
//           />

//           <span
//             className={`absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm ${event.categoryColor}`}
//           >
//             {event.category}
//           </span>
//         </div>

//         {/* Content Section */}
//         <div className="p-4 flex gap-4">
//           {/* Date Block (Left side) */}
//           <div className="flex flex-col items-center text-blue-700 shrink-0">
//             <span className="text-sm font-bold uppercase tracking-wide">
//               {event.month}
//             </span>
//             <span className="text-2xl font-extrabold leading-none mt-1">
//               {event.date}
//             </span>
//           </div>

//           {/* Details Block (Right side) */}
//           <div className="flex flex-col gap-1 grow font-medium">
//             <h3 className="text-lg leading-tight font-bold text-gray-900 line-clamp-2 h-[45px]">
//               {event.title}
//             </h3>
//             <p className="text-xs text-gray-500 truncate">{event.organizer}</p>
//             <p className="text-xs text-gray-400 mb-3">{event.time}</p>

//             {/* Price and Interest Footer */}
//             <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-gray-100">
//               {/* Price Section */}
//               <div
//                 className={`flex items-center gap-1 text-sm ${
//                   parseInt(event.price) === 0
//                     ? "text-green-600 font-bold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 <FiTag
//                   size={14}
//                   className={
//                     parseInt(event.price) === 0
//                       ? "text-green-600"
//                       : "text-gray-400"
//                   }
//                 />
//                 <span>{event.price}</span>
//               </div>

//               {/* Interest Section */}
//               {event.interested > 0 && (
//                 <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
//                   <FiStar size={14} className="text-blue-600 fill-blue-600" />
//                   <span>{event.interested} interested</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>

//       <button
//         type="button"
//         onClick={handleAddFavorites}
//         className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:text-red-500 transition-colors z-20 cursor-pointer"
//       >
//         <FiHeart size={18} />
//       </button>
//     </div>
//   );
// };
const colors = [
"bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-green-600 text-white",
  "bg-teal-500 text-white",
  "bg-blue-500 text-white",
  "bg-indigo-500 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",

  "bg-slate-800 text-white",
  "bg-zinc-900 text-white",
  "bg-neutral-800 text-white",
  "bg-stone-800 text-white",
];

export const getCategoryColor = (category: string) => {
  let hash = 0;
  // Iterate through characters to create a number sum
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use modulo to ensure the index is always within the array bounds
  const index = Math.abs(hash % colors.length);
  
  return colors[index];
};
const getImageUrl = (url?: string) => {
  if (!url) return "/events.json";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `https://${url}`;
};


// let colorsText = ["text-blue-600", "text-green-600", "text-red-600", "text-yellow-600"];
const EventCard = ({ event }: { event: EventDocument }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { toggleFavorite } = useFavoriteStore();
 const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleFavorite(event._id);
  };
// event.analytics.likes+=100
  // Extract month and date from event.date (YYYY-MM-DD format)
  // const getMonthDay = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   const month = date
  //     .toLocaleString("default", { month: "short" })
  //     .toUpperCase();
  //   const day = date.getDate();
  //   return { month, date: day };
  // };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300); // 300ms matches CSS duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  const { month, date: dayDate } = getMonthDay(event.date);
  const imageUrl = getImageUrl(event.media?.mediaUrl);
  const interested = event.analytics?.likes || 0;

  const isFavorite = useFavoriteStore((state) => state.favorites.includes(event._id));

  // return (
  //   <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans relative flex flex-col h-full w-full max-w-sm mx-auto">
  //     {/* 1. The anchor wraps the content, but NOT the button */}
  //     {/* Replaced Next.js Link with standard anchor tag for preview compatibility */}
  //     <Link
  //       href={`/events/${event._id}`}
  //       className="flex flex-col h-full text-inherit no-underline"
  //     >
  //       {/* Image Header Section - Responsive Height */}
  //       <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-gray-100">
  //         {/* Replaced Next.js Image with standard img tag */}
  //         <Image
  //           src={imageUrl}
  //           alt={event.title}
  //           fill
  //           className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  //         />
  //         <div className="w-[93%] flex justify-between absolute bottom-3 left-3 ">
  //           {/* <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-600 text-white bg-opacity-90">
  //             {Array.isArray(event.category)
  //               ? event.category[0]
  //               : event.category}
  //           </span> */}
  //           {/* <span className=" text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-600 text-white bg-opacity-90">
  //             {Array.isArray(event.category)
  //               ? event.category[0]
  //               : event.category}
  //           </span> */}
  //           {event.type === "hybrid" ? (
  //             <span className=" text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-fuchsia-800 text-white bg-opacity-90">
  //               Hybrid
  //             </span>
  //           ) : (
  //             <span className=""></span>
  //           )}
  //         </div>
  //       </div>

  //       {/* Content Section - Responsive Padding */}
  //       <div className=" p-3 sm:p-4 flex gap-3 sm:gap-4 flex-1">
  //         {/* Date Block (Left side) - Responsive Text */}
  //         <div className="flex flex-col items-center text-blue-700 shrink-0 min-w-12">
  //           <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
  //             {month}
  //           </span>
  //           <span className="text-xl sm:text-2xl font-extrabold leading-none mt-1">
  //             {dayDate}
  //           </span>
  //         </div>

  //         {/* Details Block (Right side) - Flex Grow to fill space */}
  //         <div className="flex flex-col gap-1 grow font-medium min-w-0">
  //           {/* Title - Responsive Text & Auto Height */}
  //           <h3 className="text-base sm:text-lg leading-tight font-bold text-gray-900 line-clamp-2 min-h-[45px]">
  //             {event.title}
  //           </h3>

  //           <p className="text-xs text-gray-500 truncate w-full mb-2">
  //             {event.organizer.firstName}
  //           </p>
  //           {/* <div className="flex justify-start items-center text-left flex-col-reverse xs:flex-row w-full">
  //             <p className="text-xs text-gray-400 mb-3  w-full">{event.time}</p>
  //             <p className="text-xs text-gray-400 mb-3  pr-4 w-full text-right ">
  //               {`${event.location.city}/${event.location.district}`}
  //             </p>
  //           </div> */}
  //           <div className="flex w-full flex-col-reverse items-start text-left min-[350px]:flex-row min-[350px]:items-center min-[350px]:justify-between">
  //             {/* Time: Bottom on mobile, Left on desktop */}
  //             <p className="text-xs text-gray-400 mt-3 min-[350px]:mt-0">
  //               {event.time}
  //             </p>

  //             {/* Location: Top on mobile, Right on desktop */}
  //             {event.type !== "online" ? (
  //               <p className="text-xs text-gray-400 text-left min-[350px]:text-right pr-4">
  //                 {`${event.location.city}/${event.location.district}`}
  //               </p>
  //             ) : (
  //               <p
  //                 className={`text-xs ${
  //                   event.type === "online" ? "text-amber-400" : ""
  //                 } text-left min-[350px]:text-right pr-4 fw-bolder`}
  //               >
  //                 {event.type}
  //               </p>
  //             )}
  //           </div>

  //           {/* Price and Interest Footer - Pushed to bottom */}
  //           <div className="relative left-[-46px] flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100 w-[calc(100%+30px)]">
  //             {/* Price Section */}
  //             <div
  //               className={`flex items-center gap-1 text-xs sm:text-sm ${
  //                 event.ticketType.price === 0
  //                   ? "text-green-600 font-bold"
  //                   : "text-gray-700"
  //               }`}
  //             >
  //               <FiTag
  //                 size={14}
  //                 className={
  //                   event.ticketType.price === 0
  //                     ? "text-green-600"
  //                     : "text-gray-400"
  //                 }
  //               />
  //               <span className="truncate max-w-20 sm:max-w-none">
  //                 {event.ticketType.price === 0
  //                   ? "Free"
  //                   : event.ticketType.price + " EGP"}
  //               </span>
  //             </div>

  //             {/* Interest Section */}
  //             {interested > 0 && (
  //               <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-semibold ml-2">
  //                 <FiStar
  //                   size={12}
  //                   className="text-blue-600 fill-blue-600 shrink-0 sm:w-3.5 sm:h-3.5"
  //                 />
  //                 <span className="whitespace-nowrap">
  //                   {interested} interested
  //                 </span>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </Link>

  //     <button
  //       type="button"
  //       onClick={handleAddFavorites}
  //       className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:text-red-500 transition-colors z-20 cursor-pointer active:scale-95 text-gray-600"
  //       aria-label="Add to favorites"
  //     >
  //       <FiStar size={18} />
  //     </button>
  //   </div>
  // );
 


  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans relative flex flex-col h-full w-full max-w-sm mx-auto">
      {/* 1. The anchor wraps the content, but NOT the button */}
      {/* Replaced Next.js Link with standard anchor tag for preview compatibility */}
      <Link href={`/events/${event._id}`} className="flex flex-col h-full text-inherit no-underline">
        {/* Image Header Section - Responsive Height */}
        <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-gray-100">
          {/* Replaced Next.js Image with standard img tag */}
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-[#811b49] text-white bg-opacity-90`}
          >
            {"Event Type"}
          </span>
          <div className="absolute flex gap-1 bottom-3 left-3">

          {event.category.length > 0 && event.category.map((category) => (
            <span className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded-sm ${getCategoryColor(category.name)} text-white bg-opacity-90`}>
              {category.name}
            </span>
          ))}
          </div>
             {/* <span className=" text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-600 text-white bg-opacity-90">
              {Array.isArray(event.category)
              ? event.category[0].name
              : event.category}
            </span> */}
        </div>

        {/* Content Section - Responsive Padding */}
        <div className="p-3 sm:p-4 relative flex gap-3 sm:gap-4 flex-1">
          {/* Date Block (Left side) - Responsive Text */}
          <div className="flex flex-col items-center text-blue-700 shrink-0 min-w-[3rem]">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
              {month}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold leading-none mt-1">
              {dayDate}
            </span>
          </div>

          {/* Details Block (Right side) - Flex Grow to fill space */}
          <div className="flex flex-col gap-1 grow font-medium min-w-0">
            {/* Title - Responsive Text & Auto Height */}
            <h3 className="text-base sm:text-lg leading-tight font-bold text-gray-900 line-clamp-2 min-h-[2.5rem]">
              {event.title}
            </h3>
            
            <p className="text-xs text-gray-500 truncate w-full">
              {event.organizer.firstName + " " + event.organizer.lastName}
            </p>
            <p className="text-xs text-gray-400 mb-3 truncate">
              {event.time}
            </p>

            {/* Price and Interest Footer - Pushed to bottom */}
            {/* <div className="flex relative -left-[3rem]  items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100 w-[calc(100%+2rem)]">
          
              <div
                className={`flex items-center gap-1 text-xs sm:text-sm ${
                  event.ticketType.price === 0 ? "Free" : event.ticketType.price + " EGP"
                    ? "text-green-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <FiTag
                  size={14}
                  className={
                    event.ticketType.price === 0 ? "text-green-600" : "text-gray-400"
                  }
                />
                <span className={`truncate max-w-[80px] sm:max-w-none ${event.ticketType.price === 0 ? "text-green-600" : "text-gray-400"}`}>
                  {event.ticketType.price === 0 ? "Free" : event.ticketType.price + " EGP"}
                </span>
              </div>

              
              {event.analytics.likes > 0 && (
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-semibold ml-2">
                  <FiStar size={12} className="text-blue-600 fill-blue-600 shrink-0 sm:w-[14px] sm:h-[14px]" />
                  <span className="whitespace-nowrap">{interested} interested</span>
                </div>
              )}
            </div> */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100 w-full">
              {/* Price Section */}
              <div
                className={`flex items-center gap-1 text-xs sm:text-sm ${
                  event.ticketType.price === 0 
                    ? "text-green-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <FiTag
                  size={14}
                  className={
                    event.ticketType.price === 0 
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {event.ticketType.price === 0 ? "Free" : event.ticketType.price + " EGP"}
                </span>
              </div>

              {/* Interest Section */}
              {event.analytics.likes > 0 && (
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-semibold ml-2">
                  <FiStar size={12} className="text-blue-600 fill-blue-600 shrink-0 sm:w-[14px] sm:h-[14px]" />
                  <span className="whitespace-nowrap">{interested} interested</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

    
         <button
        type="button"
        onClick={handleAddFavorites}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all duration-300 z-20 cursor-pointer 
          ${isFavorite 
            ? "bg-red-50 text-yellow-500 hover:bg-yellow-100" 
            : "bg-white/90 text-gray-400 hover:text-yellow-500 hover:bg-white"
          }
          ${isAnimating ? "scale-125 shadow-md ring-2 ring-yellow-100" : "hover:scale-110 active:scale-95"}
        `}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FiStar 
          size={18} 
          fill={isFavorite ? "currentColor" : "none"} 
          className={`transition-transform duration-300 ${isAnimating ? "scale-110" : ""}`}
        />
      </button>
    </div>
  );

};
export default EventCard;
