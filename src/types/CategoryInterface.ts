export interface CategoryItemInterface {
  title: string;
  media: MediaItem[];
}

export interface MediaItem {
  mediaType: "image" | "video" | string;
  mediaUrl: string;
}
