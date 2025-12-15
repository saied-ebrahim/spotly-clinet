"use client";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import LinkTo from "../Global/LinkTo";
import { navSections } from "./data";

export function DashboardSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("sidebar");

  return (
    <aside
      className={`flex-col ${
        isRTL ? "border-l" : "border-r"
      } border-slate-200 bg-white h-dvh fixed top-0 ${
        isRTL ? "right-0" : "left-0"
      } pt-20 z-50 transition-all duration-300 group/sidebar ${
        mobileOpen ? "w-64 flex" : "w-[80px] hidden"
      } lg:flex lg:w-[80px] lg:hover:w-64`}
    >
      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <div
                className={`px-2 text-[10px] uppercase tracking-wider text-slate-400 ${
                  isRTL
                    ? "text-right group-hover/sidebar:text-right group-hover/sidebar:pr-4"
                    : "text-center group-hover/sidebar:text-left group-hover/sidebar:pl-4"
                } transition-all duration-300 truncate`}
              >
                {section.title}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {section.items.map((item) => {
                // Determine the role from the pathname (e.g., /dashboard/admin/...)
                const pathSegments = pathname.split("/");
                const dashboardIndex = pathSegments.indexOf("dashboard");
                const role =
                  dashboardIndex !== -1 && pathSegments[dashboardIndex + 1]
                    ? pathSegments[dashboardIndex + 1]
                    : "admin"; // Default to admin if not found, though redirect should handle this

                if (item.allowedRoles && !item.allowedRoles.includes(role)) {
                  return null;
                }

                // Construct the link based on the role
                const linkPath =
                  item.link === ""
                    ? `/dashboard/${role}`
                    : `/dashboard/${role}/${item.link}`;

                const isActive =
                  item.link === ""
                    ? pathname === linkPath
                    : pathname === linkPath ||
                      pathname.startsWith(linkPath + "/");

                return (
                  <LinkTo
                    href={linkPath}
                    key={item.key}
                    onClick={onClose}
                    className={`group relative flex w-full items-center justify-start ${
                      isRTL ? "pr-7" : "pl-7"
                    } rounded-lg py-3 text-xs font-medium transition-all duration-300 overflow-hidden ${
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
                    <span
                      className={`${
                        isRTL ? "mr-4" : "ml-4"
                      } whitespace-nowrap transition-opacity duration-300 text-sm ${
                        mobileOpen
                          ? "opacity-100"
                          : "opacity-0 group-hover/sidebar:opacity-100"
                      }`}
                    >
                      {t(item.key)}
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
