"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useLocale } from "next-intl";
import { DashboardContentSection } from "@/components/Dashboard/DashboardContentSection";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800">
      <div className={`flex min-h-screen bg-[#f6f8fb] ${isRTL ? 'flex-row-reverse' : ''}`}>
        <DashboardSidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main className={`flex-1 ${isRTL ? 'me-auto max-w-full lg:max-w-[calc(100%-80px)] lg:mr-[80px]' : 'ms-auto max-w-full lg:max-w-[calc(100%-80px)] lg:ml-[80px]'}`}>
          <DashboardHeader onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <div className="max-w-[1500px] px-6 mx-auto mt-6">
            <DashboardContentSection>{children}</DashboardContentSection>
          </div>
        </main>
      </div>
    </div>
  );
}
