"use client";

import { useState } from "react";
import { FaCamera, FaSave } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function AccountInfo() {
  const t = useTranslations("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    website: "",
    company: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your save logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("accountInformation")}
        </h1>
        <p className="text-sm text-gray-600">{t("managePersonalInfo")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center sm:items-start">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            {t("profilePhoto")}
          </label>
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden shadow-lg">
              <User className="w-16 h-16 text-gray-500" />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-3 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 group-hover:shadow-xl"
            >
              <FaCamera className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("profileInformation")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label={t("firstName")}
              placeholder={t("enterFirstName")}
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
            />
            <InputField
              label={t("lastName")}
              placeholder={t("enterLastName")}
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
            />
            <InputField
              label={t("website")}
              placeholder={t("enterWebsite")}
              value={formData.website}
              onChange={(value) => handleInputChange("website", value)}
              fullWidth
            />
            <InputField
              label={t("company")}
              placeholder={t("enterCompanyName")}
              value={formData.company}
              onChange={(value) => handleInputChange("company", value)}
              fullWidth
            />
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {t("contactDetails")}
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            {t("contactDetailsDescription")}
          </p>
          <div className="grid grid-cols-1 gap-6">
            <InputField
              label={t("phoneNumber")}
              placeholder={t("enterPhoneNumber")}
              value={formData.phoneNumber}
              onChange={(value) => handleInputChange("phoneNumber", value)}
            />
            <InputField
              label={t("address")}
              placeholder={t("enterAddress")}
              value={formData.address}
              onChange={(value) => handleInputChange("address", value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputField
                label={t("cityTown")}
                placeholder={t("enterCity")}
                value={formData.city}
                onChange={(value) => handleInputChange("city", value)}
              />
              <InputField
                label={t("country")}
                placeholder={t("enterCountry")}
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
              />
              <InputField
                label={t("pincode")}
                placeholder={t("enterPincode")}
                value={formData.pincode}
                onChange={(value) => handleInputChange("pincode", value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-start pt-4">
          <button
            type="submit"
            className="group relative px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaSave className="w-5 h-5" />
              {t("saveMyProfile")}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  fullWidth,
}: InputFieldProps) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white"
      />
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
