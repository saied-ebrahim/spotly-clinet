"use client";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useTranslations } from "next-intl";
import {
  ProfileSection,
  ProfileSidebarProps,
} from "../../types/Profileinterfaces";

export default function ProfileSidebar({
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const t = useTranslations("profile");

  const menuItems = [
    {
      id: "account-info" as ProfileSection,
      label: t("accountInfo"),
      icon: FaUser,
    },
    {
      id: "change-password" as ProfileSection,
      label: t("password"),
      icon: FaLock,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">
        {t("accountSettings")}
      </h2>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-brand-primary" : "text-slate-400"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
