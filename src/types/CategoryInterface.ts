import { EventDocument } from "./eventInterface";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  events?: string[];
}

export interface CategoryDocument {
  _id: string;
  name: string;
  description: string;
  image: string;
  events: EventDocument[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryItemInterface {
  name: string;
  image: string;
}

export interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}
