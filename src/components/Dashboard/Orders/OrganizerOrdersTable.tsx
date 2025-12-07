"use client";

import { useState, useMemo } from "react";
import DataTable from "@/components/Custom/DataTable";
import {
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { OrderDocument } from "@/types/orderInterface";
import { FiEye } from "react-icons/fi";
import { ViewOrderModal } from "./ViewOrderModal";

interface OrganizerOrdersTableProps {
  rowData: OrderDocument[];
  loading?: boolean;
}

export function OrganizerOrdersTable({
  rowData,
  loading = false,
}: OrganizerOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderDocument | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewClick = (order: OrderDocument) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((order) => {
      const fullName =
        `${order.userID.firstName} ${order.userID.lastName}`.toLowerCase();
      return fullName.includes(lowerTerm);
    });
  }, [rowData, searchTerm]);

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
        headerName: "Email",
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          return params.data?.userID?.email || "N/A";
        },
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
        sortable: true,
        filter: true,
      },
      {
        field: "quantity",
        headerName: "Qty",
        width: 100,
        sortable: true,
        filter: true,
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
        headerName: "Event",
        valueGetter: (params: ValueGetterParams<OrderDocument>) => {
          return params.data?.eventID?.title || "N/A";
        },
        flex: 2,
        minWidth: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Actions",
        width: 100,
        pinned: "right",
        cellRenderer: (params: { data: OrderDocument }) => {
          return (
            <div className="flex items-center gap-2 h-full">
              <button
                onClick={() => handleViewClick(params.data)}
                className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors"
                title="View Details"
              >
                <FiEye size={16} />
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
        <h2 className="text-lg font-bold text-slate-800">My Orders</h2>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full"
          />
        </div>
      </div>

      <div className="p-4">
        <DataTable
          rowData={filteredData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          loading={loading}
          height={600}
        />
      </div>

      <ViewOrderModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
