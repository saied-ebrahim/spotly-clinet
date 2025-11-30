import { useParams } from "next/navigation";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function useFilter<T>(
  url: string,
  callback: (item: T) => boolean
): [T[], Dispatch<SetStateAction<T[]>>] {
  const [items, setItems] = useState<T[]>([]);
  const { dynamicRouteParams } = useParams(); // name the dynamic route params

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: T[]) => {
        const filteredItems = data.filter(callback);
        setItems(filteredItems);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, [dynamicRouteParams, url, callback]);

  return [items, setItems];
}
