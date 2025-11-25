"use client";

import { useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import AccountInfo from "./components/AccountInfo";
import ChangeEmail from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";

type ProfileSection = "account-info" | "change-email" | "change-password";

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>("account-info");

  const renderSection = () => {
    switch (activeSection) {
      case "account-info":
        return <AccountInfo />;
      case "change-email":
        return <ChangeEmail />;
      case "change-password":
        return <ChangePassword />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 h-full">
            {/* Sidebar */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-200/50 overflow-y-auto h-full">
              <ProfileSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full">
              <div className="animate-slide-in">{renderSection()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
