"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import DataTable from "@/components/Custom/DataTable";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { EditEventModal } from "./EditEventModal";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { EventDocument } from "@/types/eventInterface";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

interface Pagination {
  totalPages: number;
  currentPage: number;
  totalEvents: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface AdminEventsTableProps {
  rowData: EventDocument[];
  loading?: boolean;
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export function AdminEventsTable({
  rowData,
  loading = false,
  pagination,
  onPageChange,
}: AdminEventsTableProps) {
  const t = useTranslations("eventsTable");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDocument | null>(
    null
  );

  const handleEditClick = (event: EventDocument) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event: EventDocument) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEvent = (): void => {
    // Optimistic update handled by parent refresh usually, but here we can't easily update parent state without callback
    // Ideally we assume parent fetches new data or we just close modal.
    // Given the props flow, we might need a refresh callback prop, but for now strict UI update locally or just close.
    // Since rowData comes from parent, we can't setRowData here.
    // For now, let's just close modal. The page might need to refetch.
    setIsEditModalOpen(false);
    setSelectedEvent(null);
    // Trigger a refresh would be better, but let's assume the user will reload or we add a refresh prop later if needed.
    // Or we could call onPageChange(pagination.currentPage) to refresh?
    if (pagination) {
      onPageChange(pagination.currentPage);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedEvent) {
      try {
        await axiosInstance.delete(`/events/${selectedEvent._id}`);
        toast.success("Event deleted successfully");
        setIsDeleteModalOpen(false);
        setSelectedEvent(null);
        if (pagination) {
          onPageChange(pagination.currentPage);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
      }
    }
  };

  const locale = useLocale();

  const columnDefs: ColDef<EventDocument>[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: t("id"),
        width: 70,
        sortable: true,
        hide: true,
      },
      {
        headerName: t("image"),
        field: "media.mediaUrl",
        width: 100,
        cellRenderer: (params: { data: EventDocument }) => {
          const imageUrl = params.data.media?.mediaUrl;
          return (
            <div className="flex items-center justify-center h-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={params.data.title}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  N/A
                </div>
              )}
            </div>
          );
        },
      },
      {
        field: "title",
        headerName: t("title"),
        flex: 2,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: t("category"),
        field: "category",
        valueGetter: (params: ValueGetterParams<EventDocument>) => {
          return params.data?.category?.map((cat) => cat.name).join(", ") || "";
        },
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "date",
        headerName: t("date"),
        flex: 1,
        minWidth: 120,
        sortable: true,
        valueFormatter: (params) => {
          return params.value ? params.value.split("T")[0] : "";
        },
      },
      {
        field: "time",
        headerName: t("time"),
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      {
        field: "ticketType.price",
        headerName: t("price"),
        width: 100,
        sortable: true,
      },
      {
        headerName: t("actions"),
        width: 120,
        pinned: locale === "ar" ? "left" : "right",
        cellRenderer: (params: { data: EventDocument }) => {
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
                <FiEdit2 size={16} />
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
    [t, locale]
  );

  const gridHeight = useMemo(() => {
    // Auto-height calculation
    const ROW_HEIGHT = 52;
    const HEADER_HEIGHT = 48;
    const BUFFER = 20; // extra buffer
    const calculated =
      (rowData?.length || 0) * ROW_HEIGHT + HEADER_HEIGHT + BUFFER;
    return Math.max(calculated, 400); // Minimum height logic
  }, [rowData]);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-left">
      <div className="p-0">
        <DataTable
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={false} // We handle pagination externally
          loading={loading}
          height={gridHeight}
        />
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="px-4 py-3 border-t border-slate-200 bg-[#f8fafc] flex items-center justify-between text-sm text-[#475569]">
          <div>
            Page{" "}
            <span className="font-semibold text-slate-900">
              {pagination.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {pagination.totalPages}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage || loading}
              className="px-3 py-1.5 rounded-md border border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f1f5f9] hover:border-[#94a3b8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage || loading}
              className="px-3 py-1.5 rounded-md border border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f1f5f9] hover:border-[#94a3b8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
