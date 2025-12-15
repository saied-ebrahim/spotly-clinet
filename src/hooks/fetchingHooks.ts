import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { create } from "zustand";

interface OneEventState {
  event: EventDocument | null;
  isLoading: boolean;
  error: string | null;
  fetchEvent: (eventId: string) => Promise<void>;
}

interface GenericState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (url: string, keyName: string) => Promise<void>;
  reset: () => void;
}



 const useDataStore = <T>() => create<GenericState<T>>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchData: async (url: string, keyName: string) => {
    const currentData = get().data;
    // Fix: Simple check to see if data is already loaded
    if (currentData !== null) return; 

    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(url);
      set({ data: response.data.data[keyName], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  reset: () => set({ data: null, error: null, isLoading: false }),
}));


const useOneEventStore = create<OneEventState>((set) => ({
  event: null,
  isLoading: false, // Start false, or true if you want immediate loading? Usually false until fetch is called.
  error: null,
  fetchEvent: async (eventId: string) => {
    // Simple caching: if events exist, don't refetch automatically.
    // NOTE: In a real app, you might want a forceRefresh param or TTL.
    const currentEvent = useOneEventStore.getState().event;
    if (currentEvent && currentEvent._id === eventId) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/events/${eventId}`);
      // Adjust this based on your API response structure: res.data.data.events
      const eventsData = response.data.data.events;
      set({ event: eventsData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch event:", error);
      let errorMessage = "Failed to fetch event";
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
export{useDataStore,useOneEventStore}
