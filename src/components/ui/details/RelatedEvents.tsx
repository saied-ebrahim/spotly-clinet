"use client";
import { EventObject } from "@/types/PaginationInterface";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
export default function RelatedEvents({ event }: { event: EventObject }) {
  const [recommends, setRecommends] = useState<EventObject[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/events")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const arr = data.filter((e:EventObject)=>e.organizer===e).slice(0, 7);
  //       console.log(arr);
  //       setEvents(arr);
  //     });
  // }, []);
  const { eventId } = useParams();
  // const [myEvent, setMyEvent] = useState<EventObject | null>(null);

  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        const recoms = data.filter(
          (e: EventObject) => e.organizer === event.organizer
        );
        setRecommends(recoms);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
      });
  }, [eventId, event.organizer]);
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Other events you may like
        </h2>
        <div className="flex gap-2">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <FaChevronLeft className="w-3 h-3" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommends.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-3">
              <Image
                src={event.media[0].mediaUrl}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                {event.category}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-start pt-1 text-blue-600 font-bold leading-tight w-12 shrink-0">
                <span className="text-xs uppercase">
                  {event.date.split(" ")[0]}
                </span>
                <span className="text-lg">
                  {event.date.split(" ")[1] || "01"}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {event.price === 0 ? "FREE" : `EGP ${event.price}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
