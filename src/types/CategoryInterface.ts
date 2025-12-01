export interface Category {
  _id: string;
  name: string;
  description?: string;
  events?: any[]; // Using any[] for now to avoid circular deps or complex imports, can be refined later
  [key: string]: any;
}

export interface CategoryItemInterface {
  name: string;
  image: string;
}

export interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}
