"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { AdminUsersTable } from "@/components/Dashboard/Users/AdminUsersTable";
import { User, UsersResponse, UserPagination } from "@/types/userTypes";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UserPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get page from URL query param, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<UsersResponse>(
        `/auth/users?page=${page}`
      );

      if (response.data.status === "success") {
        setUsers(response.data.data.users);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    // Update URL query param to trigger effect and fetch new data
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="h-[calc(100vh-100px)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500">View and manage all registered users</p>
        </div>
      </div>

      <div className="h-[calc(100%-80px)]">
        <AdminUsersTable
          rowData={users}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
