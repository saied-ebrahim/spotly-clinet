"use client";

import { useState } from "react";
import ProfileSidebar from "../../../../../components/ProfileComponents/ProfileSidebar";
import AccountInfo from "../../../../../components/ProfileComponents/AccountInfo";
import ChangeEmail from "../../../../../components/ProfileComponents/ChangeEmail";
import ChangePassword from "../../../../../components/ProfileComponents/ChangePassword";
import { ProfileSection } from "../../../../../types/Profileinterfaces";

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
    <div className="min-h-screen bg-slate-50 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-8rem)]">
        {/* Sidebar */}
        <div className="lg:col-span-3 xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <ProfileSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 xl:col-span-10">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-full">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
