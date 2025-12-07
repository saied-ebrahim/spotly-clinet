"use client";

import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { useState, useRef } from "react";
import { FaTimes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      // Use the same upload endpoint as CreateEventModal
      // Assuming axiosInstance is configured with base URL, but upload might need specific handling
      // CreateEventModal uses axios from "@/lib/axios" which is likely the same instance
      const response = await axiosInstance.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const key = response.data.data?.key;

      if (key) {
        const mediaUrl = `https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/${key}`;
        const mediaType = file.type.startsWith("video") ? "video" : "image";

        setFormData((prev) =>
          prev
            ? {
                ...prev,
                media: { mediaType, mediaUrl },
              }
            : null
        );
      } else {
        console.error("Upload response missing key:", response.data);
        toast.error("Upload failed: Invalid response");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeMedia = () => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            media: { mediaType: "image", mediaUrl: "" },
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Construct payload with only the fields present in the form
      // Ensure ticketType is clean and price is a number
      const payload = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        // Conditionally include location only for offline events
        ...(formData.type !== "online" && {
          location: {
            city: formData.location?.city || "",
            country: formData.location?.country || "",
            address: formData.location?.address || "",
            district: formData.location?.district || "",
            latitude: formData.location?.latitude || 0,
            longitude: formData.location?.longitude || 0,
          },
        }),
        ticketType: {
          price: Number(formData.ticketType.price),
          quantity: Number(formData.ticketType.quantity || 0),
        },
        media: formData.media,
        // Ensure category is sent as ID if it's an object, or keep as is if backend handles it.
        // Based on typical patterns, sending ID is safer for updates.
        category: formData.category.map((cat) => cat._id || cat),
      };

      try {
        await axiosInstance.patch(`/events/${formData._id}`, payload);
        onSave(formData);
        onClose();
        toast.success("Event updated successfully");
      } catch (error) {
        console.error("Error updating event:", error);
        toast.error("Failed to update event");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Edit Event</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Event Media
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 text-sm"
                  >
                    <FaCloudUploadAlt />
                    {uploading ? "Uploading..." : "Change Image/Video"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*"
                  />
                </div>

                {formData.media?.mediaUrl && (
                  <div className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden w-full max-w-[200px]">
                    {formData.media.mediaType === "image" ? (
                      <img
                        src={formData.media.mediaUrl}
                        alt="Event Media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={formData.media.mediaUrl}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={removeMedia}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

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
                  type="date"
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
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {formData.type !== "online" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="location.country"
                      value={formData.location?.country || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                location: {
                                  ...prev.location,
                                  country: e.target.value,
                                  city: prev.location?.city || "",
                                  address: prev.location?.address || "",
                                  district: prev.location?.district || "",
                                  latitude: prev.location?.latitude || 0,
                                  longitude: prev.location?.longitude || 0,
                                },
                              }
                            : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="location.city"
                      value={formData.location?.city || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                location: {
                                  ...prev.location,
                                  city: e.target.value,
                                  // Ensure other required fields exist to satisfy TS if needed
                                  country: prev.location?.country || "",
                                  address: prev.location?.address || "",
                                  district: prev.location?.district || "",
                                  latitude: prev.location?.latitude || 0,
                                  longitude: prev.location?.longitude || 0,
                                },
                              }
                            : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location?.address || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                location: {
                                  ...prev.location,
                                  address: e.target.value,
                                  // Ensure other required fields exist to satisfy TS if needed
                                  country: prev.location?.country || "",
                                  city: prev.location?.city || "",
                                  district: prev.location?.district || "",
                                  latitude: prev.location?.latitude || 0,
                                  longitude: prev.location?.longitude || 0,
                                },
                              }
                            : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                      placeholder="Address"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      name="location.district"
                      value={formData.location?.district || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                location: {
                                  ...prev.location,
                                  district: e.target.value,
                                  // Ensure other required fields exist to satisfy TS if needed
                                  country: prev.location?.country || "",
                                  city: prev.location?.city || "",
                                  address: prev.location?.address || "",
                                  latitude: prev.location?.latitude || 0,
                                  longitude: prev.location?.longitude || 0,
                                },
                              }
                            : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                      placeholder="District"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.ticketType.price}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev
                        ? {
                            ...prev,
                            ticketType: {
                              ...prev.ticketType,
                              price: Number(e.target.value),
                            },
                          }
                        : null
                    )
                  }
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
                  value={formData.category[0]?.name || ""}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
