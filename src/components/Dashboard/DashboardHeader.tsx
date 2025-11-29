import { FiBell, FiChevronDown, FiMenu, FiPlus } from "react-icons/fi";
import LinkTo from "../Global/LinkTo";
import SpotlyLogo from "../Layout/SpotlyLogo";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 lg:hidden">
            <FiMenu size={24} />
          </button>
          <LinkTo href="/" className="flex items-center gap-2">
            <SpotlyLogo />
          </LinkTo>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <FiPlus />
            Create
          </button>

          <button className="p-2 text-slate-500 hover:text-slate-700">
            <FiBell size={20} />
          </button>

          <div className="flex items-center gap-2 rounded-full hover:bg-slate-50 p-1 pr-3 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white">
              HA
            </div>
            <span className="text-sm font-semibold text-slate-700 hidden sm:block">
              Hussien El Assy
            </span>
            <FiChevronDown className="text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
