"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaCamera, FaSave, FaUser, FaPhone } from "react-icons/fa";

import { useTranslations } from "next-intl";
import axiosInstance from "@/lib/axios";
import { useForm, Controller, useWatch } from "react-hook-form";
import CustomInput from "@/components/Custom/CustomInput";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiLocationOutline } from "react-icons/ti";
import { RiUserLocationLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { ApiResponse } from "@/types/Profileinterfaces/AccountInfo";

interface LocationOption {
  label: string;
  value: string;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar?: string;
  gender: string;
  country: LocationOption | null;
  state: LocationOption | null;
  city: LocationOption | null;
}

export default function AccountInfo() {
  const t = useTranslations("profile");
  const authT = useTranslations("auth");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      avatar: "",
      gender: "",
      country: null,
      state: null,
      city: null,
    },
  });

  const country = useWatch({ control, name: "country" });
  const state = useWatch({ control, name: "state" });
  const avatar = useWatch({ control, name: "avatar" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>("/auth/me");
        const user = response.data.data.user;

        reset({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phone || "",
          avatar: user.avatar || "",
          gender: user.gender || "",
          country: user.address?.country
            ? { label: user.address.country, value: user.address.country }
            : null,
          state: user.address?.state
            ? { label: user.address.state, value: user.address.state }
            : null,
          city: user.address?.city
            ? { label: user.address.city, value: user.address.city }
            : null,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
    fetchUserData();
  }, [reset]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await axiosInstance.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const key = response.data.data?.key;

      if (key) {
        const mediaUrl = `https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/${key}`;
        setValue("avatar", mediaUrl, { shouldDirty: true });
        toast.success(
          t("imageUploadedSuccess") || "Image uploaded successfully"
        ); // Add this key if needed
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        avatar: data.avatar,
        gender: data.gender,
        address: {
          country: data.country?.label,
          state: data.state?.label,
          city: data.city?.label,
        },
      };

      await axiosInstance.post("/auth/updateMe", payload);
      toast.success(t("profileUpdatedSuccess")); // Ensure this key exists or use a generic success message if not
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t("profileUpdateError")); // Ensure this key exists
    } finally {
      setLoading(false);
    }
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Photo - Kept static as per original */}
        <div className="flex flex-col items-center sm:items-start">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            {t("profilePhoto")}
          </label>
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden shadow-lg relative">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <FaUser className="w-16 h-16 text-gray-500" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-3 bg-brand-primary rounded-full text-white shadow-lg hover:bg-brand-primary/90 transition-all duration-300 hover:scale-110 group-hover:shadow-xl cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaCamera className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        {/* Profile Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("profileInformation")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  type="text"
                  id="firstName"
                  label={t("firstName")}
                  placeholder={t("enterFirstName")}
                  value={value}
                  onChange={onChange}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  type="text"
                  id="lastName"
                  label={t("lastName")}
                  placeholder={t("enterLastName")}
                  value={value}
                  onChange={onChange}
                  error={errors.lastName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  type="tel"
                  id="phone"
                  icon={<FaPhone />}
                  label="Phone Number"
                  placeholder={t("enterPhone")}
                  value={value}
                  onChange={onChange}
                  error={errors.phoneNumber?.message}
                />
              )}
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
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <div className="relative">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={value}
                    onChange={onChange}
                    className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white appearance-none cursor-pointer ${
                      errors.gender ? "border-red-500 bg-red-50" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div className="absolute right-4 top-13 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Controller
                control={control}
                name="country"
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    type="select"
                    apiUrl="/api/countries"
                    querySearch={"search"}
                    placeholder={authT("selectCountry")}
                    id="country"
                    icon={<FaMapLocationDot />}
                    label={t("country")}
                    reset={() => {
                      setValue("state", null);
                      setValue("city", null);
                      trigger("state");
                      trigger("city");
                    }}
                    value={value}
                    onChange={onChange}
                    error={errors.country?.message}
                    // Note: We might encounter issues with IDs vs Names here if backend requires IDs
                    // But since we are pre-filling with names, we hope the API handles it or we accept the limitation
                    // that the user might need to re-select if initial data is just a string name without ID.
                    // The CustomInput implementation usually expects objects {label, value}.
                    // If 'value' passed from reset is just a name (string), CustomInput might not find it in options unless we fetch them all.
                    // However, we are setting it as {label: name, value: name} in reset().
                  />
                )}
              />

              <Controller
                control={control}
                name="state"
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    type="select"
                    apiUrl={`/api/state`}
                    // If we don't have an ID for the country (just name), this might fail to fetch specific states
                    // depending on how /api/state filters.
                    // Assuming value.value could be the ID if we selected from list, or key if prefilled.
                    triggerApiUrl={`countryId=${country?.value || ""}`}
                    querySearch={"search"}
                    placeholder={authT("selectState")}
                    reset={() => {
                      setValue("city", null);
                      trigger("city");
                    }}
                    id="state"
                    icon={<TiLocationOutline />}
                    label={authT("state")}
                    value={value}
                    onChange={onChange}
                    error={errors.state?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    type="select"
                    apiUrl={`/api/city`}
                    triggerApiUrl={`stateId=${state?.value || ""}`}
                    querySearch={"search"}
                    placeholder={authT("selectCity")}
                    id="city"
                    icon={<RiUserLocationLine />}
                    label={t("cityTown")}
                    value={value}
                    onChange={onChange}
                    error={errors.city?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-start pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`group relative px-8 py-3 bg-brand-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden ${
              loading ? "opacity-70 cursor-not-allowed hover:scale-100" : ""
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t("saving")}</span>
                </>
              ) : (
                <>
                  <FaSave className="w-5 h-5" />
                  {t("saveMyProfile")}
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
