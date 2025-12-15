"use client";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axiosInstance from "@/lib/axios";
import { useTranslations } from "next-intl";

const FilterSection = ({
  title,
  options,
  defaultOpen = true,
  onChange,
  selectedFilters = {},
  internalCategory,
  valueMap,
  t,
}: {
  title: string;
  options: string[];
  defaultOpen?: boolean;
  onChange: (category: string, value: string, isChecked: boolean) => void;
  selectedFilters?: Record<string, string[]>;
  internalCategory: string;
  valueMap?: Record<string, string>;
  t: (key: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);

  const displayedOptions = showAll ? options : options.slice(0, 5);
  const hasMore = options.length > 5;
  
  // Helper to check if option is selected
  const isOptionSelected = (option: string) => {
    const internalValues = selectedFilters[internalCategory] || [];
    if (valueMap) {
      // Map displayed option back to internal value
      const internalValue = Object.entries(valueMap).find(([_, display]) => display === option)?.[0];
      return internalValue ? internalValues.includes(internalValue) : false;
    }
    return internalValues.includes(option);
  };

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
                checked={isOptionSelected(option)}
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
              {showAll ? t("showLess") : t("showMore")}
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
  const t = useTranslations("events");
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
        <h2 className="text-lg font-bold text-slate-900">{t("filters")}</h2>
      </div>

      <FilterSection
        title={t("price")}
        options={[t("free"), t("paid")]}
        onChange={(category, value, isChecked) => {
          const internalValue = 
            value === t("free") ? "Free" :
            value === t("paid") ? "Paid" : value;
          onFilterChange("Price", internalValue, isChecked);
        }}
        selectedFilters={selectedFilters}
        internalCategory="Price"
        valueMap={{ "Free": t("free"), "Paid": t("paid") }}
        t={t}
      />
      <FilterSection
        title={t("date")}
        options={[
          t("today"),
          t("tomorrow"),
          t("thisWeek"),
          t("thisWeekend"),
          t("pickDate"),
        ]}
        onChange={(category, value, isChecked) => {
          const internalValue = 
            value === t("today") ? "Today" :
            value === t("tomorrow") ? "Tomorrow" :
            value === t("thisWeek") ? "This Week" :
            value === t("thisWeekend") ? "This Weekend" :
            value === t("pickDate") ? "Pick a Date" : value;
          onFilterChange("Date", internalValue, isChecked);
        }}
        selectedFilters={selectedFilters}
        internalCategory="Date"
        valueMap={{
          "Today": t("today"),
          "Tomorrow": t("tomorrow"),
          "This Week": t("thisWeek"),
          "This Weekend": t("thisWeekend"),
          "Pick a Date": t("pickDate")
        }}
        t={t}
      />
      <FilterSection
        title={t("category")}
        options={categories}
        onChange={(category, value, isChecked) => {
          onFilterChange("Category", value, isChecked);
        }}
        selectedFilters={selectedFilters}
        internalCategory="Category"
        t={t}
      />
      <FilterSection
        title={t("tags")}
        options={tags}
        onChange={(category, value, isChecked) => {
          onFilterChange("Tags", value, isChecked);
        }}
        selectedFilters={selectedFilters}
        internalCategory="Tags"
        t={t}
      />
    </div>
  );
}
