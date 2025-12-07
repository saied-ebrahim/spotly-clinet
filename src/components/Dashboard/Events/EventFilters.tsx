"use client";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axiosInstance from "@/lib/axios";

const FilterSection = ({
  title,
  options,
  defaultOpen = true,
  onChange,
  selectedFilters = {},
}: {
  title: string;
  options: string[];
  defaultOpen?: boolean;
  onChange: (category: string, value: string, isChecked: boolean) => void;
  selectedFilters?: Record<string, string[]>;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);

  const displayedOptions = showAll ? options : options.slice(0, 5);
  const hasMore = options.length > 5;

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
          {displayedOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`filter-${title}-${option}`}
                name={`filter-${title}`}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                onChange={(e) => onChange(title, option, e.target.checked)}
                checked={selectedFilters[title]?.includes(option) || false}
              />
              <label
                htmlFor={`filter-${title}-${option}`}
                className="ml-3 text-sm text-slate-600"
              >
                {option}
              </label>
            </div>
          ))}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-medium text-brand-primary hover:underline pt-1"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface EventFiltersProps {
  onFilterChange: (category: string, value: string, isChecked: boolean) => void;
  selectedFilters?: Record<string, string[]>;
}

export function EventFilters({
  onFilterChange,
  selectedFilters = {},
}: EventFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((data) => {
        const categoryNames = data.data.data.categories.map(
          (cat: { name: string }) => cat.name
        );
        setCategories(categoryNames);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });

    // Fetch Tags
    axiosInstance
      .get("/tags")
      .then((data) => {
        const tagNames = data.data.data.tags.map(
          (tag: { name: string }) => tag.name
        );
        setTags(tagNames);
      })
      .catch((err) => {
        console.error("Error fetching tags:", err);
        setTags([]);
      });
  }, []);

  return (
    <div className="w-64 shrink-0 pr-8 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
      </div>

      <FilterSection
        title="Price"
        options={["Free", "Paid"]}
        onChange={onFilterChange}
        selectedFilters={selectedFilters}
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
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Category"
        options={categories}
        onChange={onFilterChange}
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Tags"
        options={tags}
        onChange={onFilterChange}
        selectedFilters={selectedFilters}
      />
    </div>
  );
}
