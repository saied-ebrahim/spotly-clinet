"use client";
import { AdminTagsTable } from "@/components/Dashboard/Tags/AdminTagsTable";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { TagDocument } from "@/types/tagInterface";

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagDocument[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/tags")
      .then((res) => {
        if (res.data?.data?.tags) {
          setTags(res.data.data.tags);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tags:", err);
      });
  }, []);

  return (
    <div className="h-full space-y-6">
      <AdminTagsTable initialData={tags} />
    </div>
  );
}
