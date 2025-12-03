import Image from "next/image";
import { FiStar, FiTag } from "react-icons/fi";
import { EventObject } from "@/types/PaginationInterface";
import Link from "next/link";
import { getMonthDay } from "@/utils/details/formatting";
import { EventDocument } from "@/types/eventInterface";

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
const EventCard = ({ event }: { event: EventDocument }) => {
  const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Prevent the default button behavior
    // e.preventDefault();
    // // 2. STOP the event from bubbling up to the parent anchor tag
    // e.stopPropagation();

    console.log(`Added event ID ${event._id} to favorites!`);
  };

  // Extract month and date from event.date (YYYY-MM-DD format)
  // const getMonthDay = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   const month = date
  //     .toLocaleString("default", { month: "short" })
  //     .toUpperCase();
  //   const day = date.getDate();
  //   return { month, date: day };
  // };

  const getImageUrl = (url?: string) => {
    if (!url) return "/events.json";
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return `https://${url}`;
  };

  const { month, date: dayDate } = getMonthDay(event.date);
  const imageUrl = getImageUrl(event.media?.[0]?.mediaUrl);
  const interested = event.analytics?.likes || 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 font-sans relative flex flex-col h-full w-full max-w-sm mx-auto">
      {/* 1. The anchor wraps the content, but NOT the button */}
      {/* Replaced Next.js Link with standard anchor tag for preview compatibility */}
      <Link
        href={`/events/${event._id}`}
        className="flex flex-col h-full text-inherit no-underline"
      >
        {/* Image Header Section - Responsive Height */}
        <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-gray-100">
          {/* Replaced Next.js Image with standard img tag */}
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="w-[93%] flex justify-between absolute bottom-3 left-3 ">
            {/* <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-600 text-white bg-opacity-90">
              {Array.isArray(event.category)
                ? event.category[0]
                : event.category}
            </span> */}
            {/* <span className=" text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-600 text-white bg-opacity-90">
              {Array.isArray(event.category)
                ? event.category[0]
                : event.category}
            </span> */}
            {event.type === "hybrid" ? (
              <span className=" text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-fuchsia-800 text-white bg-opacity-90">
                Hybrid
              </span>
            ) : (
              <span className=""></span>
            )}
          </div>
        </div>

        {/* Content Section - Responsive Padding */}
        <div className=" p-3 sm:p-4 flex gap-3 sm:gap-4 flex-1">
          {/* Date Block (Left side) - Responsive Text */}
          <div className="flex flex-col items-center text-blue-700 shrink-0 min-w-12">
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
            <h3 className="text-base sm:text-lg leading-tight font-bold text-gray-900 line-clamp-2 min-h-[45px]">
              {event.title}
            </h3>

            <p className="text-xs text-gray-500 truncate w-full mb-2">
              {event.organizer.firstName}
            </p>
            {/* <div className="flex justify-start items-center text-left flex-col-reverse xs:flex-row w-full">
              <p className="text-xs text-gray-400 mb-3  w-full">{event.time}</p>
              <p className="text-xs text-gray-400 mb-3  pr-4 w-full text-right ">
                {`${event.location.city}/${event.location.district}`}
              </p>
            </div> */}
            <div className="flex w-full flex-col-reverse items-start text-left min-[350px]:flex-row min-[350px]:items-center min-[350px]:justify-between">
              {/* Time: Bottom on mobile, Left on desktop */}
              <p className="text-xs text-gray-400 mt-3 min-[350px]:mt-0">
                {event.time}
              </p>

              {/* Location: Top on mobile, Right on desktop */}
              {event.type !== "online" ? (
                <p className="text-xs text-gray-400 text-left min-[350px]:text-right pr-4">
                  {`${event.location.city}`}
                </p>
              ) : (
                <p
                  className={`text-xs ${
                    event.type === "online" ? "text-amber-400" : ""
                  } text-left min-[350px]:text-right pr-4 fw-bolder`}
                >
                  {event.type}
                </p>
              )}
            </div>

            {/* Price and Interest Footer - Pushed to bottom */}
            <div className="relative left-[-46px] flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100 w-[calc(100%+30px)]">
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
                    event.ticketType.price === 0 ? "text-green-600" : "text-gray-400"
                  }
                />
                <span className="truncate max-w-20 sm:max-w-none">
                  {event.ticketType.price === 0 ? "Free" : event.ticketType.price + " EGP"}
                </span>
              </div>

              {/* Interest Section */}
              {interested > 0 && (
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-semibold ml-2">
                  <FiStar
                    size={12}
                    className="text-blue-600 fill-blue-600 shrink-0 sm:w-3.5 sm:h-3.5"
                  />
                  <span className="whitespace-nowrap">
                    {interested} interested
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddFavorites}
        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:text-red-500 transition-colors z-20 cursor-pointer active:scale-95 text-gray-600"
        aria-label="Add to favorites"
      >
        <FiStar size={18} />
      </button>
    </div>
  );
};
export default EventCard;
