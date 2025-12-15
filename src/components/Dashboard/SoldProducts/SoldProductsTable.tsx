"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import DataTable from "@/components/Custom/DataTable";
import { FiX } from "react-icons/fi";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { SoldProduct } from "@/types/soldProduct";

interface SoldProductsTableProps {
  rowData: SoldProduct[];
  loading?: boolean;
  onSearch?: (query: string) => void;
}

export function SoldProductsTable({
  rowData,
  loading = false,
  onSearch,
}: SoldProductsTableProps) {
  const t = useTranslations("organizerDashboard.soldEvents");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (onSearch) {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, onSearch]);

  const filteredData = useMemo(() => {
    if (onSearch) return rowData; // Bypass client-side filtering if onSearch is provided
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((order) => {
      // Search by ID, Ticket Type ID, or User Name
      const userName =
        `${order.userID?.firstName} ${order.userID?.lastName}`.toLowerCase();
      const eventTitle = order.eventID?.title?.toLowerCase() || "";
      return (
        order._id.toLowerCase().includes(lowerTerm) ||
        order.ticketTypeID.toLowerCase().includes(lowerTerm) ||
        userName.includes(lowerTerm) ||
        eventTitle.includes(lowerTerm)
      );
    });
  }, [rowData, searchTerm]);

  const columnDefs: ColDef<SoldProduct>[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: t("orderId"),
        width: 220,
        sortable: true,
        filter: true,
      },
      {
        headerName: t("user"),
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
        headerName: t("eventTitle"),
        valueGetter: (params: ValueGetterParams<SoldProduct>) => {
          return params.data?.eventID?.title || "N/A";
        },
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      {
        field: "ticketTypeID",
        headerName: t("ticketTypeId"),
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        field: "quantity",
        headerName: t("quantity"),
        width: 100,
        sortable: true,
      },
      {
        field: "totalAfterDiscount",
        headerName: t("total"),
        width: 120,
        sortable: true,
        valueFormatter: (params: ValueFormatterParams<SoldProduct, number>) => {
          return params.value != null ? `$${params.value.toFixed(2)}` : "";
        },
      },
      {
        field: "createdAt",
        headerName: t("date"),
        flex: 1,
        minWidth: 150,
        sortable: true,
        valueFormatter: (params: ValueFormatterParams<SoldProduct, string>) => {
          return params.value ? new Date(params.value).toLocaleString() : "";
        },
      },
    ],
    [t]
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">{t("tableTitle")}</h2>
        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full pr-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <FiX size={16} />
            </button>
          )}
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
