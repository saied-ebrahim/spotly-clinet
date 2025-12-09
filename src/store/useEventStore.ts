import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";

interface EventState {
  events: EventDocument[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
}

const useEventStore = create<EventState>((set) => ({
  events: [],
  isLoading: false, // Start false, or true if you want immediate loading? Usually false until fetch is called.
  error: null,
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/events");
      // Adjust this based on your API response structure: res.data.data.events
      const eventsData = response.data.data.events;
      set({ events: eventsData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch events:", error);
      let errorMessage = "Failed to fetch events";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));

export default useEventStore;
