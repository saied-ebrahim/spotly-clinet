import { EventObject } from "@/types/PaginationInterface";
// const filterEvents = (events, filterType) => {
//   // 1. Helper: Map month abbreviations to numbers (0-11)
//   const monthMap = {
//     JAN: 0,
//     FEB: 1,
//     MAR: 2,
//     APR: 3,
//     MAY: 4,
//     JUN: 5,
//     JUL: 6,
//     AUG: 7,
//     SEP: 8,
//     OCT: 9,
//     NOV: 10,
//     DEC: 11,
//   };

//   // 2. Helper: Convert event data to a JS Date object
//   const getEventDate = (event) => {
//     const currentYear = new Date().getFullYear();
//     const monthIndex = monthMap[event.month.toUpperCase()];
//     const day = parseInt(event.date, 10);

//     // Create date (Time set to 00:00:00 for accurate day comparison)
//     const date = new Date(currentYear, monthIndex, day);
//     date.setHours(0, 0, 0, 0);
//     return date;
//   };

//   // 3. Define "Today" for comparison
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // 4. Filter Logic
//   return events.filter((event) => {
//     const eventDate = getEventDate(event);

//     switch (filterType) {
//       case "Today":
//         return eventDate.getTime() === today.getTime();

//       case "Tomorrow":
//         const tomorrow = new Date(today);
//         tomorrow.setDate(tomorrow.getDate() + 1);
//         return eventDate.getTime() === tomorrow.getTime();

//       case "This Week":
//         // Logic: "This Week" = From Today up to 7 days from now
//         const nextWeek = new Date(today);
//         nextWeek.setDate(today.getDate() + 7);
//         return eventDate >= today && eventDate <= nextWeek;

//       case "Free":
//         // Checks if price is "FREE", "0", or if isFree is true
//         const priceStr = String(event.price).toUpperCase();
//         return priceStr === "FREE" || priceStr === "0" || event.isFree === true;

//       default:
//         return true; // Return all events if no filter matches
//     }
//   });
// };
// export default filterEvents;
// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------
const filterEvents = (events: EventObject[], filterType: string) => {
  // 1. Helper: Map month abbreviations to numbers (0-11)
  const monthMap: Record<string, number> = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };

  // 2. Define "Today" for comparison (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // console.log(events);
  // 3. Helper: Convert event data to a JS Date object and adjust the year
  const getEventDate = (event: EventObject) => {
    const currentYear = new Date().getFullYear();
    const monthIndex = monthMap[event.month.toUpperCase()];
    const day = parseInt(event.date, 10);

    // Create date for the current year (Time set to 00:00:00)
    const eventDate = new Date(currentYear, monthIndex, day);
    eventDate.setHours(0, 0, 0, 0);

    // ** CRITICAL FIX: Check if the event date is in the past this year **
    if (eventDate < today) {
      // If it's in the past, assume it's for the next year
      eventDate.setFullYear(currentYear + 1);
    }

    return eventDate;
  };

  // 4. Initial Filter & Filter Logic
  return events
    .map((event) => ({
      ...event,
      _eventDate: getEventDate(event), // Attach calculated Date object to event
    }))
    .filter((event) => {
      const eventDate = event._eventDate;

      // Ensure the event is not in the past
      if (eventDate < today) {
        // This check handles any edge case where the year increment didn't cover it
        // (though the getEventDate helper should prevent this).
        return false;
      }

      switch (filterType) {
        case "Today":
          return eventDate.getTime() === today.getTime();

        case "Tomorrow":
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          return eventDate.getTime() === tomorrow.getTime();

        case "This Week":
          // Logic: "This Week" = From Today up to 7 days from now (inclusive)
          const sevenDaysFromNow = new Date(today);
          sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
          return eventDate >= today && eventDate <= sevenDaysFromNow;

        case "Free":
          // Checks if price is "FREE", "0", or if isFree is true
          const priceStr = String(event.price).toUpperCase();
          return (
            priceStr === "FREE" ||
            priceStr === "0" /* || event.isFree === true */
          );

        default:
          return true; // Return all current/future events if no filter matches
      }
    });
};

export default filterEvents;
