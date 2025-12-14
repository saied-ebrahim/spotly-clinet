"use client";

import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { OrderDocument } from "@/types/orderInterface";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiDollarSign,
  FiTag as FiTicket,
  FiTrendingUp,
  FiActivity,
  FiShoppingBag,
} from "react-icons/fi";

export default function OrganizerAnalyticsPage() {
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndExtractEvents = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/organizers/events/orders/myorders"
        );

        if (response.data.status === "success" && response.data.orders) {
          const orders = response.data.orders as OrderDocument[];
          setTotalOrders(orders.length);

          // Deduplicate events from orders using a Map
          const uniqueEventsMap = new Map<string, EventDocument>();

          orders.forEach((order) => {
            // Ensure eventID exists and is populated
            if (order.eventID && order.eventID._id) {
              // We only need to store it once.
              // Assuming the event object is fully populated and consistent across orders.
              if (!uniqueEventsMap.has(order.eventID._id)) {
                uniqueEventsMap.set(order.eventID._id, order.eventID);
              }
            }
          });

          setEvents(Array.from(uniqueEventsMap.values()));
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndExtractEvents();
  }, []);

  const stats = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        const analytics = event.analytics || {
          ticketsSold: 0,
          ticketsAvailable: 0,
          totalRevenue: 0,
          likes: 0,
        };

        acc.totalRevenue += analytics.totalRevenue || 0;
        acc.totalTicketsSold += analytics.ticketsSold || 0;
        acc.totalTicketsAvailable += analytics.ticketsAvailable || 0;
        return acc;
      },
      {
        totalRevenue: 0,
        totalTicketsSold: 0,
        totalTicketsAvailable: 0,
      }
    );
  }, [events]);

  const revenueData = useMemo(() => {
    // Top 10 events by revenue
    return [...events]
      .sort(
        (a, b) =>
          (b.analytics?.totalRevenue || 0) - (a.analytics?.totalRevenue || 0)
      )
      .slice(0, 10)
      .map((event) => ({
        name:
          event.title.length > 15
            ? event.title.slice(0, 15) + "..."
            : event.title,
        revenue: event.analytics?.totalRevenue || 0,
      }));
  }, [events]);

  const ticketsData = useMemo(() => {
    // Top 10 events by tickets sold
    return [...events]
      .sort(
        (a, b) =>
          (b.analytics?.ticketsSold || 0) - (a.analytics?.ticketsSold || 0)
      )
      .slice(0, 10)
      .map((event) => ({
        name:
          event.title.length > 15
            ? event.title.slice(0, 15) + "..."
            : event.title,
        sold: event.analytics?.ticketsSold || 0,
        available: event.analytics?.ticketsAvailable || 0,
      }));
  }, [events]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Analytics Overview
        </h1>
        <p className="text-slate-500">
          Performance metrics and statistics for your events
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={FiDollarSign}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          title="Tickets Sold"
          value={stats.totalTicketsSold.toLocaleString()}
          icon={FiTicket}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          title="Avg. Ticket Sales"
          value={
            events.length
              ? (stats.totalTicketsSold / events.length).toFixed(1)
              : "0"
          }
          icon={FiTrendingUp}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          icon={FiShoppingBag}
          color="text-red-600"
          bg="bg-red-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Top Events by Revenue
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#00C49F"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tickets Sold Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Ticket Sales vs Available (Top Events)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sold"
                  name="Sold"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="available"
                  name="Available"
                  fill="#FFBB28"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
}
