"use client";
import { usePathname } from "@/i18n/navigation";
import LinkTo from "../Global/LinkTo";
import { navSections } from "./data";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[80px] flex-col border-r border-slate-200 bg-white lg:flex h-dvh fixed top-0 left-0 pt-20 z-0">
      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <div className="px-2 text-[10px] uppercase tracking-wider text-slate-400 text-center">
                {section.title}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {section.items.map((item) => {
                const isActive =
                  pathname.includes("/dashboardHome/" + item.link) ||
                  (item.link === "" && pathname.endsWith("/dashboardHome"));
                return (
                  <LinkTo
                    href={"/dashboardHome/" + item.link}
                    key={item.key}
                    className={`group relative flex w-full flex-col items-center justify-center rounded-lg py-3 text-xs font-medium transition ${
                      isActive
                        ? "text-brand-primary bg-brand-primary/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      size={24}
                      className={`mb-1 ${
                        isActive
                          ? "text-brand-primary"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    {/* Tooltip or label if needed, for now just icon centered as per narrow sidebar common pattern, or small text below */}
                    {/* <span className="text-[10px]">{item.label}</span> */}
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
