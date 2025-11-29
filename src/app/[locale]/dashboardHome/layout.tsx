import type { ReactNode } from "react";
import { DashboardContentSection } from "@/components/Dashboard/DashboardContentSection";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800">
      <div className="flex min-h-screen bg-[#f6f8fb]">
        <DashboardSidebar />
        <main className="flex-1 ms-auto max-w-[calc(100%-80px)] lg:ml-[80px]">
          <DashboardHeader />
          <div className="max-w-[1500px] px-6 mx-auto mt-6">
            <DashboardContentSection>{children}</DashboardContentSection>
          </div>
        </main>
      </div>
    </div>
  );
}
