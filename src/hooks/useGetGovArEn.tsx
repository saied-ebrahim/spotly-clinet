import { useEffect, useState } from "react";

export const useGetGovArEn = (lang: string = "en") => {
    const [allGovs, setAllGovs] = useState<string[]>([]);
    const key = lang === "ar" ? "city_name_ar" : "city_name_en";
      useEffect(() => {
        fetch(
          "https://raw.githubusercontent.com/Tech-Labs/egypt-governorates-and-cities-db/master/cities.json"
        )
          .then((res) => res.json())
          .then((data) => {
            // Note: This specific dataset returns objects with { "name": "Cairo", ... }
            
            // console.log(data);
            const arr = data[2].data.map(
              (gov: { [key: string]: string }) => gov[key]
            );
            //   setAllGovs(data);
            // console.log(arr);
            setAllGovs(arr);
          });
        // You can use the location data here to fetch events based on user's city
        // console.log(allGovs);
      }, []);
    return allGovs;
}