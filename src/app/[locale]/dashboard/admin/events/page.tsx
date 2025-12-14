"use client";

import { AdminEventsTable } from "@/components/Dashboard/Events/AdminEventsTable";
import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define pagination interface based on API response structure
interface Pagination {
  totalPages: number;
  currentPage: number;
  totalEvents: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface EventsResponse {
  status: string;
  data: {
    events: EventDocument[];
  };
  pagination: Pagination;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get page from URL query param, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchEvents(currentPage, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, search]);

  const fetchEvents = async (page: number, searchTerm: string) => {
    try {
      setLoading(true);
      const query = searchTerm
        ? `/events?search=${searchTerm}`
        : `/events?page=${page}&limit=10`;

      const response = await axiosInstance.get<EventsResponse>(query, {
        skipGlobalLoading: true,
      });

      if (response.data.status === "success" && response.data.data?.events) {
        setEvents(response.data.data.events);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("An error occurred while fetching events");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="h-[calc(100vh-100px)] p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Events Management
          </h1>
          <p className="text-slate-500">View and manage all events</p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="h-[calc(100%-100px)]">
        <AdminEventsTable
          rowData={events}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
