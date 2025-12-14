"use client";

import { useEffect, useState } from "react";
import { OrganizerOrdersTable } from "@/components/Dashboard/Orders/OrganizerOrdersTable";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";
import { OrderResponse } from "@/types/order";
import { toast } from "react-toastify";
import { OrderDocument } from "@/types/orderInterface";

function Page() {
const [orders, setOrders] = useState<OrderDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Get user ID from cookie
        const cookie = Cookies.get("token");
        if (!cookie) {
          throw new Error("No auth token found");
        }

        const decrypted = decryptData(cookie) as { token?: string };
        const token = decrypted?.token;

        if (!token) {
          throw new Error("Invalid token");
        }

        const decoded = parseJwt(token);
        // Assuming the user ID is in the 'id' or '_id' field of the payload
        // Adjust 'id' based on actual JWT structure if known, otherwise try common fields
        const userId = decoded?.id || decoded?._id || decoded?.sub;

        if (!userId) {
          throw new Error("User ID not found in token");
        }

        const response = await axiosInstance.get<OrderResponse>(
          `/orders/${userId}`
        );

        if (response.data.status === "success" && response.data.data.order) {
          setOrders(response.data.data.order);
        } else {
          // Handle case where data might not be in expected format
          console.warn("Unexpected response format", response.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
        <p className="text-slate-500">View and manage your orders</p>
      </div>

      <OrganizerOrdersTable rowData={orders} loading={loading} />
    </div>
  );
}


export default Page