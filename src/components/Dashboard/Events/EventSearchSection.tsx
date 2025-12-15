import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface EventSearchSectionProps {
  onSearchChange: (query: string) => void;
}

export function EventSearchSection({
  onSearchChange,
}: EventSearchSectionProps) {
  const t = useTranslations("events");
  return (
    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-8 bg-slate-800 flex flex-col items-center justify-center px-4">
      {/* Background Image Placeholder - User will add image here */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-900 to-slate-800 opacity-90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          {t("exploreTitle")}
        </h1>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl bg-white rounded-lg p-2 flex items-center shadow-lg">
          {/* Search Input */}
          <div className="flex-1 flex items-center px-4 py-2 w-full">
            <FiSearch className="text-slate-400 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full outline-none text-slate-700 placeholder:text-slate-400"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Location Dropdown */}
          <div className="flex-1 flex items-center px-4 py-2 w-full">
            <FiMapPin className="text-slate-400 w-5 h-5 mr-3" />
            <div className="relative w-full">
              <select
                className="w-full appearance-none outline-none text-slate-700 bg-transparent cursor-pointer"
                defaultValue=""
                onChange={(e) => onLocationChange(e.target.value)}
              >
                <option value="" disabled>
                  {t("selectLocation")}
                </option>
                <option value="cairo">Cairo</option>
                <option value="alexandria">Alexandria</option>
                <option value="giza">Giza</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                <FiChevronDown className="text-slate-400 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Search Button (Optional, if needed to trigger search explicitly, otherwise inputs can be enough) */}
          {/* <button className="bg-brand-primary text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
            Search
          </button> */}
        </div>
      </div>
    </div>
  );
}
