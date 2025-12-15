"use client";

import { useEffect, useState } from "react";
import { AdminEventsTable } from "@/components/Dashboard/Events/AdminEventsTable";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";
import { EventDocument } from "@/types/eventInterface";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function OrganizerEventsPage() {
  const t = useTranslations("organizerDashboard.events");
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchOrganizerEvents(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchOrganizerEvents = async (searchTerm: string) => {
    try {
      setLoading(true);
      const query = searchTerm ? `/events?search=${searchTerm}` : `/events`;

      const response = await axiosInstance.get<{
        status: string;
        data: {
          events: EventDocument[];
        };
        pagination: any;
      }>(query, {
        skipGlobalLoading: true,
      });

      if (response.data.status === "success" && response.data.data?.events) {
        setEvents(response.data.data.events);
      } else {
        toast.error(t("fetchError"));
      }
    } catch (error) {
      console.error("Error fetching organizer events:", error);
      toast.error(t("generalError"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t("title")}</h1>
          <p className="text-slate-500">{t("subtitle")}</p>
        </div>
        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <AdminEventsTable
        rowData={events}
        loading={loading}
        pagination={null}
        onPageChange={() => {}}
      />
    </div>
  );
}
