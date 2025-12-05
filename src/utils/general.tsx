export const getImageUrl = (url?: string) => {
  if (!url) return "/event.jpg";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `https://${url}`;
};