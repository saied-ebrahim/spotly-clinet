"use client";

import { formatPrice } from "@/utils/details/formatting";
import { FaTicketAlt } from "react-icons/fa";
import { useState } from "react";
import TicketsModal from "@/components/Custom/TicketsModal";
import { EventDocument } from "@/types/eventInterface";
import { useTranslations } from "next-intl";

export default function TicketSidebar({ event }: { event: EventDocument }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("eventDetails");
  
  const isSoldOut = !event.analytics?.ticketsAvailable || event.analytics.ticketsAvailable <= 0;

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
              {isSoldOut ? (
                <span className="text-red-500 font-bold">
                  {t("soldOut")}
                </span>
              ) : (
                event.analytics?.ticketsAvailable < 10 && (
                  <span className="text-red-500 font-bold">
                    Only {event.analytics.ticketsAvailable} tickets left!
                  </span>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isSoldOut}
            className={`w-full py-3.5 font-bold rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 ${
              isSoldOut
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-md active:scale-[0.98]"
            }`}
          >
            <FaTicketAlt className="-rotate-45" />
            {isSoldOut
              ? t("soldOut")
              : event.ticketType.price > 0
              ? t("buyTickets")
              : t("getTickets")}
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
