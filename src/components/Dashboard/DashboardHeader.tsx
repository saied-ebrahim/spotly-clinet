import { FiBell, FiChevronDown, FiMenu, FiSearch, FiSettings } from "react-icons/fi";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:text-primary lg:hidden">
          <FiMenu />
        </button>
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search dashboards, teams, documents..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-600 focus:border-primary/40 focus:bg-white focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
          Monthly <FiChevronDown />
        </button>
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:text-primary">
            <FiBell />
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:text-primary">
            <FiSettings />
          </button>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <span className="h-6 w-6 rounded-full bg-linear-to-r from-red-500 to-blue-500" />
            <span className="text-sm font-semibold">Mariam</span>
            <span className="hidden text-xs text-slate-400 sm:inline">Experience Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}

