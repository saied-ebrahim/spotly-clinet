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
            
            
            const arr = data[2].data.map(
              (gov: { [key: string]: string }) => gov[key]
            );
           
            setAllGovs(arr);
          });
        
      }, []);
    return allGovs;
}