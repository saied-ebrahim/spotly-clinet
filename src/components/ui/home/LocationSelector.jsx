"use client";
import { useState, useRef, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";

const LocationSelector = ({ location }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allGovs, setAllGovs] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Tech-Labs/egypt-governorates-and-cities-db/master/cities.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // Note: This specific dataset returns objects with { "name": "Cairo", ... }

        // console.log(data[2].data);
        const arr = data[2].data.map((gov) => gov.city_name_en);
        //   setAllGovs(data);
        setAllGovs(arr);
      });
    // You can use the location data here to fetch events based on user's city
  }, []);
  // The data
  const governorates = [
    "Cairo",
    "Mansoura",
    "Tanta",
    "Sohag",
    "Alexandria",
    "Giza",
    "Luxor",
  ];

  // Filter items based on user typing
  const filteredItems = allGovs?.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full sm:w-72 font-sans grow m-0">
      {/* 1. The Input Field */}
      {/* <div className="relative"> */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        // Simple delay to allow clicking an item before blur hides the list
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={"ex: " + location || "Event location"}
        className="w-full h-full bg-gray-50 text-gray-900 text-sm font-medium rounded-xl border-0 px-4 py-3 pl-10 shadow-sm placeholder-gray-400 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all outline-none"
      />

      {/* Map Pin Icon (Absolute positioned inside input) */}
      {!query && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiMapPin className="w-5 h-5 text-gray-400" size={20} />
        </div>
      )}
      {/* </div> */}

      {isOpen && filteredItems?.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
          {filteredItems.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(city);
                setIsOpen(false);
              }}
              className="cursor-pointer select-none px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {/* 3. Empty State (Optional) */}
      {isOpen && query && filteredItems.length === 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg p-4 text-sm text-gray-500 text-center border border-gray-100">
          No location found.
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
