"use client";
import useFilter from "@/hooks/useFilter";
import { EventObject } from "@/types/PaginationInterface";
import { getMonthDay } from "@/utils/details/formatting";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventCard from "../home/EventCard";
// const relatedEvents = [
//   {
//     id: 1,
//     title: "Lakeside Camping at Pawna",
//     date: "Nov 25 - 26",
//     price: 1499,
//     image:
//       "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600",
//     category: "Travel & Adventure",
//   },
//   {
//     id: 2,
//     title: "Project Earth Exhibition",
//     date: "Dec 16",
//     price: 0,
//     image:
//       "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600",
//     category: "Cultural & Arts",
//   },
//   {
//     id: 3,
//     title: "Royal College of Art Meet",
//     date: "Dec 02",
//     price: 0,
//     image:
//       "https://images.unsplash.com/photo-1544928147-79a77456a1d3?auto=format&fit=crop&q=80&w=600",
//     category: "Educational",
//   },
// ];
export default function RecommendationList({ event }: { event: EventObject }) {
  const { month, date: dayDate } = getMonthDay(event.date);

  // const [recommends] = useFilter(
  //   "http://localhost:8080/events",
  //   (e: EventObject) => e.organizer === event.organizer
  // );
  // const [recommends, setRecommends] = useState<EventObject[]>([]);
  // const { eventId } = useParams();

  // useEffect(() => {
  //   // Replace this with your actual API endpoint
  //   fetch("http://localhost:8080/events")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const recoms = data.filter(
  //         (e: EventObject) => e.organizer === event.organizer
  //       );
  //       setRecommends(recoms);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching event:", err);
  //     });
  // }, [eventId, event.organizer]);
  return (
    <section>
      <div className=" flex sm:flex-nowrap flex-wrap justify-between items-center mb-5 ">
        <h2 className="text-2xl font-bold text-gray-900 sm:mb-0 mb-4">
          Other events you may like
        </h2>
        <div className="flex justify-end gap-2 sm:w-[100px] w-full ">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <FaChevronLeft className="w-3 h-3" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* {recommends.map((event) => (
          <EventCard key={event.id} event={event} />
        ))} */}
      </div>
    </section>
  );
}
