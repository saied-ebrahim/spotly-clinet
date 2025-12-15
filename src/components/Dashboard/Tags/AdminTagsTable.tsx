"use client";

import { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/Custom/DataTable";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { CreateTagModal } from "./CreateTagModal";
import { TagDocument } from "@/types/tagInterface";
import axiosInstance from "@/lib/axios";
import { useTranslations, useLocale } from "next-intl";

interface AdminTagsTableProps {
  initialData: TagDocument[];
}

export function AdminTagsTable({ initialData }: AdminTagsTableProps) {
  const t = useTranslations("dashboardAdmin.tags");
  const locale = useLocale();
  const [rowData, setRowData] = useState<TagDocument[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagDocument | null>(null);

  useEffect(() => {
    setRowData(initialData);
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((tag) => tag.name.toLowerCase().includes(lowerTerm));
  }, [rowData, searchTerm]);

  const handleDeleteClick = (tag: TagDocument) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (tag: TagDocument) => {
    setSelectedTag(tag);
    setIsCreateModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTag) {
      axiosInstance.delete(`/tags/${selectedTag._id}`).catch(console.error);
      setRowData((prev) => prev.filter((item) => item._id !== selectedTag._id));
      setIsDeleteModalOpen(false);
      setSelectedTag(null);
    }
  };

  const handleTagCreated = (newTag: TagDocument) => {
    setRowData((prev) => {
      // Check if updating existing tag
      const exists = prev.some((item) => item._id === newTag._id);
      if (exists) {
        return prev.map((item) => (item._id === newTag._id ? newTag : item));
      }
      return [newTag, ...prev];
    });
  };

  const columnDefs: ColDef<TagDocument>[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90, sortable: true, hide: true },
      {
        field: "name",
        headerName: t("columns.tagName"),
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        field: "createdAt",
        headerName: t("columns.createdAt"),
        flex: 1,
        minWidth: 150,
        sortable: true,
        valueFormatter: (params: ValueFormatterParams<TagDocument, string>) => {
          return params.value ? new Date(params.value).toLocaleString() : "";
        },
      },
      {
        headerName: t("columns.actions"),
        width: 100,
        pinned: locale === "ar" ? "left" : "right",
        cellRenderer: (params: { data: TagDocument }) => {
          return (
            <div
              className={`flex items-center gap-2 h-full ${
                locale === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <button
                onClick={() => handleEditClick(params.data)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title={t("edit")}
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDeleteClick(params.data)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title={t("delete")}
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
        <h2 className="text-lg font-bold text-slate-800">{t("title")}</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => {
              setSelectedTag(null);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 transition-colors whitespace-nowrap"
          >
            <FiPlus size={16} />
            <span>{t("createTag")}</span>
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

      <CreateTagModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTagCreated={handleTagCreated}
        tag={selectedTag}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("deleteModal.title")}
        message={t("deleteModal.message", {
          tagName: selectedTag?.name || "Topic",
        })}
        confirmText={t("deleteModal.confirm")}
        cancelText={t("deleteModal.cancel")}
      />
    </div>
  );
}
