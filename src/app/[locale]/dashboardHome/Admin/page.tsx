import { FiCalendar, FiList, FiSearch, FiChevronDown } from "react-icons/fi";

export default function EventsDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-slate-900">Events</h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-brand-primary pb-4 text-sm font-medium text-brand-primary">
             Admin Events
            </button>
            <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
              Collections
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 sm:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                placeholder="Search events"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-x-1.5 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
                <FiList className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                List
              </button>
              <button className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                <FiCalendar
                  className="-ml-0.5 h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
                Calendar
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-x-2 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90">
              <FiChevronDown className="h-5 w-5" />
              All events
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">
              Create Event
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-4 h-40 w-40 rounded-full bg-slate-50 flex items-center justify-center">
            {/* Placeholder for illustration */}
            <FiCalendar className="h-16 w-16 text-slate-300" />
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            No events to show
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Get started by creating your first event.
          </p>
        </div>
      </div>
    </div>
  );
}
