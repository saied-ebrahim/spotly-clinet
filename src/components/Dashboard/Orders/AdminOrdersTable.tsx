"use client";

import { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/Custom/DataTable";
import {
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { FiTrash2, FiEye } from "react-icons/fi";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { OrderDocument } from "@/types/orderInterface";
import { ViewOrderModal } from "./ViewOrderModal";
import { useTranslations, useLocale } from "next-intl";

interface AdminOrdersTableProps {
  initialData: OrderDocument[];
  loading?: boolean;
}

export function AdminOrdersTable({
  initialData,
  loading,
}: AdminOrdersTableProps) {
  const t = useTranslations("dashboardAdmin.orders");
  const locale = useLocale();
  const [rowData, setRowData] = useState<OrderDocument[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDocument | null>(
    null
  );

  useEffect(() => {
    setRowData(initialData);
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter(
      (order) =>
        order.userID.email.toLowerCase().includes(lowerTerm) ||
        `${order.userID.firstName} ${order.userID.lastName}`
          .toLowerCase()
          .includes(lowerTerm)
    );
  }, [rowData, searchTerm]);

  const handleDeleteClick = (order: OrderDocument) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleViewClick = (order: OrderDocument) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      // Optimistic delete
      setRowData((prev) =>
        prev.filter((item) => item._id !== selectedOrder._id)
      );
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const columnDefs: ColDef<OrderDocument>[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90, sortable: true, hide: true },
      {
        headerName: t("columns.customer"),
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          const user = params.data?.userID;
          return user ? `${user.firstName} ${user.lastName}` : t("na");
        },
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "userID.email",
        headerName: t("columns.email"),
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: t("columns.location"),
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          const addr = params.data?.userID?.address;
          return addr ? `${addr.city || "-"}, ${addr.country || "-"}` : t("na");
        },
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "quantity",
        headerName: t("columns.qty"),
        width: 80,
        sortable: true,
        filter: true,
      },
      {
        field: "totalAfterDiscount",
        headerName: t("columns.total"),
        width: 100,
        sortable: true,
        valueFormatter: (
          params: ValueFormatterParams<OrderDocument, number>
        ) => {
          return params.value != null && params.value > 0
            ? `$${params.value}`
            : t("free");
        },
      },
      {
        field: "createdAt",
        headerName: t("columns.date"),
        flex: 1,
        minWidth: 150,
        sortable: true,
        valueFormatter: (
          params: ValueFormatterParams<OrderDocument, string>
        ) => {
          return params.value
            ? new Date(params.value).toLocaleDateString()
            : "";
        },
      },
      {
        headerName: t("columns.event"),
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          return params.data?.eventID?.title || t("na");
        },
        flex: 2,
        minWidth: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: t("columns.actions"),
        width: 100,
        pinned: locale === "ar" ? "left" : "right",
        cellRenderer: (params: { data: OrderDocument }) => {
          return (
            <div
              className={`flex items-center gap-2 h-full ${
                locale === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <button
                onClick={() => handleViewClick(params.data)}
                className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors"
                title={t("view")}
              >
                <FiEye size={16} />
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
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full sm:w-64"
        />
      </div>

      <div className="p-4">
        <DataTable
          rowData={filteredData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          height={600}
          installLoading={loading}
        />
      </div>

      <ViewOrderModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("deleteModal.title")}
        message={t("deleteModal.message")}
        confirmText={t("deleteModal.confirm")}
        cancelText={t("deleteModal.cancel")}
      />
    </div>
  );
}
