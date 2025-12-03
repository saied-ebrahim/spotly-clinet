export interface EventDocument {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: location;
  media: MediaItem[];
  tags: string[];
  category: category;
  organizer: string;

  price: string; 
}
interface MediaItem {
  mediaType: "image" | "video" | string; 
  mediaUrl: string;
}
interface location {
  city: string;
  country: string;
  district: string;
}
interface category {
  name: string;
}
