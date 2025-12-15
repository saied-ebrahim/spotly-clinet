"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { parseJwt } from "@/shared/jwt";
import { authService } from "@/services/authService";
import { useTranslations } from "next-intl";
import {
  FiBell,
  FiChevronDown,
  FiMenu,
  FiPlus,
  FiLogOut,
  FiUser,
  FiMaximize,
} from "react-icons/fi";
import LinkTo from "../Global/LinkTo";
import SpotlyLogo from "../Layout/SpotlyLogo";
import { CreateEventModal } from "./Events/CreateEventModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function DashboardHeader({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle: () => void;
}) {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("dashboardHeader");

  const handleCreateSuccess = () => {
    // Refresh logic here if needed, e.g., refetch events
    console.log("Event created successfully");
  };

  useEffect(() => {
    const checkSession = async () => {
      const cookie = Cookies.get("sub");
      let userData = null;
      let token = null;

      if (cookie) {
        try {
          const decrypted = decryptData(cookie) as {
            token?: string;
            user?: { name?: string };
          };

          if (decrypted && decrypted.token) {
            userData = decrypted.user || { name: "User" };
            token = decrypted.token;
          }
        } catch (err) {
          console.error("DashboardHeader: Decryption failed", err);
        }
      }

      if (userData && token) {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          const name =
            decodedToken.name ||
            decodedToken.unique_name ||
            decodedToken.email?.split("@")[0] ||
            "User";

          setUser({
            name,
            email: decodedToken.email,
          });
        } else {
          setUser(userData);
        }
      }
    };
    checkSession();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      let deviceID = localStorage.getItem("deviceID") || "";
      if (!deviceID) {
        deviceID = await authService.getDeviceID();
      }

      if (deviceID) {
        await authService.logout(deviceID);
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("deviceID");
      setUser(null);
      router.push("/auth/login");
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 lg:hidden"
          >
            <FiMenu size={24} />
          </button>
          <LinkTo href="/" className="flex items-center gap-2">
            <SpotlyLogo />
          </LinkTo>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/ticket/scan"
            className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiMaximize />
            {t("scanTicket")}
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiPlus />
            {t("create")}
          </button>

          <LanguageSwitcher />

          <button className="p-2 text-slate-500 hover:text-slate-700">
            <FiBell size={20} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-full hover:bg-slate-50 p-1 pr-3 cursor-pointer transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white uppercase">
                {user?.name?.substring(0, 2) || "US"}
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                {user?.name || "User"}
              </span>
              <FiChevronDown
                className={`text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 animate-fadeIn z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/auth/Profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser size={16} />
                  {t("profile")}
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <FiLogOut size={16} />
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </header>
  );
}
