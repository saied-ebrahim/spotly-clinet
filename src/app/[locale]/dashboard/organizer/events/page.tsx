"use client";

import { useEffect, useState } from "react";
import { AdminEventsTable } from "@/components/Dashboard/Events/AdminEventsTable";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";
import { EventDocument } from "@/types/eventInterface";
import { toast } from "react-toastify";

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizerEvents();
  }, []);

  const fetchOrganizerEvents = async () => {
    try {
      const cookie = Cookies.get("token");
      if (!cookie) {
        setLoading(false);
        return;
      }

      const decrypted = decryptData(cookie) as { token?: string };
      if (!decrypted?.token) {
        setLoading(false);
        return;
      }

      const decodedToken = parseJwt(decrypted.token);
      const userId = decodedToken?.id || decodedToken?._id || decodedToken?.sub;

      if (!userId) {
        toast.error("User ID not found");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get<{
        status: string;
        data: {
          organizers: {
            eventID: EventDocument | null;
          }[];
        };
      }>(`/Organizers/user/${userId}`);

      if (
        response.data?.status === "success" &&
        response.data?.data?.organizers
      ) {
        // Extract eventID from each organizer entry and filter out nulls
        const organizerEvents = response.data.data.organizers
          .map((item) => item.eventID)
          .filter((event): event is EventDocument => event !== null);

        setEvents(organizerEvents);
      }
    } catch (error) {
      console.error("Error fetching organizer events:", error);
      toast.error("Failed to load events");
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Events</h1>
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
