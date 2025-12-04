import React, { useState } from "react";
import EventSelector from "./EventSelector";
import LocationSelector from "./LocationSelector";
import { useRouter } from "next/navigation";

export default function SearchEvent() {
  const router = useRouter(); // Initialize the router
  const [query, setQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleSearch = () => {
    if (selectedEventId) {
      // Navigate to the dynamic event page
      router.push(`/events/${selectedEventId}`);
    } else {
      alert("Please select a specific event from the list first.");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row flex-wrap bg-white p-2 rounded-xl shadow-2xl space-y-3 sm:space-y-0 sm:space-x-2 gap-2">
      <EventSelector locationQuery={query} onSelect={(eventId) => setSelectedEventId(eventId ? parseInt(eventId) : null)} />
      <LocationSelector query={query} setQuery={setQuery} />
      <button
        onClick={handleSearch}
        className="bg-indigo-600 grow hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl sm:rounded-r-lg shadow-lg transition duration-200 w-full sm:w-auto shrink-0"
      >
        Search
      </button>
    </div>
  );
}
