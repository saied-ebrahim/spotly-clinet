"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SoldProductsTable } from "@/components/Dashboard/SoldProducts/SoldProductsTable";
import axiosInstance from "@/lib/axios";
import { SoldProduct, SoldProductsResponse } from "@/types/soldProduct";
import { toast } from "react-toastify";

export default function SoldProductsPage() {
  const t = useTranslations("organizerDashboard.soldEvents");
  const [soldProducts, setSoldProducts] = useState<SoldProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        setLoading(true);
        const url = searchQuery
          ? `/organizers/events/orders/myorders?search=${searchQuery}`
          : "/organizers/events/orders/myorders";

        const response = await axiosInstance.get<SoldProductsResponse>(url);

        if (response.data.status === "success" && response.data.orders) {
          setSoldProducts(response.data.orders);
          console.log(response.data.orders);
        } else {
          console.warn("Unexpected response format", response.data);
          setSoldProducts([]);
        }
      } catch (error) {
        console.error("Error fetching sold events:", error);
        toast.error("Failed to load sold events");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProducts();
  }, [searchQuery]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{t("title")}</h1>
        <p className="text-slate-500">{t("subtitle")}</p>
      </div>

      <SoldProductsTable
        rowData={soldProducts}
        loading={loading}
        onSearch={setSearchQuery}
      />
    </div>
  );
}
