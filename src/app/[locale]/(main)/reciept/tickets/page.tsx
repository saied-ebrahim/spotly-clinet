import React from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BsQrCode, BsTicketDetailed } from 'react-icons/bs';
import { FaCalendar } from 'react-icons/fa6';

export default function TicketListPage() {
  // 1. Core Event Data
  const eventData = {
    _id: "evt-992831",
    title: "Midnight Jazz Festival 2025",
    description: "Live at the Blue Note Pavilion",
    date: "Saturday, Nov 15, 2025",
    time: "20:00",
    location: {
      city: "Cairo",
      country: "Egypt",
      district: "New Cairo",
    },
  };

  // 2. Receipt/Order Meta Data
  const receiptMeta = {
    orderId: "ORD-992831",
    status: "active",
  };

  // 3. The Tickets Array
  const tickets = [
    {
      id: "tkt-001",
      attendee: "Ahmed Mohamed",
      seat: "Row A, Seat 12",
      type: "Standard Ticket",
      status: "valid"
    },
    {
      id: "tkt-002",
      attendee: "Sarah Karim",
      seat: "Row A, Seat 13",
      type: "Standard Ticket",
      status: "valid"
    },
    {
      id: "tkt-003",
      attendee: "Omar Khaled",
      seat: "Row A, Seat 14",
      type: "Standard Ticket",
      status: "redeemed"
    }
  ];

  // Handler for navigation (In Next.js, use router.push)
  const handleTicketClick = (ticketId:string) => {
    console.log(`Maps to /tickets/${ticketId}`);
    // router.push(`/tickets/${ticketId}`);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center py-12 px-4 font-sans text-stone-800">
      
      <div className="w-full max-w-md mx-auto">
        
        {/* Page Navigation Header */}
        <div className="flex items-center gap-3 mb-6">
           <button className="p-2 -ml-2 rounded-full text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors">
              <FaArrowLeft size={20} />
           </button>
           <h1 className="text-lg font-bold text-stone-900">Your Tickets</h1>
        </div>

        {/* Event Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 mb-6 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <BsTicketDetailed size={100} />
          </div>

          <h2 className="text-xl font-black text-stone-900 mb-2 relative z-10">{eventData.title}</h2>
          
          <div className="flex items-center justify-center gap-2 text-stone-500 text-sm font-medium relative z-10">
             <FaCalendar size={14} />
             <span>{eventData.date} • {eventData.time}</span>
          </div>
          
          <div className="mt-5 flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-stone-400 relative z-10">
             <div>{tickets.length} Tickets</div>
             <div className="w-px bg-stone-200"></div>
             <div>Order #{receiptMeta.orderId.split('-')[1]}</div>
          </div>
        </div>

        {/* Ticket List */}
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id} 
              onClick={() => handleTicketClick(ticket.id)}
              className="group bg-white rounded-2xl p-4 shadow-sm border border-stone-200 hover:border-stone-900 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
            >
              {/* Mini QR Placeholder / Icon */}
              <div className="bg-stone-50 rounded-xl w-14 h-14 flex-shrink-0 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                 <BsQrCode size={22} />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                 <div className="flex justify-between items-start mb-1">
                   <h3 className="font-bold text-stone-900 truncate pr-2 text-sm">{ticket.attendee}</h3>
                   {/* Status Badge */}
                   <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                     ticket.status === 'valid' 
                       ? 'bg-green-50 text-green-700' 
                       : 'bg-stone-100 text-stone-500'
                   }`}>
                     {ticket.status}
                   </span>
                 </div>
                 <p className="text-xs text-stone-500 mb-1">{ticket.type}</p>
                 <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] text-stone-500">
                      {ticket.seat}
                    </span>
                 </div>
              </div>

              {/* Action Arrow */}
              <FaArrowRight size={16} className="text-stone-300 group-hover:text-stone-900 transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}