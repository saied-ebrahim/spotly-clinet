"use client";
import { EventObject } from "@/types/PaginationInterface";
import axiosInstance from "@/lib/axios";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { EventDocument } from "@/types/eventInterface";
import useEventStore from "@/store/useEventStore";
import { useCityMatcher } from "@/utils/home/useCityMatcher";
const longCity =(city:string)=> {
    if (city === "Alexandria") return "Alex";
    else if (city === "Kafr Al Sheikh") return "KFS";
    else return city};
const EventSelector = ({
  locationQuery,
  onSelect,
}: {
  locationQuery?: string | null;
  onSelect?: (eventId: string | null) => void;
}) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [events, setEvents] = useState<EventDocument[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  // useEffect(() => {
  //   axiosInstance.get("/events").then((res) => {
  //     setEvents(res.data.data.events);
  //   });
  // }, []);
    const { events, fetchEvents } = useEventStore();
    console.log(events);
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CORE LOGIC CHANGE HERE ---
  //------------------
  // const filteredEvents = events.filter((item) => {
  //   // 1. If a location is selected in the parent, the event MUST match that location
  //   const matchesLocation = locationQuery
  //     ? item.location.district?.toLowerCase() === locationQuery.toLowerCase() && item.type !== "online"
  //     : true; // If no location selected, show all locations

  //   // 2. The event title must match what the user types in THIS input
  //   const matchesInput = item.title.toLowerCase().includes(input.toLowerCase());

  //   return matchesLocation && matchesInput;
  // });
//-----------------------
const { findClosestMatch } = useCityMatcher();
const filteredEvents = events.filter((item) => {
  // 1. GLOBAL RULE: The event must strictly NOT be online
  const isNotOnline = item.type !== "online";

  // 2. If a location is selected, match it. 
  // (We removed the 'online' check from here because we handle it globally now)
  // const matchesLocation = locationQuery
  //   ? item.location.district?.toLowerCase() === locationQuery.toLowerCase()
  //   : true;
  const matchesLocation = locationQuery
    ? findClosestMatch(item.location.district)?.toLowerCase() === locationQuery.toLowerCase()
    : true;

  // 3. The event title must match the input
  const matchesInput = item.title.toLowerCase().includes(input.toLowerCase());

  // Return true only if ALL conditions are met
  return isNotOnline && matchesLocation && matchesInput;
});
//-----------------------
  /* console.log(filteredEvents); */

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
            if (onSelect) onSelect(null);
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
        <ul className="absolute z-50 mt-2 w-full origin-top-right rounded-sm bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto border border-gray-100">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event._id}
                onClick={() => {
                  setInput(event.title);
                  setIsOpen(false);
                  if (onSelect) onSelect(event._id || null);
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
                  <span className="text-left">{`${
                    longCity(event.location.city)
                  }/${event.location.district}`}</span>
                  {/* <div className="flex gap-3">
                    {event.category.length > 0 &&
                      event.category.map((category) => (
                        <span
                          key={category.name}
                          className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                        >
                          {category.name}
                        </span>
                      ))}
                  </div> */}
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
