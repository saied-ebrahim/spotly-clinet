export interface EventObject {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 date string (e.g., "2024-01-15T10:30:00Z")
  time: string;
  month: string;
  location: Location;
  media: MediaItem[];
  analytics: Analytics;
  tags: string[];
  category: string[];
  organizer: string;
  type: "online" | "offline" | "hybrid";
  price: number | string;
}

export interface Location {
  country: string;
  city: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}

export interface Analytics {
  ticketsSold: number;
  ticketsAvailable: number;
  totalRevenue: number;
  waitingListCount: number;
  likes: number;
  dislikes: number;
}

// interface UserAddressProps extends UserProps {
//   // Adds new properties specific to this interface
//   street: string;
//   zipCode: string;
// }

export interface PaginationEventsProps {
  itemsPerPage: number;
  allEvents: EventObject[];
  // Add any other fields your event objects have
}

export interface PaginationProps extends PaginationEventsProps {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  // Add any other fields your event objects have
}
