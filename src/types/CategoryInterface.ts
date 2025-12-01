export interface Category {
  _id: string;
  name: string;
  description?: string;
  events?: string[];
}

export interface CategoryItemInterface {
  name: string;
  image: string;
}

export interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}
