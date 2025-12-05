import { EventDocument } from "@/types/eventInterface";

const filterEvents = (events: EventDocument[], filterType: string) => {
  // Helper: Parse event.date as ISO string (YYYY-MM-DD)
  const today = new Date();
  // start of today (local)
  today.setHours(0, 0, 0, 0);
  // end of today for inclusive comparisons
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  const getEventDate = (event: EventDocument) => {
    // Expecting event.date as 'YYYY-MM-DD' or similar
    const date = new Date(event.date);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  return events
    .map((event) => ({
      ...event,
      _eventDate: getEventDate(event),
    }))
    .filter((event) => {
      const eventDate = event._eventDate;
      if (isNaN(eventDate.getTime())) return false;
      if (eventDate < today) return false;

      switch (filterType) {
        case "Today": {
          // include any event whose normalized date falls within today
          return eventDate >= today && eventDate <= endOfToday;
        }
        case "Tomorrow": {
          const tomorrowStart = new Date(today);
          tomorrowStart.setDate(tomorrowStart.getDate() + 1);
          const tomorrowEnd = new Date(tomorrowStart);
          tomorrowEnd.setHours(23, 59, 59, 999);
          return eventDate >= tomorrowStart && eventDate <= tomorrowEnd;
        }
        case "This Week": {
          // inclusive 7-day window starting today
          const windowEnd = new Date(today);
          windowEnd.setDate(windowEnd.getDate() + 7);
          windowEnd.setHours(23, 59, 59, 999);
          return eventDate >= today && eventDate <= windowEnd;
        }
        case "Hybrid": {
          // inclusive 7-day window starting today

          return event.type === "hybrid";
        }
        // case "Weekend": {
        //   // Find the upcoming Saturday (start) and Sunday (end) and include events within that weekend
        //   const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
        //   // Calculate days until next Saturday. If today is Saturday, include this Saturday.
        //   const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
        //   const saturdayStart = new Date(today);
        //   saturdayStart.setDate(saturdayStart.getDate() + daysUntilSaturday);
        //   saturdayStart.setHours(0, 0, 0, 0);

        //   const sundayEnd = new Date(saturdayStart);
        //   sundayEnd.setDate(sundayEnd.getDate() + 1);
        //   sundayEnd.setHours(23, 59, 59, 999);

        //   return eventDate >= saturdayStart && eventDate <= sundayEnd;
        // }
        case "Free": {
          // Check if 'free' is in tags or category OR price represents zero/free
          const tags = event.tags?.map((t) => String(t).toLowerCase()) || [];
          const categories =
            event.category?.map((c) => String(c).toLowerCase()) || [];

          // Robust price detection: accept numeric 0, "$0", "0.00", or the word 'free'
          const priceRaw = event.ticketType.price ?? "";
          let isPriceFree = false;
          if (typeof priceRaw === "number") {
            isPriceFree = priceRaw === 0;
          } else {
            const priceString = String(priceRaw).trim().toLowerCase();
            if (priceString === "free") {
              isPriceFree = true;
            } else {
              // remove currency symbols and thousands separators, keep digits and dot/minus
              const cleaned = priceString.replace(/[^0-9.\-]/g, "");
              const parsed = parseFloat(cleaned);
              if (!isNaN(parsed)) {
                isPriceFree = parsed === 0;
              }
            }
          }

          return (
            tags.includes("free") || categories.includes("free") || isPriceFree
          );
        }
        default:
          return true;
        // return event.type!==;
      }
    });
};

export default filterEvents;
// import { Event } from "@/types/PaginationInterface";

// const filterEvents = (events: Event[], filterType: string) => {
//   // Helper: Parse event.date as ISO string (YYYY-MM-DD)
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const getEventDate = (event: Event) => {
//     // Expecting event.date as 'YYYY-MM-DD' or similar
//     const date = new Date(event.date);
//     date.setHours(0, 0, 0, 0);
//     return date;
//   };

//   return events
//     .map((event) => ({
//       ...event,
//       _eventDate: getEventDate(event),
//     }))
//     .filter((event) => {
//       const eventDate = event._eventDate;
//       if (isNaN(eventDate.getTime())) return false;
//       if (eventDate < today) return false;

//       switch (filterType) {
//         case "Today":
//           return eventDate.getTime() === today.getTime();
//         case "Tomorrow": {
//           const tomorrow = new Date(today);
//           tomorrow.setDate(tomorrow.getDate() + 1);
//           return eventDate.getTime() === tomorrow.getTime();
//         }
//         case "This Week": {
//           const sevenDaysFromNow = new Date(today);
//           sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
//           return eventDate >= today && eventDate <= sevenDaysFromNow;
//         }
//         case "Free": {
//           // Check if 'free' is in tags, category, or price
//           const tags = event.tags?.map((t) => t.toLowerCase()) || [];
//           const categories = event.category?.map((c) => c.toLowerCase()) || [];
//           const priceStr = String(event.price ?? "").toLowerCase();
//           return (
//             tags.includes("free") ||
//             categories.includes("free") ||
//             priceStr === "free" ||
//             priceStr === "0"
//           );
//         }
//         default:
//           return true;
//       }
//     });
// };

// export default filterEvents;
