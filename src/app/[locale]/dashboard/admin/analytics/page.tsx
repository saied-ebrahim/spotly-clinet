"use client";

import axiosInstance from "@/lib/axios";
import { EventDocument } from "@/types/eventInterface";
import { useEffect, useMemo, useState, useRef } from "react";
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
  FiShoppingBag,
} from "react-icons/fi";
import {
  AnalyticsResponse,
  StatCardProps,
} from "@/types/components/Dashboard/analytics";
import { useTranslations, useLocale } from "next-intl";

export default function AdminAnalyticsPage() {
  const t = useTranslations("dashboardAdmin.common");
  const locale = useLocale();
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [eventAnalytics, setEventAnalytics] = useState<{
    revenue: number;
    netIncome: number;
  }>({ revenue: 0, netIncome: 0 });
  const [eventLoading, setEventLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetching events and orders in parallel
        const [eventsRes, ordersRes, revenueRes, netIncomeRes] =
          await Promise.all([
            axiosInstance.get("/events?limit=1000"),
            axiosInstance.get("/orders?limit=10000"), // Assuming reasonable limit for analytics overview
            axiosInstance.get<AnalyticsResponse>("/events/analytics/revenue"),
            axiosInstance.get<AnalyticsResponse>(
              "/events/analytics/net-income"
            ),
          ]);

        if (
          eventsRes.data.status === "success" &&
          eventsRes.data.data?.events
        ) {
          setEvents(eventsRes.data.data.events);
        }

        if (
          ordersRes.data.status === "success" &&
          ordersRes.data.data?.orders
        ) {
          const orders = ordersRes.data.data?.orders || [];
          setTotalOrders(orders.length);
        } else if (Array.isArray(ordersRes.data)) {
          setTotalOrders(ordersRes.data.length);
        }

        if (revenueRes.status === 200) {
          const data = revenueRes.data;
          // Handle both wrapped and direct responses validation
          const revenue = data.revenue ?? data.data?.revenue;
          if (typeof revenue === "number") {
            setTotalRevenue(revenue);
          }
        }

        if (netIncomeRes.status === 200) {
          const data = netIncomeRes.data;
          // Handle both wrapped and direct responses validation
          const netIncome = data.netIncome ?? data.data?.netIncome;
          if (typeof netIncome === "number") {
            setNetIncome(netIncome);
          }
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;

    const fetchEventAnalytics = async () => {
      try {
        setEventLoading(true);
        const [revenueRes, netIncomeRes] = await Promise.all([
          axiosInstance.get<AnalyticsResponse>(
            `/events/analytics/${selectedEventId}/revenue`
          ),
          axiosInstance.get<AnalyticsResponse>(
            `/events/analytics/${selectedEventId}/net-income`
          ),
        ]);

        let revenue = 0;
        let netIncome = 0;

        if (revenueRes.status === 200) {
          const data = revenueRes.data;
          revenue = data.revenue ?? data.data?.revenue ?? 0;
        }

        if (netIncomeRes.status === 200) {
          const data = netIncomeRes.data;
          netIncome = data.netIncome ?? data.data?.netIncome ?? 0;
        }

        setEventAnalytics({ revenue, netIncome });
      } catch (error) {
        console.error("Error fetching event analytics:", error);
      } finally {
        setEventLoading(false);
      }
    };

    fetchEventAnalytics();
  }, [selectedEventId]);

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
      .slice(0, 4)
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
          {t("analyticsOverview")}
        </h1>
        <p className="text-slate-500">{t("performanceMetrics")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title={t("totalRevenue")}
          value={`$${totalRevenue.toLocaleString()}`}
          icon={FiDollarSign}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          title={t("netIncome")}
          value={`$${netIncome.toLocaleString()}`}
          icon={FiDollarSign}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title={t("ticketsSold")}
          value={stats.totalTicketsSold.toLocaleString()}
          icon={FiTicket}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          title={t("avgTicketSales")}
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
          title={t("totalOrders")}
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
            {t("topEventsByRevenue")}
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
                  reversed={locale === "ar"}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  orientation={locale === "ar" ? "right" : "left"}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    direction: locale === "ar" ? "rtl" : "ltr",
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
            {t("ticketSalesVsAvailable")}
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
                  reversed={locale === "ar"}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  orientation={locale === "ar" ? "right" : "left"}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    direction: locale === "ar" ? "rtl" : "ltr",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sold"
                  name={t("sold")}
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="available"
                  name={t("available")}
                  fill="#FFBB28"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Event Specific Analytics */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {t("eventSpecificAnalytics")}
        </h2>

        <div className="mb-6 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t("selectEvent")}
          </label>
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none"
              placeholder={t("searchEvent")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {events.filter((event) =>
                  event.title.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 ? (
                  events
                    .filter((event) =>
                      event.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((event) => (
                      <div
                        key={event._id}
                        className="p-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700"
                        onClick={() => {
                          setSelectedEventId(event._id);
                          setSearchQuery(event.title);
                          setShowDropdown(false);
                        }}
                      >
                        {event.title}
                      </div>
                    ))
                ) : (
                  <div className="p-2 text-sm text-slate-500">
                    {t("noEventsFound")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-md font-medium text-slate-700 mb-4 text-center">
              {t("financialPerformance")}
            </h3>
            <div className="h-[300px] w-full">
              {eventLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: t("revenue"),
                        value: eventAnalytics.revenue,
                        fill: "#00C49F",
                      },
                      {
                        name: t("netIncome"),
                        value: eventAnalytics.netIncome,
                        fill: "#10B981",
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      reversed={locale === "ar"}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                      orientation={locale === "ar" ? "right" : "left"}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      formatter={(value) => [`$${value}`, t("amount")]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        direction: locale === "ar" ? "rtl" : "ltr",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-md font-medium text-slate-700 mb-4 text-center">
              {t("ticketSalesAnalysis")}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: t("ticketsSold"),
                      value:
                        events.find((e) => e._id === selectedEventId)?.analytics
                          ?.ticketsSold || 0,
                      fill: "#8884d8",
                    },
                    {
                      name: t("available"),
                      value:
                        events.find((e) => e._id === selectedEventId)?.analytics
                          ?.ticketsAvailable || 0,
                      fill: "#FFBB28",
                    },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    reversed={locale === "ar"}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    orientation={locale === "ar" ? "right" : "left"}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      direction: locale === "ar" ? "rtl" : "ltr",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: StatCardProps) {
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
