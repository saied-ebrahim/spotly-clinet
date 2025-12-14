import PopularEvents from "./PopularEvents";
import OnlineEvents from "./OnlineEvents";
import EgyptTopEvents from "./EgyptTopEvents";
import useEventStore from "@/store/useEventStore";
import { useEffect } from "react";
const ParentComp = () => {
    const { events, fetchEvents } = useEventStore();
    console.log(events);
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
    console.log(events);
    return (
        <>
          <PopularEvents events={events}/>
          <OnlineEvents events={events}/>
          <EgyptTopEvents events={events}/>
        </>
    );
}
export default ParentComp