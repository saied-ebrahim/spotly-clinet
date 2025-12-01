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
export const getMonthDay = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = date.getDate();
  return { month, date: day };
};
