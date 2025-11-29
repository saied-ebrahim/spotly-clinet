import { EventObject } from "@/types/PaginationInterface";

const filterEvents = (events: EventObject[], filterType: string) => {
  // Helper: Parse event.date as ISO string (YYYY-MM-DD)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getEventDate = (event: EventObject) => {
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
        case "Today":
          return eventDate.getTime() === today.getTime();
        case "Tomorrow": {
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          return eventDate.getTime() === tomorrow.getTime();
        }
        case "This Week": {
          const sevenDaysFromNow = new Date(today);
          sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
          return eventDate >= today && eventDate <= sevenDaysFromNow;
        }
        case "Free": {
          // Check if 'free' is in tags, category, or price
          const tags = event.tags?.map((t) => t.toLowerCase()) || [];
          const categories = event.category?.map((c) => c.toLowerCase()) || [];
          const priceStr = String(event.price ?? "").toLowerCase();
          return (
            tags.includes("free") ||
            categories.includes("free") ||
            priceStr === "free" ||
            priceStr === "0"
          );
        }
        default:
          return true;
      }
    });
};

export default filterEvents;
