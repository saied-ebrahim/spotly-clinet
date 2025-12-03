"use client";

import { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/Custom/DataTable";
import { ColDef } from "ag-grid-community";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { EditEventModal } from "./EditEventModal";
import ConfirmationModal from "@/components/Custom/ConfirmationModal";
import { EventDocument } from "@/types/eventInterface";
import axiosInstance from "@/lib/axios";

interface AdminEventsTableProps {
  initialData: EventDocument[];
}

export function AdminEventsTable({ initialData }: AdminEventsTableProps) {
  const [rowData, setRowData] = useState<EventDocument[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDocument | null>(
    null
  );

  useEffect(() => {
    setRowData(initialData);
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return rowData;
    const lowerTerm = searchTerm.toLowerCase();
    return rowData.filter((event) =>
      event.title.toLowerCase().includes(lowerTerm)
    );
  }, [rowData, searchTerm]);

  const handleEditClick = (event: EventDocument) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event: EventDocument) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEvent = (updatedEvent: EventDocument): void => {
    setRowData((prev) =>
      prev.map((item) => (item._id === updatedEvent._id ? updatedEvent : item))
    );
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      setRowData((prev) => prev.filter((item) => item._id !== selectedEvent._id));
      axiosInstance.delete(`/events/${selectedEvent._id}`);
      setIsDeleteModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const columnDefs: ColDef<EventDocument>[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 70, sortable: true, hide: true },
      {
        field: "title",
        headerName: "Title",
        flex: 2,
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        flex: 1,
        minWidth: 150,
        sortable: true,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: "location.city",
        headerName: "Location",
        flex: 1,
        minWidth: 150,
        sortable: true,
      },
      { field: "price", headerName: "Price", width: 100, sortable: true },
      {
        headerName: "Actions",
        width: 120,
        pinned: "right",
        cellRenderer: (params: { data: EventDocument }) => {
          return (
            <div className="flex items-center gap-2 h-full">
              <button
                onClick={() => handleEditClick(params.data)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Edit"
              >
                <FiEdit2 size={16} />
              </button>
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
        <h2 className="text-lg font-bold text-slate-800">All Events</h2>
        <input
          type="text"
          placeholder="Search events..."
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
