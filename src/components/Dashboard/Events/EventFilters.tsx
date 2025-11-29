"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSection = ({
  title,
  options,
  defaultOpen = true,
  onChange,
}: {
  title: string;
  options: string[];
  defaultOpen?: boolean;
  onChange: (category: string, value: string, isChecked: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {isOpen ? (
          <FiChevronUp className="text-slate-400" />
        ) : (
          <FiChevronDown className="text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`filter-${title}-${option}`}
                name={`filter-${title}`}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                onChange={(e) => onChange(title, option, e.target.checked)}
              />
              <label
                htmlFor={`filter-${title}-${option}`}
                className="ml-3 text-sm text-slate-600"
              >
                {option}
              </label>
            </div>
          ))}
          <button className="text-xs font-medium text-brand-primary hover:underline pt-1">
            More
          </button>
        </div>
      )}
    </div>
  );
};

interface EventFiltersProps {
  onFilterChange: (category: string, value: string, isChecked: boolean) => void;
}

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  return (
    <div className="w-64 shrink-0 pr-8 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
      </div>

      <FilterSection
        title="Price"
        options={["Free", "Paid"]}
        onChange={onFilterChange}
      />
      <FilterSection
        title="Date"
        options={[
          "Today",
          "Tomorrow",
          "This Week",
          "This Weekend",
          "Pick a Date",
        ]}
        onChange={onFilterChange}
      />
      <FilterSection
        title="Category"
        options={[
          "Adventure Travel",
          "Art Exhibitions",
          "Auctions & Fundraisers",
          "Beer Festivals",
          "Benefit Concerts",
        ]}
        onChange={onFilterChange}
      />
      <FilterSection
        title="Format"
        options={[
          "Community Engagement",
          "Concerts & Performances",
          "Conferences",
          "Experiential Events",
          "Festivals & Fairs",
        ]}
        onChange={onFilterChange}
      />
    </div>
  );
}
