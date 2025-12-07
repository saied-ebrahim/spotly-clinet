"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FiX,
  FiTag,
  FiFileText,
  FiImage,
  FiTrash,
  FiCloud,
} from "react-icons/fi";
import axiosInstance from "@/lib/axios";
import { CategoryDocument } from "@/types/categoryInterface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { toast } from "react-toastify";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySaved: (category: CategoryDocument) => void;
  category: CategoryDocument | null; // If null, it's create mode
}

const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image is required"),
});

type FormData = yup.InferType<typeof categorySchema>;

export function CategoryModal({
  isOpen,
  onClose,
  onCategorySaved,
  category,
}: CategoryModalProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const currentImage = watch("image");

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setValue("name", category.name);
        setValue("description", category.description);
        setValue("image", category.image);
      } else {
        reset({
          name: "",
          description: "",
          image: "",
        });
      }
    }
  }, [isOpen, category, setValue, reset]);

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
        const imageUrl = `https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/${key}`;
        setValue("image", imageUrl, { shouldValidate: true });
      } else {
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

  const onSubmit = async (data: FormData) => {
    try {
      let response;
      if (category) {
        // Update
        response = await axiosInstance.patch(
          `/categories/${category._id}`,
          data
        );
      } else {
        // Create
        response = await axiosInstance.post("/categories", data);
      }

      if (response.data.status === "success") {
        onCategorySaved(response.data.data.category);
        onClose();
        reset();
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <h3 className="text-lg font-bold text-slate-800">
            {category ? "Edit Category" : "Create New Category"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FiImage className="text-brand-primary" />
                Category Image
              </label>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    <FiCloud />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                {currentImage && (
                  <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={currentImage}
                      alt="Category Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setValue("image", "", { shouldValidate: true })
                      }
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                    >
                      <FiTrash size={14} />
                    </button>
                  </div>
                )}
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FiTag className="text-brand-primary" />
                Category Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g., Technology"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FiFileText className="text-brand-primary" />
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Category description..."
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-slate-100 mt-6 -mb-6 p-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="px-6 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {category ? "Saving..." : "Creating..."}
                  </>
                ) : category ? (
                  "Save Changes"
                ) : (
                  "Create Category"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
