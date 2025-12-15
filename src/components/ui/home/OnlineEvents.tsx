"use client";
import { useEffect, useRef } from "react";
import useEventStore from "@/store/useEventStore";

import PaginationList from "./PaginationList";

import { EventDocument } from "@/types/eventInterface";

const OnlineEvents = ({events}: {events: EventDocument[]}) => {
  // const { events: allEvents, fetchEvents } = useEventStore();

  // useEffect(() => {
  //   fetchEvents();
  // }, [fetchEvents]);

  const onlineEvents = events.filter((e) => e.type === "online");
  const ref = useRef<HTMLDivElement>(null);
  const smoothScroll = () => {
    console.log("smoothScroll");
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start" // This aligns the top of the element with the top of the screen
      });
    }
  };
  return (
    <section className="py-16 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Discover Best of Online Events
        </h2>

        {onlineEvents.length > 0 ? (
          <PaginationList itemsPerPage={6} allEvents={onlineEvents} smoothScroll={smoothScroll}/>
        ) : (
          <h1 className="text-center w-full text-xl">No Events Found</h1>
        )}
      </div>
    </section>
  );
};

export default OnlineEvents;
