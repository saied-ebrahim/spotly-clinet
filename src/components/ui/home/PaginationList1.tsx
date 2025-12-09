"use client";
import React, { useState } from "react";

import EventCard from "./EventCard";
// import PaginatedEventElement from "@/types/PaginatedEventElement";

import {
  PaginationEventsProps,
  PaginationProps,
} from "@/types/PaginationInterface";
import Link from "next/link";
import { EventDocument } from "@/types/eventInterface";

// 1. Mock Data Generator


const PaginatedEvents = ({
  children,
  itemsPerPage,
  // 1. Give it a default empty array
  events = [], 
}: PaginationEventsProps) => {

  // 2. Add a guard clause
  if (!events) {
      console.log("Events is undefined");
      return null; 
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-in">
        {/* Now this won't crash because events is guaranteed to be an array */}
        {events.map((event: EventDocument) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Logic to show pagination buttons (children) only if needed */}
      {events.length > 0 && children}
    </div>
  );
};
export default PaginatedEvents;
// 3. Pagination Component
