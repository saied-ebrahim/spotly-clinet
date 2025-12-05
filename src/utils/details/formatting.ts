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

export const formatTime = (timeString: string) => {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString; // Convert to number
  return (hour % 12 || 12).toString().padStart(2, "0") + // Convert to 12h & pad zero
         ":" + minute + 
         (hour < 12 ? "am" : "pm");
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
