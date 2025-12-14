import { ColDef } from "ag-grid-community";

export interface DataTableProps<T extends object> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  height?: string | number | "auto";
  mobileHeight?: string | number;
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  rowSelection?: "single" | "multiple" | false;
  showRowNumbers?: boolean;
  defaultColDef?: ColDef;
  onRowClicked?: (row: T) => void;
  className?: string;
  locale?: string;
  loading?: boolean;
  installLoading?: boolean;
}