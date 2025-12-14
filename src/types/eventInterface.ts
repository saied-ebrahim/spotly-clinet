export interface EventDocument {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  createdAt: string;
  type: string;
  location: location;
  media: MediaItem;
  tags: tags[];
  category: category[];
  organizer: organizer;
  ticketType: ticket;
  analytics: analytics;
}

interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}

interface location {
  city: string;
  address: string;
  country?: string;
  district: string;
  latitude: number;
  longitude: number;
}

export interface category {
  _id: string;
  name: string;
}

interface organizer {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface ticket {
  ticketID?: string;
  title?: string;
  price: number;
  quantity?: number;
  discount?: number;
}

interface analytics {
  ticketsSold: number;
  ticketsAvailable: number;
  totalRevenue: number;
  waitingListCount: number;
  likes: number;
  dislikes: number;
}

export interface tags {
  _id: string;
  name: string;
}
