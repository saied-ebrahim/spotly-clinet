"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaTrash,
  FaChevronDown,
  FaCheck,
  FaMapMarkerAlt,
  FaMagic,
} from "react-icons/fa";

// Dynamic import for Leaflet map to avoid SSR issues
const LocationSelector = dynamic(
  () => import("@/components/ui/MapLocationSelector"),
  { ssr: false }
);

import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createEventSchema,
  CreateEventSchema,
} from "@/schemas/createEventSchema";
import { useClickOutside } from "@/hooks/useClickOutside";
import { toast } from "react-toastify";

import { category as Category, tags as Tag } from "@/types/eventInterface";
import AIPromptModal from "./AIPromptModal";

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
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Data sources
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  // Refs for click outside
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [organizerName, setOrganizerName] = useState("");
  const [isFree, setIsFree] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateEventSchema>({
    resolver: yupResolver(
      createEventSchema
    ) as unknown as Resolver<CreateEventSchema>,
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: {
        country: "Egypt",
        city: "Cairo",
        district: "",
        address: "",
        latitude: 30.0444,
        longitude: 31.2357,
      },
      media: {
        mediaType: "image",
        mediaUrl: "",
      },
      tags: [],
      category: [],
      isonline: false,
      ticketType: {
        price: 0,
        quantity: 0,
      },
    },
  });

  // Watch values for UI updates
  const selectedCategories = watch("category");
  const selectedTags = watch("tags");
  const currentMedia = watch("media");

  useClickOutside(categoryDropdownRef, () => setIsCategoryDropdownOpen(false));
  useClickOutside(tagDropdownRef, () => setIsTagDropdownOpen(false));

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("/categories");
      if (response.data?.data?.categories) {
        setCategories(response.data.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  }, []);

  const fetchTags = useCallback(async () => {
    try {
      const response = await axios.get("/tags");
      if (response.data?.data?.tags) {
        setAvailableTags(response.data.data.tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Failed to load tags");
    }
  }, []);

  const fetchOrganizerInfo = useCallback(() => {
    const cookie = Cookies.get("sub");
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
              setValue("organizer", userId);
            }
            setOrganizerName(userName);
          }
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchTags();
      fetchOrganizerInfo();
    }
  }, [isOpen, fetchCategories, fetchTags, fetchOrganizerInfo]);

  const handleAIGeneratedData = (data: Partial<CreateEventSchema>) => {
    // Populate form fields
    if (data.title) setValue("title", data.title);
    if (data.description) setValue("description", data.description);
    if (data.date) setValue("date", data.date);
    if (data.time) setValue("time", data.time);

    if (data.location) {
      if (data.location.country)
        setValue("location.country", data.location.country);
      if (data.location.city) setValue("location.city", data.location.city);
      if (data.location.district)
        setValue("location.district", data.location.district);
      if (data.location.address)
        setValue("location.address", data.location.address);
      if (data.location.latitude)
        setValue("location.latitude", data.location.latitude);
      if (data.location.longitude)
        setValue("location.longitude", data.location.longitude);
    }

    if (data.ticketType) {
      setValue("ticketType.price", data.ticketType.price || 0);
      setValue("ticketType.quantity", data.ticketType.quantity || 0);
      if (data.ticketType.price === 0) setIsFree(true);
    }

    if (data.category && Array.isArray(data.category)) {
      setValue("category", data.category);
    }

    if (data.tags && Array.isArray(data.tags)) {
      setValue("tags", data.tags);
    }

    if (data.isonline !== undefined) {
      setValue("isonline", data.isonline);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await axios.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const key = response.data.data?.key;

      if (key) {
        const mediaUrl = `https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/${key}`;
        const mediaType = file.type.startsWith("video") ? "video" : "image";

        setValue("media", { mediaType, mediaUrl }, { shouldValidate: true });
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
    setValue("media", { mediaType: "image", mediaUrl: "" });
  };

  const toggleCategory = (categoryId: string) => {
    const current = selectedCategories || [];
    const isSelected = current.includes(categoryId);

    if (isSelected) {
      setValue(
        "category",
        current.filter((id) => id !== categoryId),
        { shouldValidate: true }
      );
    } else {
      setValue("category", [...current, categoryId], { shouldValidate: true });
    }
  };

  const toggleTag = (tagId: string) => {
    const current = selectedTags || [];
    const isSelected = current.includes(tagId);

    if (isSelected) {
      setValue(
        "tags",
        current.filter((id) => id !== tagId),
        { shouldValidate: true }
      );
    } else {
      setValue("tags", [...current, tagId], { shouldValidate: true });
    }
  };

  const handleClose = () => {
    reset();
    setIsFree(false);
    onClose();
  };

  const onSubmit = async (data: CreateEventSchema) => {
    setLoading(true);
    try {
      const payload: Partial<CreateEventSchema> & { type: string } = {
        ...data,
        type: data.isonline ? "online" : "offline",
      };

      if (data.isonline) {
        delete payload.location;
      }

      await axios.post("/events", payload);
      toast.success("Event created successfully");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900">
              Create New Event
            </h3>
            <button
              type="button"
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-linear-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-lg hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all font-medium border border-brand-primary/20"
            >
              <FaMagic size={12} />
              Auto-Fill with AI
            </button>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AIPromptModal
              isOpen={isAIModalOpen}
              onClose={() => setIsAIModalOpen(false)}
              onGenerate={handleAIGeneratedData}
              categories={categories}
              tags={availableTags}
            />

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
                    {...register("title")}
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.title ? "border-red-500" : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.date ? "border-red-500" : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                  />
                  {errors.date && (
                    <span className="text-red-500 text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    {...register("time")}
                    type="time"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.time ? "border-red-500" : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                  />
                  {errors.time && (
                    <span className="text-red-500 text-sm">
                      {errors.time.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Organizer
                  </label>
                  <div className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-600">
                    {organizerName || "Loading..."}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">
                      Price
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFree}
                        onChange={(e) => {
                          setIsFree(e.target.checked);
                          if (e.target.checked) {
                            setValue("ticketType.price", 0, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Free
                      </span>
                    </label>
                  </div>
                  <input
                    {...register("ticketType.price")}
                    type="number"
                    min="0"
                    readOnly={isFree}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.ticketType?.price
                        ? "border-red-500"
                        : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none ${
                      isFree
                        ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  {errors.ticketType?.price && (
                    <span className="text-red-500 text-sm">
                      {errors.ticketType.price.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Quantity
                  </label>
                  <input
                    {...register("ticketType.quantity")}
                    type="number"
                    min="0"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.ticketType?.quantity
                        ? "border-red-500"
                        : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                  />
                  {errors.ticketType?.quantity && (
                    <span className="text-red-500 text-sm">
                      {errors.ticketType.quantity.message}
                    </span>
                  )}
                </div>

                {/* Categories Dropdown */}
                <div className="relative" ref={categoryDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Categories
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                    className={`w-full px-4 py-2 text-left rounded-lg border ${
                      errors.category ? "border-red-500" : "border-slate-300"
                    } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white flex justify-between items-center`}
                  >
                    <span className="text-slate-700 truncate">
                      {selectedCategories?.length > 0
                        ? `${selectedCategories.length} selected`
                        : "Select categories"}
                    </span>
                    <FaChevronDown
                      className={`text-slate-400 transition-transform ${
                        isCategoryDropdownOpen ? "rotate-180" : ""
                      }`}
                      size={12}
                    />
                  </button>
                  {errors.category && (
                    <span className="text-red-500 text-sm">
                      {errors.category.message}
                    </span>
                  )}

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
                              selectedCategories?.includes(cat._id)
                                ? "bg-brand-primary border-brand-primary text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedCategories?.includes(cat._id) && (
                              <FaCheck size={10} />
                            )}
                          </div>
                          <span className="text-slate-700">{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Categories Chips */}
                  {selectedCategories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCategories.map((catId) => {
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
                      {...register("isonline")}
                      type="checkbox"
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
            {!watch("isonline") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-semibold text-slate-800">Location</h4>
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium flex items-center gap-1"
                  >
                    <FaMapMarkerAlt /> Choose on Map
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      {...register("location.country")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.country
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.country && (
                      <span className="text-red-500 text-sm">
                        {errors.location.country.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      City
                    </label>
                    <input
                      {...register("location.city")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.city
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.city && (
                      <span className="text-red-500 text-sm">
                        {errors.location.city.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      District
                    </label>
                    <input
                      {...register("location.district")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.district
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.district && (
                      <span className="text-red-500 text-sm">
                        {errors.location.district.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <input
                      {...register("location.address")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.address
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.address && (
                      <span className="text-red-500 text-sm">
                        {errors.location.address.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Latitude
                    </label>
                    <input
                      {...register("location.latitude")}
                      type="number"
                      step="any"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.latitude
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.latitude && (
                      <span className="text-red-500 text-sm">
                        {errors.location.latitude.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Longitude
                    </label>
                    <input
                      {...register("location.longitude")}
                      type="number"
                      step="any"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.location?.longitude
                          ? "border-red-500"
                          : "border-slate-300"
                      } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none`}
                    />
                    {errors.location?.longitude && (
                      <span className="text-red-500 text-sm">
                        {errors.location.longitude.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Map Modal Overlay */}
            {isMapModalOpen && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden relative">
                  <LocationSelector
                    onClose={() => setIsMapModalOpen(false)}
                    onLocationSelect={(data) => {
                      setValue("location.country", data.country || "Egypt", {
                        shouldValidate: true,
                      });
                      setValue("location.city", data.city || "", {
                        shouldValidate: true,
                      });
                      setValue("location.district", data.district || "", {
                        shouldValidate: true,
                      });
                      setValue("location.address", data.address || "", {
                        shouldValidate: true,
                      });
                      setValue("location.latitude", data.lat, {
                        shouldValidate: true,
                      });
                      setValue("location.longitude", data.lng, {
                        shouldValidate: true,
                      });
                      setIsMapModalOpen(false);
                      toast.success("Location updated from map!");
                    }}
                  />
                </div>
              </div>
            )}

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
                    accept="image/*,video/*"
                  />
                </div>
                {errors.media?.mediaUrl && (
                  <span className="text-red-500 text-sm">
                    {errors.media.mediaUrl.message}
                  </span>
                )}

                {currentMedia?.mediaUrl && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden">
                      {currentMedia.mediaType === "image" ? (
                        <Image
                          src={currentMedia.mediaUrl}
                          alt="Event Media"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={currentMedia.mediaUrl}
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
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 border-b pb-2">
                Tags
              </h4>
              <div className="relative" ref={tagDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  className={`w-full px-4 py-2 text-left rounded-lg border ${
                    errors.tags ? "border-red-500" : "border-slate-300"
                  } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white flex justify-between items-center`}
                >
                  <span className="text-slate-700 truncate">
                    {selectedTags?.length > 0
                      ? `${selectedTags.length} selected`
                      : "Select tags"}
                  </span>
                  <FaChevronDown
                    className={`text-slate-400 transition-transform ${
                      isTagDropdownOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </button>
                {errors.tags && (
                  <span className="text-red-500 text-sm">
                    {errors.tags.message}
                  </span>
                )}

                {isTagDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <div
                        key={tag._id}
                        onClick={() => toggleTag(tag._id)}
                        className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
                            selectedTags?.includes(tag._id)
                              ? "bg-brand-primary border-brand-primary text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedTags?.includes(tag._id) && (
                            <FaCheck size={10} />
                          )}
                        </div>
                        <span className="text-slate-700">{tag.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Tags Chips */}
                {selectedTags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tagId) => {
                      const tag = availableTags.find((t) => t._id === tagId);
                      return tag ? (
                        <span
                          key={tagId}
                          className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => toggleTag(tagId)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
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
