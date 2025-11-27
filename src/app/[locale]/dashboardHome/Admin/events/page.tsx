import { AdminEventsTable } from "@/components/Dashboard/Events/AdminEventsTable";
import dummyEvents from "@/data/eventsdata/dummyEvents.json";

export default function AdminEventsPage() {
  return (
    <div className="h-full space-y-6">
      <AdminEventsTable initialData={dummyEvents} />
    </div>
  );
}
