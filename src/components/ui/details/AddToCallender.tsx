import React from "react";
import { EventObject } from "@/types/PaginationInterface"; // Assuming you have this type

const AddToCalendarButton = ({ event }: { event: EventObject }) => {
  // 1. Helper to format dates to YYYYMMDDTHHmmSSZ (UTC)
  // Google requires this specific format without dashes or colons
  const formatGoogleDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  // 2. Construct the URL
  const createGoogleCalendarUrl = () => {
    // Assuming your event object has start_date and end_date
    // If you don't have an end date, typically you add 1 hour to the start date
    const startTime = formatGoogleDate(event.date);
    const endTime = formatGoogleDate(
      new Date(
        new Date(event.date).getTime() + 24 * 60 * 60 * 1000
      ).toISOString()
    );

    const url = new URL("https://calendar.google.com/calendar/render");

    // 3. Set Parameters
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", event.title);
    url.searchParams.append("dates", `${startTime}/${endTime}`);
    url.searchParams.append("details", event.description || "");
    url.searchParams.append("location", event.location.address || "");

    return url.toString();
  };

  return (
    <a
      href={createGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      Add to Calendar
    </a>
  );
};

export default AddToCalendarButton;
