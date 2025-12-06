"use client";

import { useState, useMemo } from "react";
import DataTable from "@/components/Custom/DataTable";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { SoldProduct } from "@/types/soldProduct";

interface SoldProductsTableProps {
  rowData: SoldProduct[];
  loading?: boolean;
}

export function SoldProductsTable({
  rowData,
  loading = false,
}: SoldProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((order) => {
      // Search by ID, Ticket Type ID, or User Name
      const userName =
        `${order.userID?.firstName} ${order.userID?.lastName}`.toLowerCase();
      return (
        order._id.toLowerCase().includes(lowerTerm) ||
        order.ticketTypeID.toLowerCase().includes(lowerTerm) ||
        userName.includes(lowerTerm)
      );
    });
  }, [rowData, searchTerm]);

  const columnDefs: ColDef<SoldProduct>[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: "Order ID",
        width: 220,
        sortable: true,
        filter: true,
      },
      {
        headerName: "User",
        field: "userID",
        valueGetter: (params: ValueGetterParams<SoldProduct>) => {
          if (!params.data?.userID) return "N/A";
          return `${params.data.userID.firstName} ${params.data.userID.lastName}`;
        },
        width: 220,
        sortable: true,
        filter: true,
      },
      {
        field: "ticketTypeID",
        headerName: "Ticket Type ID",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
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
        valueFormatter: (params: ValueFormatterParams<SoldProduct, number>) => {
          return params.value != null ? `$${params.value.toFixed(2)}` : "";
        },
      },
      {
        field: "createdAt",
        headerName: "Date",
        flex: 1,
        minWidth: 150,
        sortable: true,
        valueFormatter: (params: ValueFormatterParams<SoldProduct, string>) => {
          return params.value ? new Date(params.value).toLocaleString() : "";
        },
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">Sold Products</h2>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by Order ID, User..."
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
    </div>
  );
}
