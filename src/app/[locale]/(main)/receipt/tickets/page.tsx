// import React from "react";
"use client";
import axiosInstance from "@/lib/axios";
import { Ticket } from "@/types/Tickets/ticketResponseInterfaces";
import { getMonthDay } from "@/utils/details/formatting";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaExclamationCircle,
  FaMapPin,
  FaQrcode,
} from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";

// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { BsQrCode, BsTicketDetailed } from "react-icons/bs";
// import { FaCalendar } from "react-icons/fa6";

// export default function TicketListPage() {
//   // 1. Core Event Data
//   const eventData = {
//     _id: "evt-992831",
//     title: "Midnight Jazz Festival 2025",
//     description: "Live at the Blue Note Pavilion",
//     date: "Saturday, Nov 15, 2025",
//     time: "20:00",
//     location: {
//       city: "Cairo",
//       country: "Egypt",
//       district: "New Cairo",
//     },
//   };

//   // 2. Receipt/Order Meta Data
//   const receiptMeta = {
//     orderId: "ORD-992831",
//     status: "active",
//   };

//   // 3. The Tickets Array
//   const tickets = [
//     {
//       id: "tkt-001",
//       attendee: "Ahmed Mohamed",
//       seat: "Row A, Seat 12",
//       type: "Standard Ticket",
//       status: "valid",
//     },
//     {
//       id: "tkt-002",
//       attendee: "Sarah Karim",
//       seat: "Row A, Seat 13",
//       type: "Standard Ticket",
//       status: "valid",
//     },
//     {
//       id: "tkt-003",
//       attendee: "Omar Khaled",
//       seat: "Row A, Seat 14",
//       type: "Standard Ticket",
//       status: "redeemed",
//     },
//   ];

//   // Handler for navigation (In Next.js, use router.push)
//   const handleTicketClick = (ticketId: string) => {
//     // console.log(`Maps to /tickets/${ticketId}`);
//     // router.push(`/tickets/${ticketId}`);
//   };

//   return (
//     <div className="min-h-screen bg-stone-100 flex flex-col items-center py-12 px-4 font-sans text-stone-800">
//       <div className="w-full max-w-md mx-auto">
//         {/* Page Navigation Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <button className="p-2 -ml-2 rounded-full text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors">
//             <FaArrowLeft size={20} />
//           </button>
//           <h1 className="text-lg font-bold text-stone-900">Your Tickets</h1>
//         </div>

//         {/* Event Summary Card */}
//         <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 mb-6 text-center relative overflow-hidden">
//           {/* Decorative background element */}
//           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
//             <BsTicketDetailed size={100} />
//           </div>

//           <h2 className="text-xl font-black text-stone-900 mb-2 relative z-10">
//             {eventData.title}
//           </h2>

//           <div className="flex items-center justify-center gap-2 text-stone-500 text-sm font-medium relative z-10">
//             <FaCalendar size={14} />
//             <span>
//               {eventData.date} • {eventData.time}
//             </span>
//           </div>

//           <div className="mt-5 flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-stone-400 relative z-10">
//             <div>{tickets.length} Tickets</div>
//             <div className="w-px bg-stone-200"></div>
//             <div>Order #{receiptMeta.orderId.split("-")[1]}</div>
//           </div>
//         </div>

//         {/* Ticket List */}
//         <div className="space-y-3">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               onClick={() => handleTicketClick(ticket.id)}
//               className="group bg-white rounded-2xl p-4 shadow-sm border border-stone-200 hover:border-stone-900 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
//             >
//               {/* Mini QR Placeholder / Icon */}
//               <div className="bg-stone-50 rounded-xl w-14 h-14 flex-shrink-0 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors">
//                 <BsQrCode size={22} />
//               </div>

//               {/* Info */}
//               <div className="flex-grow min-w-0">
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="font-bold text-stone-900 truncate pr-2 text-sm">
//                     {ticket.attendee}
//                   </h3>
//                   {/* Status Badge */}
//                   <span
//                     className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
//                       ticket.status === "valid"
//                         ? "bg-green-50 text-green-700"
//                         : "bg-stone-100 text-stone-500"
//                     }`}
//                   >
//                     {ticket.status}
//                   </span>
//                 </div>
//                 <p className="text-xs text-stone-500 mb-1">{ticket.type}</p>
//                 <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
//                   <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] text-stone-500">
//                     {ticket.seat}
//                   </span>
//                 </div>
//               </div>

//               {/* Action Arrow */}
//               <FaArrowRight
//                 size={16}
//                 className="text-stone-300 group-hover:text-stone-900 transition-colors"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
//------------------------------
interface TicketObj {
  id: string;
  eventTitle: string;
  isValid: boolean;
  date: string;
  time: string;
  address?: string;
  attendee: string;
  qrCode: string;
}

const TicketCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiptTickets, setReceiptTickets] = useState<TicketObj[]>([]);
  // const currentTicket = invoiceTickets[currentIndex];
  const currentTicket = receiptTickets[currentIndex];
  const searchParams = useSearchParams();

  const invoiceId = searchParams.get("invoice_id");
  // const getData = async () => {
  //   let res = await axiosInstance.get(`/tickets/order/${invoiceId}`);
  //   console.log(res.data.data);
  //   setReceiptTickets(res.data.data.tickets);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    const fetchInvoiceTickets = async () => {
      const response = await axiosInstance.get(`/tickets/order/${invoiceId}`);
      const data: Ticket[] = await response.data.data.tickets;

      console.log(data);
      const ticketObj: TicketObj[] = data.map((ticket, index) => {
        try {
          const address =
            (ticket.event.location?.address as string) || "online";
          console.log("Processed Address:", address);
          return {
            id: ticket.id,
            eventTitle: ticket.event.title,
            isValid: !ticket.isVerified,
            date: ticket.event.date,
            time: ticket.event.time,
            address: address,
            attendee: ticket.user.firstName + " " + ticket.user.lastName,
            qrCode: ticket.qrCode,
          };
        } catch (error) {
          console.error(
            `CRITICAL ERROR mapping ticket at index ${index}`,
            ticket
          );
          console.error(error);
          throw error;
        }
      });
      setReceiptTickets(ticketObj);
    };
    fetchInvoiceTickets();
  }, []);
  const nextTicket = () => {
    setCurrentIndex((prev) => (prev + 1) % receiptTickets.length);
  };

  const prevTicket = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + receiptTickets.length) % receiptTickets.length
    );
  };
  if (!receiptTickets.length) return <div>Loading...</div>;
  return (
    <div className="w-full max-w-md mx-auto my-[50px]">
      {/* Navigation Controls (Only if multiple tickets) */}
      {receiptTickets.length > 1 && (
        <div className="flex justify-between items-center mb-4 px-2">
          <button
            onClick={prevTicket}
            className="p-2 rounded-full bg-white shadow-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FaChevronLeft size={20} />
          </button>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Ticket {currentIndex + 1} of {receiptTickets.length}
          </span>
          <button
            onClick={nextTicket}
            className="p-2 rounded-full bg-white shadow-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 transition-all duration-300">
        {/* Visual Header / Banner */}
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
            <p className="text-stone-400 text-sm font-medium">
              ID : {currentTicket.id}
            </p>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          {/* Date & Time Row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 text-center min-w-20">
              <span className="block text-xs font-bold text-stone-400 uppercase">
                {getMonthDay(currentTicket.date).month}
              </span>
              <span className="block text-2xl font-black text-stone-900">
                {getMonthDay(currentTicket.date).date}
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
                  {/* {event.location.district}, {event.location.city} */}
                  {currentTicket.address ? currentTicket.address : "online"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-stone-200 my-6"></div>

          {/* Seat & Attendee Info (DYNAMIC PER TICKET) */}
          <div className="grid grid-cols-2 gap-6 mb-8 px-4">
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                Attendee
              </p>
              <p className="font-bold text-stone-900 truncate">
                {currentTicket.attendee}
              </p>
            </div>
            {/* <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                Seat Location
              </p>
              <p className="font-bold text-stone-900">{currentTicket.seat}</p>
            </div> */}
            {/* <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                Ticket Type
              </p>
              <p className="font-medium text-sm text-stone-600">
                {currentTicket.type}
              </p>
            </div> */}
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                Status
              </p>
              <div className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold">
                {currentTicket.isValid ? (
                  <FaCheckCircle size={12} />
                ) : (
                  <FaExclamationCircle size={12} />
                )}
                {currentTicket.isValid ? "Valid" : "Invalid"}
              </div>
            </div>
          </div>

          {/* QR Section (Specific to this ticket ID) */}
          <div className="bg-stone-900 rounded-2xl p-6 text-center text-white relative">
            <div className="bg-white p-3 rounded-xl inline-block mb-3">
              <Image
                src={currentTicket.qrCode}
                alt="QR Code"
                width={120}
                height={120}
              />
            </div>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium mb-1">
              Scan at entrance
            </p>
            <p className="text-[10px] text-stone-600 font-mono break-all">
              Ord-{invoiceId}
            </p>

            {/* Circles for "Holes" */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketCarousel;
