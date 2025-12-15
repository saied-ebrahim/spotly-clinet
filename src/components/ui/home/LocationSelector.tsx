"use client";
import { useState, useRef, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";

const LocationSelector = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) => {
  const [allGovs, setAllGovs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter cities based on user typing

  // Close dropdown if clicking outside
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Tech-Labs/egypt-governorates-and-cities-db/master/cities.json"
    )
      .then((res) => res.json())
      .then((data) => {
        
        const arr = data[2].data.map(
          (gov: { city_name_en: string }) => gov.city_name_en
        );
        setAllGovs(arr);
      });
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filteredCities = allGovs.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div
      ref={wrapperRef}
      className="relative w-full sm:w-72 font-sans grow m-0 z-20"
    >
      <div className="relative h-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Select Location (e.g. Cairo)"
          className="w-full h-full bg-gray-50 text-gray-900 text-sm font-medium rounded-xl border-0 px-4 py-3 pl-10 shadow-sm placeholder-gray-400 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all outline-none"
        />
        {!query && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiMapPin className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredCities.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full origin-top-right rounded-sm bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto border border-gray-100">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(city);
                setIsOpen(false);
              }}
              className="cursor-pointer select-none px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2"
            >
              <FiMapPin className="w-4 h-4 text-gray-400" />
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;
