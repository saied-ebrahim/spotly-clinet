"use client";
import { EventObject } from "@/types/PaginationInterface";
import { formatPrice } from "@/utils/details/formatting";
import { FaTicketAlt } from "react-icons/fa";
import { useState } from "react";
import TicketsModal from "@/components/Custom/TicketsModal";
import { EventDocument } from "@/types/eventInterface";

export default function TicketSidebar({ event }: { event: EventDocument }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Ticket Information
            </h3>
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <FaTicketAlt className="text-gray-400 rotate-90" />
              <span className="font-medium text-sm">
                Standard Ticket: {formatPrice(event.ticketType.price)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {event.analytics?.ticketsAvailable < 10 && (
                <span className="text-red-500 font-bold">
                  Only {event.analytics.ticketsAvailable} tickets left!
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex justify-center items-center gap-2"
          >
            <FaTicketAlt className="-rotate-45" />
            {event.ticketType.price > 0 ? "Buy Tickets" : "Get Tickets"}
          </button>
          <TicketsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            event={event}
          />
        </div>
      </div>
    </div>
  );
}
