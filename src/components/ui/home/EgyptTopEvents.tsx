import { EgyptTopEventInterace } from "@/types/EgyptTopEventInterface";
import { useEffect, useState } from "react";
import TopEventCard from "./EgyptTopEventCard";

// export ctopEvents: EgyptTopEventInterace[] = [
//   {
//     id: 101,
//     category: "Featured Webinar",
//     title: "The Future of MERN Stack",
//     description:
//       "Explore how MongoDB, Express, React, and Node are evolving in 2026. We will discuss performance optimization and state management at scale.",
//     date: "Mon, Nov 24, 2025",
//     registeredCount: "12k+",
//     image:
//       "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
//     colorSchemeDark: "from-purple-600 to-indigo-500",
//   },
//   {
//     id: 102,
//     category: "Cybersecurity",
//     title: "Network Defense Strategies",
//     description:
//       "A comprehensive guide to securing your infrastructure against modern malware threats. Perfect for IT professionals and network admins.",
//     date: "Fri, Jan 10, 2026",
//     registeredCount: "8.5k",
//     image:
//       "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
//     colorSchemeDark: "from-blue-600 to-cyan-500",
//   },
//   {
//     id: 103,
//     category: "Design System",
//     title: "UI/UX Trends for 2026",
//     description:
//       "Learn how to create accessible and visually stunning interfaces. We cover color theory, typography, and responsive layouts.",
//     date: "Wed, Feb 14, 2026",
//     registeredCount: "20k+",
//     image:
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
//     colorSchemeDark: "from-pink-600 to-red-500",
//   },
//   {
//     id: 104,
//     category: "Ethical Hacking",
//     title: "Advanced Penetration Testing",
//     description:
//       "Master the art of ethical hacking. Learn the latest tools and techniques to identify vulnerabilities before the bad guys do.",
//     date: "Thu, Mar 20, 2026",
//     registeredCount: "15k+",
//     image:
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
//     colorSchemeDark: "from-pink-600 to-red-500",
//   },
//   {
//     id: 105,
//     category: "Virtual Reality",
//     title: "Building Immersive Worlds",
//     description:
//       "A deep dive into VR development using Unity and Unreal Engine. Create experiences that transport users to new realities.",
//     date: "Sat, Apr 18, 2026",
//     registeredCount: "5k",
//     image:
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
//     colorSchemeDark: "from-pink-600 to-red-500",
//   },
// ];

//--------------------
//--------------------
//--------------------
// export default function EgyptTopEvents() {
//   const [expanded, setExpanded] = useState(false);
//   const [topEvents, setTopEvents] = useState([] as EgyptTopEventInterace[]);

//   useEffect(() => {
//     fetch("http://localhost:8080/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setTopEvents(data);
//       });
//   }, []);

//   // 1. Filter for Online Events in Egypt
//   // 1. Parsing Helper
//   const parseCount = (str?: string) => {
//     if (!str) return 0;
//     const num = parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
//     if (str.toLowerCase().includes("k")) return num * 1000;
//     return num;
//   };

//   // 2. Sorting Logic
//   const sortedEvents = [...topEvents].sort((a, b) => {
//     return parseCount(b.registeredCount) - parseCount(a.registeredCount);
//   });

//   // 3. SPLIT THE DATA instead of slicing one array
//   // We keep the first 3 separate so they are always visible
//   const initialEvents = sortedEvents.slice(0, 3);
//   // We keep the rest separate to wrap them in the animation container
//   const hiddenEvents = sortedEvents.slice(3);

//   return (
//     <section className="py-16 pt-0 bg-white border-t border-b border-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center sm:text-left mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Top Events In Egypt
//           </h2>
//           {/* <p className="text-gray-500 text-lg">
//             Webinars, classes, and global virtual gatherings
//           </p> */}
//         </div>

//         {/* 1. Always Render the First 3 Events */}
//         <div>
//           {initialEvents.map((event) => (
//             <TopEventCard key={event.id} event={event} />
//           ))}
//         </div>

//         {/* 2. The Animation Container for the Rest */}
//         {/* We use CSS Grid transition from 0fr to 1fr */}
//         <div
//           className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
//             expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//           }`}
//         >
//           <div className="overflow-hidden">
//             {hiddenEvents.map((event) => (
//               <TopEventCard key={event.id} event={event} />
//             ))}
//           </div>
//         </div>

//         {/* 3. Button */}
//         {hiddenEvents.length > 0 && (
//           <div className="text-center mt-6">
//             <button
//               onClick={() => setExpanded((s) => !s)}
//               className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold transition-transform duration-300 hover:-translate-y-1"
//               aria-expanded={expanded}
//             >
//               {expanded ? "Show less" : `Show ${hiddenEvents.length} more`}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

export default function EgyptTopEvents() {
  const [expanded, setExpanded] = useState(false);
  const [topEvents, setTopEvents] = useState([] as EgyptTopEventInterace[]);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setTopEvents(data);
      });
  }, []);

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
  type EnrichedEvent = (typeof topEvents)[number] & {
    registeredCount?: string;
  };
  const enrichedEvents: EnrichedEvent[] = topEvents.map((e) => {
    const legacy = e as unknown as { registeredCount?: string };
    const numericSold =
      e.analytics?.ticketsSold ?? parseCount(legacy.registeredCount);
    return {
      ...(e as EnrichedEvent),
      registeredCount: formatCount(numericSold),
    } as EnrichedEvent;
  });

  const sortedEvents = [...enrichedEvents].sort(
    (a: EnrichedEvent, b: EnrichedEvent) => {
      return (
        parseCount(String(b.registeredCount)) -
        parseCount(String(a.registeredCount))
      );
    }
  );

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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Top Events In Egypt
          </h2>
          {/* <p className="text-gray-500 text-lg">
            Webinars, classes, and global virtual gatherings
          </p> */}
        </div>

        {/* 1. Always Render the First 3 Events */}
        <div>
          {initialEvents.map((event) => (
            <TopEventCard key={event.id} event={event} />
          ))}
        </div>

        {/* 2. The Animation Container for the Rest */}
        {/* We use CSS Grid transition from 0fr to 1fr */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {hiddenEvents.map((event) => (
              <TopEventCard key={event.id} event={event} />
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
