"use client";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

type ProfileSection = "account-info" | "change-email" | "change-password";

interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

export default function ProfileSidebar({
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const menuItems = [
    {
      id: "account-info" as ProfileSection,
      label: "Account Info",
      icon: FaUser,
    },
    {
      id: "change-email" as ProfileSection,
      label: "Change Email",
      icon: FaEnvelope,
    },
    {
      id: "change-password" as ProfileSection,
      label: "Password",
      icon: FaLock,
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
        Account Settings
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left
                transition-all duration-300 ease-out group relative overflow-hidden
                ${
                  isActive
                    ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:scale-102"
                }
              `}
            >
              {/* Animated background on hover */}
              <div
                className={`
                  absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 
                  transition-opacity duration-300
                  ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-10"
                  }
                `}
              />

              {/* Icon */}
              <Icon
                className={`
                  w-4 h-4 transition-transform duration-300
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}
              />

              {/* Label */}
              <span className="font-medium relative z-10">{item.label}</span>

              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
