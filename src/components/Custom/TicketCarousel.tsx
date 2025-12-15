"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaExclamationCircle,
  FaMapPin,
} from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import PrintButton from "./PrintButton";
import Link from "next/link";

export interface TicketDisplayData {
  id: string;
  eventTitle: string;
  isValid: boolean;
  date: string;
  formattedDate?: { month: string; date: number; year: number };
  time: string;
  address: string;
  attendee: string;
  qrCode: string;
}

interface TicketCarouselProps {
  tickets: TicketDisplayData[];
  invoiceId: string;
}

export default function TicketCarousel({
  tickets,
  invoiceId,
}: TicketCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ticketRef = useRef<HTMLDivElement>(null);

  if (!tickets || tickets.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto my-[50px] text-center">
        <p className="text-stone-600">No tickets found</p>
      </div>
    );
  }

  const currentTicket = tickets[currentIndex];

  const nextTicket = () => {
    setCurrentIndex((prev) => (prev + 1) % tickets.length);
  };

  const prevTicket = () => {
    setCurrentIndex((prev) => (prev - 1 + tickets.length) % tickets.length);
  };

  return (
    <div className="w-full max-w-md mx-auto my-[50px]">
      {/* Navigation Controls */}
      {tickets.length > 1 && (
        <div className="flex justify-between items-center mb-4 px-2">
          <button
            onClick={prevTicket}
            className="p-2 rounded-full bg-white shadow-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FaChevronLeft size={20} />
          </button>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Ticket {currentIndex + 1} of {tickets.length}
          </span>
          <button
            onClick={nextTicket}
            className="p-2 rounded-full bg-white shadow-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Global Styles for Print 
          هذا الستايل هو المسؤول عن توسيط التذكرة في الورقة وإلغاء الظلال
      */}
      <style jsx global>{`
        @media print {
          /* 1. إزالة هوامش الصفحة الافتراضية */
          @page {
            size: auto;
            margin: 0mm;
          }
          
          body {
            margin: 0;
            padding: 0;
          }

          /* 2. حاوية الطباعة: تأخذ طول وعرض الصفحة وتوسط المحتوى */
          .print-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center; /* توسيط عمودي وأفقي */
            background-color: white;
          }

          /* 3. تعديلات كارت التذكرة أثناء الطباعة */
          .ticket-card {
            box-shadow: none !important; /* إخفاء الظل */
            border: 1px dashed #ccc !important; /* حدود خفيفة للقص */
            max-width: 600px !important; /* عرض مناسب للورقة */
            width: 90% !important;
            margin: 0 !important;
            
            /* إجبار المتصفح على طباعة الألوان */
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* إخفاء أي عناصر غير مرغوبة */
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* الـ Ref هنا موضوع على الحاوية الخارجية (print-container)
         لكي يشمل التوسيط أثناء الطباعة
      */}
      <div ref={ticketRef} className="print-container">
        {/* أضفنا كلاس ticket-card هنا ليتم استهدافه في الطباعة */}
        <div className="ticket-card bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 transition-all duration-300">
          
          {/* Visual Header */}
          <div className="bg-stone-900 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FaTicket size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400 border border-stone-700 px-2 py-1 rounded">
                  Entry Pass
                </span>
                <FaTicket className="text-stone-400" />
              </div>
              <h2 className="text-2xl font-black leading-tight mb-2">
                {currentTicket.eventTitle}
              </h2>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 text-center min-w-20">
                <span className="block text-xs font-bold text-stone-400 uppercase">
                  {currentTicket.formattedDate?.month ?? ""}
                </span>
                <span className="block text-2xl font-black text-stone-900">
                  {currentTicket.formattedDate?.date ?? ""}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-stone-600 mb-1">
                  <FaClock size={16} className="text-blue-600" />
                  <span className="text-sm font-bold">{currentTicket.time}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <FaMapPin size={16} className="text-red-500" />
                  <span className="text-xs font-medium">
                    {currentTicket.address || "Online Event"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-stone-200 my-6"></div>

            <div className="grid grid-cols-2 gap-6 mb-8 px-4">
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                  Attendee
                </p>
                <p className="font-bold text-stone-900 truncate">
                  {currentTicket.attendee}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                  Status
                </p>
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold ${
                    currentTicket.isValid
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {currentTicket.isValid ? (
                    <FaCheckCircle size={12} />
                  ) : (
                    <FaExclamationCircle size={12} />
                  )}
                  {currentTicket.isValid ? "Valid" : "Invalid"}
                </div>
              </div>
            </div>

            {/* QR Section */}
            <div className="bg-stone-900 rounded-2xl p-6 text-center text-white relative">
              <div className="bg-white p-3 rounded-xl inline-block mb-3">
                <Image
                  src={currentTicket.qrCode}
                  alt={`QR Code for ticket ${currentTicket.id}`}
                  loading="lazy"
                  width={150}
                  height={150}
                  unoptimized
                  className="w-[150px] h-[150px]"
                />
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium mb-1">
                Scan at entrance
              </p>
              <p className="text-[10px] text-stone-600 font-mono break-all">
                Ord-{invoiceId}
              </p>
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <PrintButton
          contentRef={ticketRef}
          documentTitle={`Ticket-${currentTicket.eventTitle}`}
          label="Save as PDF"
          className="w-full"
        />
        <Link
          href={`/my-orders/receipt?invoice_id=${invoiceId}`}
          className="w-full flex items-center justify-center gap-2 bg-stone-100 text-stone-900 py-3 rounded-xl font-semibold border border-stone-300 hover:bg-stone-200 transition"
        >
          Go Back to Invoice Page
        </Link>
      </div>
    </div>
  );
}