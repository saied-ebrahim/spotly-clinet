"use client";

import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";



interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEvent: EventDocument) => void;
  event: EventDocument | null;
}

export function EditEventModal({
  isOpen,
  onClose,
  onSave,
  event,
}: EditEventModalProps) {
  const [formData, setFormData] = useState<EventDocument | null>(event);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      axiosInstance.patch(`/events/${formData._id}`, formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Edit Event</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              name="location"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.ticketType.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category[0].name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
