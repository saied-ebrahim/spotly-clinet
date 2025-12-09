"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiTag, FiFileText } from "react-icons/fi";
import axiosInstance from "@/lib/axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryDocument } from "@/types/CategoryInterface";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryUpdated: (category: CategoryDocument) => void;
  category: CategoryDocument | null;
}

const editCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

type FormData = yup.InferType<typeof editCategorySchema>;

export function EditCategoryModal({
  isOpen,
  onClose,
  onCategoryUpdated,
  category,
}: EditCategoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(editCategorySchema),
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!category) return;

    try {
      const response = await axiosInstance.patch(
        `/categories/${category._id}`,
        data
      );

      if (response.data.status === "success") {
        onCategoryUpdated(response.data.data.category);
        onClose();
        reset();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Edit Category</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
