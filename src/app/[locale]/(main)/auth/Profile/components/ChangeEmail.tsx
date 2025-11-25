"use client";

import { useState } from "react";
import { FaEnvelope, FaSave, FaCheckCircle } from "react-icons/fa";

export default function ChangeEmail() {
  const [formData, setFormData] = useState({
    currentEmail: "andreagomes@someserver.com",
    newEmail: "",
    confirmEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newEmail !== formData.confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    console.log("Email change submitted:", formData);
    // Add your email change logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Email</h1>
        <p className="text-sm text-gray-600">
          Update your email address for account notifications
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Email */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Current Email
          </label>
          <div className="flex items-center gap-3 text-gray-900">
            <FaEnvelope className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">{formData.currentEmail}</span>
            <FaCheckCircle className="w-5 h-5 text-green-600 ml-auto" />
          </div>
        </div>

        {/* New Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            New Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter new email"
              value={formData.newEmail}
              onChange={(e) => handleInputChange("newEmail", e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white"
            />
          </div>
        </div>

        {/* Confirm Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter again"
              value={formData.confirmEmail}
              onChange={(e) =>
                handleInputChange("confirmEmail", e.target.value)
              }
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white"
            />
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> You will receive a verification email at your
            new address. Please verify it to complete the change.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-start pt-4">
          <button
            type="submit"
            className="group relative px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaSave className="w-5 h-5" />
              Save New Email
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
