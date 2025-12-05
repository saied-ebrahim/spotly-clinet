export const getImageUrl = (url?: string) => {
  if (!url) return "/events.json";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `https://${url}`;
};