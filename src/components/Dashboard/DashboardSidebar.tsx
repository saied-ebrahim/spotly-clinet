"use client";
import { usePathname } from "@/i18n/navigation";
import LinkTo from "../Global/LinkTo";
import { navSections } from "./data";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[80px] flex-col border-r border-slate-200 bg-white lg:flex h-dvh fixed top-0 left-0 pt-20 z-50 hover:w-64 transition-all duration-300 group/sidebar">
      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <div className="px-2 text-[10px] uppercase tracking-wider text-slate-400 text-center group-hover/sidebar:text-left group-hover/sidebar:pl-4 transition-all duration-300 truncate">
                {section.title}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {section.items.map((item) => {
                // Determine the role from the pathname (e.g., /dashboardHome/Admin/...)
                const pathSegments = pathname.split("/");
                const dashboardIndex = pathSegments.indexOf("dashboardHome");
                const role =
                  dashboardIndex !== -1 && pathSegments[dashboardIndex + 1]
                    ? pathSegments[dashboardIndex + 1]
                    : "Admin"; // Default to Admin if not found, though redirect should handle this

                // Construct the link based on the role
                const linkPath =
                  item.link === ""
                    ? `/dashboardHome/${role}`
                    : `/dashboardHome/${role}/${item.link}`;

                const isActive =
                  pathname === linkPath || pathname.startsWith(linkPath + "/");

                return (
                  <LinkTo
                    href={linkPath}
                    key={item.key}
                    className={`group relative flex w-full items-center justify-start pl-7 rounded-lg py-3 text-xs font-medium transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "text-brand-primary bg-brand-primary/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      size={24}
                      className={`min-w-[24px] ${
                        isActive
                          ? "text-brand-primary"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span className="ml-4 whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 text-sm">
                      {item.label}
                    </span>
                  </LinkTo>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 flex flex-col items-center gap-4 border-t border-slate-100">
        {/* Bottom actions if any */}
      </div>
    </aside>
  );
}
