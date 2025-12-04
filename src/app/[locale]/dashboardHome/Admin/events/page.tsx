"use client";
import { AdminEventsTable } from "@/components/Dashboard/Events/AdminEventsTable";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosInstance.get("/events?limit=20").then((res) => {
      console.log(res.data.data.events);
      setEvents(res.data.data.events);
    });
  },[]);
  return (
    <div className="h-full space-y-6">
      <AdminEventsTable initialData={events} />
    </div>
  );
}
