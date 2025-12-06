"use client";
import { AdminOrdersTable } from "@/components/Dashboard/Orders/AdminOrdersTable";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { OrderDocument } from "@/types/orderInterface";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDocument[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/orders")
      .then((res) => {
        if (res.data?.data?.orders) {
          setOrders(res.data.data.orders);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }, []);

  return (
    <div className="h-full space-y-6">
      <AdminOrdersTable initialData={orders} />
    </div>
  );
}
