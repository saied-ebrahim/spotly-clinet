export const formatDate = (isoDate?: string) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPrice = (price?: number | string) => {
  if (price === 0 || price === "0") return "FREE";
  return `EGP ${price}`;
};
