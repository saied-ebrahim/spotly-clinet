"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { AdminCategoriesTable } from "@/components/Dashboard/Categories/AdminCategoriesTable";
import { CategoryDocument } from "@/types/CategoryInterface";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/categories");
        if (
          response.data.status === "success" &&
          response.data.data?.categories
        ) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Categories Management
        </h1>
        <p className="text-slate-500">Manage event categories</p>
      </div>

      <AdminCategoriesTable initialData={categories} />
    </div>
  );
}
