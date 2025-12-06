"use client";

import { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/Custom/DataTable";
import {
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { OrderDocument } from "@/types/orderInterface";
import axiosInstance from "@/lib/axios";

interface AdminOrdersTableProps {
  initialData: OrderDocument[];
}

export function AdminOrdersTable({ initialData }: AdminOrdersTableProps) {
  const [rowData, setRowData] = useState<OrderDocument[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      // Optimistic delete or calling API if available
      // For now, removing from UI to simulate deletion as requested "display all orders"
      // If there is an endpoint like DELETE /orders/:id, we should use it.
      // Assuming /orders/:id based on standard REST, but will comment out since user didn't specify.

      // axiosInstance.delete(`/orders/${selectedOrder._id}`);
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
        headerName: "Customer",
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          const user = params.data?.userID;
          return user ? `${user.firstName} ${user.lastName}` : "N/A";
        },
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "userID.email",
        headerName: "Email",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Location",
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          const addr = params.data?.userID?.address;
          return addr ? `${addr.city || "-"}, ${addr.country || "-"}` : "N/A";
        },
        flex: 1,
        minWidth: 150,
      },
      {
        field: "quantity",
        headerName: "Qty",
        width: 100,
        sortable: true,
      },
      {
        field: "totalAfterDiscount",
        headerName: "Total",
        width: 120,
        sortable: true,
        valueFormatter: (
          params: ValueFormatterParams<OrderDocument, number>
        ) => {
          return params.value != null ? `$${params.value.toFixed(2)}` : "";
        },
      },
      {
        field: "createdAt",
        headerName: "Date",
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
        headerName: "Actions",
        width: 100,
        pinned: "right",
        cellRenderer: (params: { data: OrderDocument }) => {
          return (
            <div className="flex items-center gap-2 h-full">
              <button
                onClick={() => handleDeleteClick(params.data)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">All Orders</h2>
        <input
          type="text"
          placeholder="Search orders..."
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
        />
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Order"
        message={`Are you sure you want to delete this order? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
