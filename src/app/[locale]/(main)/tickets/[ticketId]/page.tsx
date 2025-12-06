import { EventDocument } from "@/types/eventInterface";
import { BsQrCode } from "react-icons/bs";
import { FaCheckCircle, FaClock, FaMusic } from "react-icons/fa";
import { FaMapPin, FaTicket } from "react-icons/fa6";

const eventData = {
  _id: "evt-992831",
  title: "Midnight Jazz Festival 2025",
  description: "Live at the Blue Note Pavilion",
  date: "Saturday, Nov 15, 2025",
  time: "20:00",
  type: "Hybrid",
  location: {
    city: "Cairo",
    country: "Egypt",
    district: "New Cairo",
    latitude: 40.7128,
    longitude: -74.0060
  },
  media: {
    mediaType: "image",
    mediaUrl: "https://example.com/poster.jpg"
  },
  tags: [
    { _id: "t1", name: "Jazz" },
    { _id: "t2", name: "Nightlife" }
  ],
  favorites: ["user123"],
  category: [
    { _id: "c1", name: "Music" }
  ],
  organizer: {
    _id: "org-001",
    firstName: "Neon Horizon",
    lastName: "Events"
  },
  ticketType: {
    ticketID: "vip-tier-1",
    title: "Standard Ticket",
    price: 145.00,
    quantity: 1,
    discount: 0.5
  },
  analytics: {
    ticketsSold: 450,
    ticketsAvailable: 50,
    totalRevenue: 65250,
    waitingListCount: 12,
    likes: 890,
    dislikes: 4
  }
};
const receiptMeta = {
  receiptNo: "N 842",
  purchaseDate: "10.24.2025 14:30",
  orderId: "ORD-992831",
  attendee: "Ahmed Mohamed",
  seat: "Row A, Seat 12",
  
};

export default function Ticket (params: {ticketId: string}) {
  const {ticketId} = params;
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md mx-auto border border-stone-100">
      {/* Visual Header / Banner */}
      <div className="bg-stone-900 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <FaMusic size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <span className="text-xs font-bold tracking-widest uppercase text-stone-400 border border-stone-700 px-2 py-1 rounded">
               Entry Pass
             </span>
             <FaTicket className="text-stone-400" />
          </div>
          <h2 className="text-2xl font-black leading-tight mb-2">{eventData.title}</h2>
          <p className="text-stone-400 text-sm font-medium">{eventData.organizer.firstName} {eventData.organizer.lastName}</p>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6">
        {/* Date & Time Row */}
        <div className="flex items-center gap-4 mb-6">
           <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 text-center min-w-[80px]">
              <span className="block text-xs font-bold text-stone-400 uppercase">Nov</span>
              <span className="block text-2xl font-black text-stone-900">15</span>
           </div>
           <div>
             <div className="flex items-center gap-2 text-stone-600 mb-1">
               <FaClock size={16} className="text-blue-600" />
               <span className="text-sm font-bold">{eventData.time}</span>
             </div>
             <div className="flex items-center gap-2 text-stone-600">
               <FaMapPin size={16} className="text-red-500" />
               <span className="text-xs font-medium">{eventData.location.district}, {eventData.location.city}</span>
             </div>
           </div>
        </div>

        <div className="border-t border-dashed border-stone-200 my-6"></div>

        {/* Seat & Attendee Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
           <div>
             <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Attendee</p>
             <p className="font-bold text-stone-900 truncate">{receiptMeta.attendee}</p>
           </div>
           <div>
             <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Seat Location</p>
             <p className="font-bold text-stone-900">{receiptMeta.seat}</p>
           </div>
           <div>
             <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Ticket Type</p>
             <p className="font-medium text-sm text-stone-600">{eventData.ticketType.ticketID}</p>
           </div>
           <div>
             <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Status</p>
             <div className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold">
               <FaCheckCircle size={12} />
               Valid
             </div>
           </div>
        </div>

        {/* QR Section (Moved to Ticket for Entry) */}
        <div className="bg-stone-900 rounded-2xl p-6 text-center text-white relative">
          <div className="bg-white p-3 rounded-xl inline-block mb-3">
             <BsQrCode size={120} className="text-black" />
          </div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium mb-1">Scan at entrance</p>
          <p className="text-[10px] text-stone-600 font-mono break-all">{receiptMeta.orderId}</p>
          
          {/* Circles for "Holes" */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};