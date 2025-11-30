import { useMemo } from "react";

export const useEventDate = (dateString: string) => {
  // We use useMemo so we don't recalculate this on every single render
  // unless the dateString actually changes.
  const dateData = useMemo(() => {
    // 1. Safety check: if string is empty, return nulls
    if (!dateString) {
      return {
        isValid: false,
        day: "",
        month: "",
        year: "",
        weekday: "",
        fullFormatted: "",
        isPast: false,
        raw: null,
      };
    }

    // 2. Hydrate the string into a real Date object
    const date = new Date(dateString);

    // 3. Check if the date is invalid (e.g. "Invalid Date")
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        day: "",
        month: "",
        year: "",
        weekday: "",
        fullFormatted: "Invalid Date",
        isPast: false,
        raw: null,
      };
    }

    // 4. Extract parts using Intl.DateTimeFormat (Standard JS API)
    // You can change 'en-EG' to 'ar-EG' if you want Arabic output
    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    ); // e.g. "December"
    const shortMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date); // e.g. "Dec"
    const year = date.getFullYear().toString();
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date); // e.g. "Saturday"

    // 5. Utility: Check if event has passed
    const isPast = new Date() > date;

    return {
      isValid: true,
      raw: date, // The actual Date object if you need it for math
      day, // "15"
      month, // "December"
      shortMonth, // "Dec" (Good for calendar cards)
      year, // "2025"
      weekday, // "Monday"
      fullFormatted: `${weekday}, ${month} ${day}, ${year}`, // "Monday, December 15, 2025"
      isPast, // Boolean: true if event is over
    };
  }, [dateString]);

  return dateData;
};
