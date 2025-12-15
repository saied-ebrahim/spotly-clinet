"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import DataTable from "@/components/Custom/DataTable";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { CategoryModal } from "./CategoryModal";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { CategoryDocument } from "@/types/CategoryInterface";
import { useLocale } from "next-intl";

interface AdminCategoriesTableProps {
  initialData: CategoryDocument[];
}

export function AdminCategoriesTable({
  initialData,
}: AdminCategoriesTableProps) {
  const t = useTranslations('dashboardAdmin.categories');
  const [rowData, setRowData] = useState<CategoryDocument[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDocument | null>(null);

  useEffect(() => {
    setRowData(initialData);
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((cat) => cat.name.toLowerCase().includes(lowerTerm));
  }, [rowData, searchTerm]);

  const handleDeleteClick = (category: CategoryDocument) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (category: CategoryDocument) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      axiosInstance
        .delete(`/categories/${selectedCategory._id}`)
        .catch(console.error);
      setRowData((prev) =>
        prev.filter((item) => item._id !== selectedCategory._id)
      );
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleCategorySaved = (savedCategory: CategoryDocument) => {
    setRowData((prev) => {
      const exists = prev.some((item) => item._id === savedCategory._id);
      if (exists) {
        return prev.map((item) =>
          item._id === savedCategory._id ? savedCategory : item
        );
      }
      return [savedCategory, ...prev]; // Add new category to top
    });
  };

  const locale = useLocale();

  const columnDefs: ColDef<CategoryDocument>[] = useMemo(
    () => [
      { field: "_id", headerName: t('id'), width: 90, sortable: true, hide: true },
      {
        field: "image",
        headerName: t('image'),
        width: 100,
        sortable: false,
        cellRenderer: (params: { data: CategoryDocument }) => {
          if (!params.data?.image) return null;
          return (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={params.data.image}
                alt={params.data.name}
                fill
                className="object-cover"
              />
            </div>
          );
        },
      },
      {
        field: "name",
        headerName: t('name'),
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "description",
        headerName: t('description'),
        flex: 2,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        field: "createdAt",
        headerName: t('createdAt'),
        flex: 1,
        minWidth: 150,
        sortable: true,
        valueFormatter: (
          params: ValueFormatterParams<CategoryDocument, string>
        ) => {
          return params.value ? new Date(params.value).toLocaleString() : "";
        },
      },
      {
        headerName: t('actions'),
        width: 100,
        pinned: locale === "ar" ? "left" : "right",
        cellRenderer: (params: { data: CategoryDocument }) => {
          return (
            <div
              className={`flex items-center gap-2 h-full ${
                locale === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <button
                onClick={() => handleEditClick(params.data)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title={t('edit')}
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDeleteClick(params.data)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title={t('delete')}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    [locale, t]
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">{t('allCategories')}</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full sm:w-64"
            />
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 transition-colors whitespace-nowrap"
          >
            <FiPlus size={16} />
            <span>{t('createCategory')}</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <DataTable
          rowData={filteredData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          height={600}
        />
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategorySaved={handleCategorySaved}
        category={selectedCategory}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('deleteCategory')}
        message={t('deleteMessage').replace('{name}', selectedCategory?.name || '')}
        confirmText={t('confirmDelete')}
        cancelText={t('cancel')}
      />
    </div>
  );
}
