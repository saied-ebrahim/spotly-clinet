import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFind<T>(
  url: string,
  callback: (item: T) => boolean
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [item, setItem] = useState<T | undefined>(undefined);
  const { dynamicRouteParams } = useParams(); // name the dynamic route params

  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch(url)
      .then((res) => res.json())
      .then((data: T[]) => {
        const itms = data.find(callback);
        setItem(itms);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
      });
  }, [dynamicRouteParams, url, callback]);

  return [item, setItem];
}
