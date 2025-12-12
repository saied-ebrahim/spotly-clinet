"use client";
import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./EventMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 rounded-xl">
      Loading Map...
    </div>
  ),
});

interface EventMapWrapperProps {
  lat: number;
  lng: number;
}

export default function EventMapWrapper(props: EventMapWrapperProps) {
  return <EventMap {...props} />;
}
