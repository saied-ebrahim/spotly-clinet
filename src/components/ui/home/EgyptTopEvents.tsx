import useEventStore from "@/store/useEventStore";

import { EgyptTopEventInterace } from "@/types/EgyptTopEventInterface";
import { useEffect, useState } from "react";
import TopEventCard from "./EgyptTopEventCard";

export default function EgyptTopEvents({events}: {events: EgyptTopEventInterace[]}) {
  const [expanded, setExpanded] = useState(false);
  // const { events: allEvents, fetchEvents } = useEventStore();

  // useEffect(() => {
  //   fetchEvents();
  // }, [fetchEvents]);

  // Use allEvents from store instead of local state fetching
  const topEvents = events ;

  // 1. Filter for Online Events in Egypt
  // 1. Parsing Helper
  const parseCount = (str?: string) => {
    if (!str) return 0;
    const num = parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
    if (str.toLowerCase().includes("k")) return num * 1000;
    return num;
  };

  // 2. Formatting helper and Sorting Logic
  const formatCount = (value?: number | string) => {
    const n = typeof value === "number" ? value : parseCount(String(value));
    if (n === 0) return "0";
    if (!n) return "0";
    if (n >= 1000000) {
      const v = n / 1000000;
      return v % 1 === 0 ? `${v}M` : `${Math.round(v * 10) / 10}M`;
    }
    if (n >= 1000) {
      const v = n / 1000;
      return v % 1 === 0 ? `${v}k` : `${Math.round(v * 10) / 10}k`;
    }
    return String(n);
  };

  // Enrich events with formatted registeredCount for display, then sort by numeric value
  // type EnrichedEvent = (typeof topEvents)[number] & {
  //   registeredCount?: string;
  // };
  // const enrichedEvents: EnrichedEvent[] = topEvents.map((e) => {
  //   const legacy = e as unknown as { registeredCount?: string };
  //   const numericSold =
  //     e.analytics?.ticketsSold ?? parseCount(legacy.registeredCount);
  //   return {
  //     ...(e as EnrichedEvent),
  //     registeredCount: formatCount(numericSold),
  //   } as EnrichedEvent;
  // });

  // const sortedEvents = [...enrichedEvents].sort(
  //   (a: EnrichedEvent, b: EnrichedEvent) => {
  //     return (
  //       parseCount(String(b.registeredCount)) -
  //       parseCount(String(a.registeredCount))
  //     );
  //   }
  // );
  const enrichedEvents: EgyptTopEventInterace[] = topEvents.map((e) => {
    const legacy = e as unknown as { registeredCount?: string };
    const numericSold =
      e.analytics?.ticketsSold ?? parseCount(legacy.registeredCount);
    return {
      ...(e as EgyptTopEventInterace),
      registeredCount: formatCount(numericSold),
    } as EgyptTopEventInterace;
  });

  const sortedEvents = [...enrichedEvents].sort(
    (a: EgyptTopEventInterace, b: EgyptTopEventInterace) => {
      return (
        parseCount(String(b.analytics?.ticketsSold)) -
        parseCount(String(a.analytics?.ticketsSold))
      );
    }
  );
  // ---------------
  // 3. SPLIT THE DATA instead of slicing one array
  // We keep the first 3 separate so they are always visible
  const initialEvents = sortedEvents.slice(0, 3);
  // We keep the rest separate to wrap them in the animation container
  const hiddenEvents =
    sortedEvents.length > 6 ? sortedEvents.slice(3, 6) : sortedEvents.slice(3);

  return (
    <section className="py-16 pt-0 bg-white border-t border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 px-4 sm:px-6 lg:px-8">
            Top Events In Egypt
          </h2>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          {initialEvents.map((event) => (
            <TopEventCard key={event._id} event={event} />
          ))}
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
            {hiddenEvents.map((event) => (
              <TopEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>

        {/* 3. Button */}
        {hiddenEvents.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded((s) => !s)}
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold transition-transform duration-300 hover:-translate-y-1"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : `Show ${hiddenEvents.length} more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
