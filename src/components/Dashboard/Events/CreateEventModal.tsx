"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";

interface Category {
  _id: string;
  name: string;
}

interface Location {
  country: string;
  city: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface Media {
  mediaType: "image" | "video";
  mediaUrl: string;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateEventModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [displayTags, setDisplayTags] = useState<
    { id: string; name: string }[]
  >([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        if (response.data?.data?.categories) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();

    // Extract user ID and name from token
    const cookie = Cookies.get("token");
    if (cookie) {
      try {
        const decrypted = decryptData(cookie) as { token?: string };
        if (decrypted?.token) {
          const decodedToken = parseJwt(decrypted.token);
          if (decodedToken) {
            const userId =
              decodedToken.id || decodedToken._id || decodedToken.sub;
            const userName =
              decodedToken.name || decodedToken.unique_name || "User";

            if (userId) {
              setFormData((prev) => ({ ...prev, organizer: userId }));
            }
            setOrganizerName(userName);
          }
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "hybrid",
    location: {
      country: "Egypt",
      city: "Cairo",
      district: "",
      address: "",
      latitude: 30.0444,
      longitude: 31.2357,
    } as Location,
    media: [] as Media[],
    tags: [] as string[],
    category: [] as string[],
    organizer: "",
    isonline: false,
    ticketType: {
      price: 0 as number,
      quantity: 0 as number,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // console.log(name, value, type);

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: type === "number" ? Number(value) : value,
        },
      }));
    } else if (name === "price" || name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        ticketType: {
          ...prev.ticketType,
          [name]: type === "number" ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newMedia: Media[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await axios.post("/upload", uploadFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Extract key from response: data.data.key
        const key = response.data.data?.key;

        if (key) {
          const mediaUrl = `https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/${key}`;

          newMedia.push({
            mediaType: file.type.startsWith("video") ? "video" : "image",
            mediaUrl: mediaUrl,
          });
        } else {
          console.error("Upload response missing key:", response.data);
        }
      }

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, ...newMedia],
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = async () => {
    if (!tagInput.trim()) return;

    try {
      // Post to /tags as requested
      const response = await axios.post("/tags", { name: tagInput });
      // Extract ID based on user provided structure: data.data.tag._id
      const tagId =
        response.data.data?.tag?._id ||
        response.data.tag?._id ||
        response.data._id ||
        response.data.id;

      if (tagId) {
        setDisplayTags((prev) => [...prev, { id: tagId, name: tagInput }]);
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagId],
        }));
        setTagInput("");
      } else {
        console.error("No tag ID returned from backend");
      }
    } catch (error) {
      console.error("Error adding tag:", error);
      alert("Failed to add tag. Please try again.");
    }
  };

  const removeTag = (tagIdToRemove: string) => {
    setDisplayTags((prev) => prev.filter((tag) => tag.id !== tagIdToRemove));
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagIdToRemove),
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => {
      const currentCategories = prev.category;
      const isSelected = currentCategories.includes(categoryId);

      if (isSelected) {
        return {
          ...prev,
          category: currentCategories.filter((id) => id !== categoryId),
        };
      } else {
        return {
          ...prev,
          category: [...currentCategories, categoryId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/events", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h3 className="text-xl font-bold text-slate-900">Create New Event</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 border-b pb-2">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Organizer
                  </label>
                  <div className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-600">
                    {organizerName || "Loading..."}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    name="price"
                    value={formData.ticketType.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    quantity
                  </label>
                  <input
                    required
                    type="number"
                    name="quantity"
                    value={formData.ticketType.quantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Categories
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                    className="w-full px-4 py-2 text-left rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white flex justify-between items-center"
                  >
                    <span className="text-slate-700 truncate">
                      {formData.category.length > 0
                        ? `${formData.category.length} selected`
                        : "Select categories"}
                    </span>
                    <FaChevronDown
                      className={`text-slate-400 transition-transform ${
                        isCategoryDropdownOpen ? "rotate-180" : ""
                      }`}
                      size={12}
                    />
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <div
                          key={cat._id}
                          onClick={() => toggleCategory(cat._id)}
                          className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
                              formData.category.includes(cat._id)
                                ? "bg-brand-primary border-brand-primary text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {formData.category.includes(cat._id) && (
                              <FaCheck size={10} />
                            )}
                          </div>
                          <span className="text-slate-700">{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Categories Chips */}
                  {formData.category.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.category.map((catId) => {
                        const cat = categories.find((c) => c._id === catId);
                        return cat ? (
                          <span
                            key={catId}
                            className="flex items-center gap-1 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm"
                          >
                            {cat.name}
                            <button
                              type="button"
                              onClick={() => toggleCategory(catId)}
                              className="hover:text-red-500"
                            >
                              <FaTimes size={12} />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isonline"
                      checked={formData.isonline}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Is Online?
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 border-b pb-2">
                Location
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="location.district"
                    value={formData.location.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.latitude"
                    value={formData.location.latitude}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.longitude"
                    value={formData.location.longitude}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 border-b pb-2">
                Media
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    <FaCloudUploadAlt />
                    {uploading ? "Uploading..." : "Upload Images/Videos"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>

                {formData.media.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.media.map((item, index) => (
                      <div
                        key={index}
                        className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden"
                      >
                        {item.mediaType === "image" ? (
                          <img
                            src={item.mediaUrl}
                            alt={`Media ${index}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={item.mediaUrl}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 border-b pb-2">
                Tags
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-2 bg-brand-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => removeTag(tag.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="px-6 py-2 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
