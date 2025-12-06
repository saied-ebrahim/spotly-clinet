
import axiosInstance from '@/lib/axios';
import { BsCreditCard, BsQrCode } from 'react-icons/bs';
import { FaClock, FaDownload, FaMapPin, FaReceipt, FaUser } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { FiCreditCard, FiShare2 } from 'react-icons/fi';

let getData = async () => {
  // const res = await axiosInstance.get(`/events/${eventId}`);
  const checkout = await axiosInstance.get("/checkout/complete?session_id=cs_test_a1NDJyTIdZxQdzo2zdwxOGfrtAmMhrIbV852cTVa1sqM6yK93pL0ONS3UB");
  console.log(checkout);
  return checkout;
}

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
async function ReceiptPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border border-stone-200 p-8 relative my-[25px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-600">
          <FaReceipt size={24} />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Payment Receipt</h2>
        <p className="text-stone-400 text-sm mt-1">{receiptMeta.purchaseDate}</p>
      </div>

      {/* Meta Data Table */}
      <div className="bg-stone-50 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Order ID</span>
          <span className="font-mono font-bold text-stone-800">{receiptMeta.orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Receipt No</span>
          <span className="font-mono font-bold text-stone-800">{receiptMeta.receiptNo}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Billed To</span>
          <span className="font-medium text-stone-800">{receiptMeta.attendee}</span>
        </div>
      </div>

      {/* Itemized List */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
           <div>
             <p className="text-sm font-bold text-stone-900">{eventData.ticketType.title}</p>
             <p className="text-xs text-stone-500">Qty: {eventData.ticketType.quantity}</p>
           </div>
           <p className="text-sm font-bold text-stone-900">${eventData.ticketType.price.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-stone-500">
           <span>Service Fees</span>
           <span>${eventData.ticketType.price.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-green-600">
           <span>Discount</span>
           <span>-${eventData.ticketType.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-stone-200 my-6"></div>

      {/* Total */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Total Paid</p>
          <div className="flex items-center gap-2 text-stone-500 text-xs">
            <FiCreditCard size={14} />
            <span>Visa •••• 4242</span>
          </div>
        </div>
        <span className="text-3xl font-black text-stone-900">${eventData.ticketType.price.toFixed(2)}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 bg-stone-900 rounded-xl text-sm font-bold text-white hover:bg-stone-800 transition-colors">
          <FaDownload size={16} />
          PDF
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors">
          <FiShare2 size={16} />
          Share
        </button>
      </div>

      {/* Decor: Zigzag bottom */}
      <div className="absolute -bottom-2 left-0 w-full h-4 bg-stone-100" 
           style={{
             clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'
           }}>
      </div>
    </div>
  );
};

export default ReceiptPage