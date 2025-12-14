"use client";

import { useEffect, useState } from "react";
import { SoldProductsTable } from "@/components/Dashboard/SoldProducts/SoldProductsTable";
import axiosInstance from "@/lib/axios";
import { SoldProduct, SoldProductsResponse } from "@/types/soldProduct";
import { toast } from "react-toastify";

export default function SoldProductsPage() {
  const [soldProducts, setSoldProducts] = useState<SoldProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<SoldProductsResponse>(
          "/organizers/events/orders/myorders"
        );

        if (response.data.status === "success" && response.data.orders) {
          setSoldProducts(response.data.orders);
        } else {
          console.warn("Unexpected response format", response.data);
          setSoldProducts([]);
        }
      } catch (error) {
        console.error("Error fetching sold products:", error);
        toast.error("Failed to load sold products");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Sold Products</h1>
        <p className="text-slate-500">View your sold products and orders</p>
      </div>

      <SoldProductsTable rowData={soldProducts} loading={loading} />
    </div>
  );
}
