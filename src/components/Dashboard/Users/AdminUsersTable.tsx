"use client";

import { useMemo } from "react";
import DataTable from "@/components/Custom/DataTable";
import {
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { User, UserPagination } from "@/types/userTypes";

interface AdminUsersTableProps {
  rowData: User[];
  loading?: boolean;
  pagination: UserPagination | null;
  onPageChange: (page: number) => void;
}

export function AdminUsersTable({
  rowData,
  loading = false,
  pagination,
  onPageChange,
}: AdminUsersTableProps) {
  const columnDefs: ColDef<User>[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90, sortable: true, hide: true },
      {
        headerName: "Name",
        valueGetter: (params: ValueGetterParams<User>) => {
          return `${params.data?.firstName} ${params.data?.lastName}`;
        },
        flex: 1,
        minWidth: 150,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.5,
        minWidth: 200,
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "role",
        headerName: "Role",
        width: 100,
        cellRenderer: (params: { value: string }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              params.value === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {params.value}
          </span>
        ),
      },
      {
        headerName: "Location",
        valueGetter: (params: ValueGetterParams<User>) => {
          const addr = params.data?.address;
          if (!addr) return "N/A";
          return `${addr.city}, ${addr.country}`;
        },
        flex: 1,
        minWidth: 150,
      },
      {
        field: "createdAt",
        headerName: "Joined",
        flex: 1,
        minWidth: 150,
        valueFormatter: (params: ValueFormatterParams<User, string>) => {
          return params.value
            ? new Date(params.value).toLocaleDateString()
            : "";
        },
      },
    ],
    []
  );

  const gridHeight = useMemo(() => {
    const ROW_HEIGHT = 52;
    const HEADER_HEIGHT = 48;
    const BUFFER = 2;
    const calculated = rowData.length * ROW_HEIGHT + HEADER_HEIGHT + BUFFER;
    return Math.max(calculated, 200);
  }, [rowData]);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-left">
      <div className="p-0">
        <DataTable
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={false}
          loading={loading}
          height={gridHeight}
        />
      </div>

      {/* Pagination Controls matching AgGrid theme */}
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
    </div>
  );
}
