"use client";
import { EventObject } from "@/types/PaginationInterface";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
// const EventSelector = ({ query }: { query: string }) => {
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [events, setEvents] = useState([]);

//   // The data
//   const governorates = [
//     "Cairo",
//     "Mansoura",
//     "Tanta",
//     "Sohag",
//     "Alexandria",
//     "Giza",
//     "Luxor",
//   ];

//   useEffect(() => {
//     fetch("http://localhost:8080/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//       });
//   }, []);
//   // Filter items based on user typing
//   const filteredItems = events.filter(
//     (item: EventObject) =>
//       item.location.area.toLowerCase() === query.toLowerCase() &&
//       item.location.area.toLowerCase().includes(input.toLowerCase())
//   );
//   // const filteredItems = governorates.filter((item) =>
//   //   item.toLowerCase().includes(input.toLowerCase())
//   // );

//   return (
//     <div className="relative w-full sm:w-72 font-sans grow m-0">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => {
//           setInput(e.target.value);
//           setIsOpen(true);
//         }}
//         onFocus={() => setIsOpen(true)}
//         // Simple delay to allow clicking an item before blur hides the list
//         onBlur={() => setTimeout(() => setIsOpen(false), 200)}
//         placeholder="Search for events, webinars, or artists..."
//         className="w-full h-full bg-gray-50 text-gray-900 text-sm font-medium rounded-xl border-0 px-4 py-3 pl-10 shadow-sm placeholder-gray-400 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all outline-none"
//       />

//       {/* Map Pin Icon (Absolute positioned inside input) */}
//       {!input && (
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <FiSearch className="w-5 h-5 text-gray-400" size={20} />
//         </div>
//       )}
//       {/* </div> */}

//       {/* 2. The Custom Dropdown (Replaces Datalist) */}
//       {isOpen && filteredItems.length > 0 && (
//         <ul className="absolute z-10 mt-2 w-full origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
//           {filteredItems.map((city, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 setInput(city);
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer select-none px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
//             >
//               {city}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* 3. Empty State (Optional) */}
//       {isOpen && input && filteredItems.length === 0 && (
//         <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg p-4 text-sm text-gray-500 text-center border border-gray-100">
//           No location found.
//         </div>
//       )}
//     </div>
//   );
// };
const EventSelector = ({ locationQuery, onSelectEvent }) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const wrapperRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CORE LOGIC CHANGE HERE ---
  const filteredEvents = events.filter((item) => {
    // 1. If a location is selected in the parent, the event MUST match that location
    const matchesLocation = locationQuery
      ? item.location.area.toLowerCase() === locationQuery.toLowerCase()
      : true; // If no location selected, show all locations

    // 2. The event title must match what the user types in THIS input
    const matchesInput = item.title.toLowerCase().includes(input.toLowerCase());

    return matchesLocation && matchesInput;
  });

  return (
    <div
      ref={wrapperRef}
      className="relative w-full sm:w-72 font-sans grow m-0 z-30"
    >
      <div className="relative h-full">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
            // Reset selection if user types (forces them to re-select from list)
            if (onSelectEvent) onSelectEvent(null);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search events..."
          className="w-full h-full bg-gray-50 text-gray-900 text-sm font-medium rounded-xl border-0 px-4 py-3 pl-10 shadow-sm placeholder-gray-400 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all outline-none"
        />
        {!input && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-50 mt-2 w-full origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto border border-gray-100">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event.id}
                onClick={() => {
                  setInput(event.title);
                  setIsOpen(false);
                  if (onSelectEvent) onSelectEvent(event.id);
                }}
                className="cursor-pointer select-none px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
              >
                <div
                  style={{ textAlign: "left" }}
                  className="font-semibold text-gray-800 group-hover:text-indigo-700 text-left"
                >
                  {event.title}
                </div>
                <div className="text-xs text-gray-500 flex justify-between mt-1">
                  <span>{event.location.area}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                    {event.category}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-sm text-gray-500 text-center">
              {locationQuery
                ? `No events found in ${locationQuery}`
                : "No events found"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default EventSelector;
