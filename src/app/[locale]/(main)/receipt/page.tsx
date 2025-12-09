// import axiosInstance from "@/lib/axios";
import { FaCreditCard, FaDownload, FaReceipt, FaUsers } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

// const getData = async () => {
//   // const res = await axiosInstance.get(`/events/${eventId}`);
//   const checkout = await axiosInstance.get(
//     "/checkout/complete?session_id=cs_test_a1NDJyTIdZxQdzo2zdwxOGfrtAmMhrIbV852cTVa1sqM6yK93pL0ONS3UB"
//   );
//   // console.log(checkout);
//   return checkout;
// };
const event = {
  _id: "evt-992831",
  title: "Midnight Jazz Festival 2025",
  description: "Live at the Blue Note Pavilion",
  time: "20:00",
  location: {
    city: "Cairo",
    country: "Egypt",
    district: "New Cairo",
  },
  organizer: {
    firstName: "Neon Horizon",
    lastName: "Events",
  },
  ticketType: {
    ticketID: "vip-tier-1",
    title: "Standard Ticket",
    price: 145.0,
  },
};

// 2. Receipt Meta Data (The "Order")
const meta = {
  receiptNo: "N 842",
  purchaseDate: "10.24.2025 14:30",
  orderId: "ORD-992831",
  purchaserName: "Ahmed Mohamed", // The person who paid
  fees: 12.5,
  status: "active",
};

// 3. The Tickets Array (Linked to this Receipt)
const tickets = [
  {
    id: "tkt-001",
    attendee: "Ahmed Mohamed",
    seat: "Row A, Seat 12",
    type: "Standard Ticket",
    status: "valid",
  },
  {
    id: "tkt-002",
    attendee: "Sarah Karim",
    seat: "Row A, Seat 13",
    type: "Standard Ticket",
    status: "valid",
  },
];
const InvoiceCard = () => {
  const discountPerTicket = 0.5;
  const subtotal = event.ticketType.price * tickets.length;
  const totalDiscount = discountPerTicket * tickets.length;
  const total = subtotal + meta.fees - totalDiscount;

  const calculations = { subtotal, discountAmount: totalDiscount, total };
  return (
    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border border-stone-200 p-8 relative my-[50px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-600">
          <FaReceipt size={24} />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Payment Receipt</h2>
        <p className="text-stone-400 text-sm mt-1">{meta.purchaseDate}</p>
      </div>

      {/* Meta Data Table */}
      <div className="bg-stone-50 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Order ID</span>
          <span className="font-mono font-bold text-stone-800">
            {meta.orderId}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Receipt No</span>
          <span className="font-mono font-bold text-stone-800">
            {meta.receiptNo}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Purchaser</span>
          <span className="font-medium text-stone-800">
            {meta.purchaserName}
          </span>
        </div>
      </div>

      {/* Itemized List - Aggregated */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-bold text-stone-900">
              {event.ticketType.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <FaUsers size={12} className="text-stone-400" />
              <p className="text-xs text-stone-500">Qty: {tickets.length}</p>
            </div>
          </div>
          <p className="text-sm font-bold text-stone-900">
            ${calculations.subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-stone-500">
          <span>Service Fees</span>
          <span>${meta.fees.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-green-600">
          <span>Discount</span>
          <span>-${calculations.discountAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-stone-200 my-6"></div>

      {/* Total */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
            Total Paid
          </p>
          <div className="flex items-center gap-2 text-stone-500 text-xs">
            <FaCreditCard size={14} />
            <span>Visa •••• 4242</span>
          </div>
        </div>
        <span className="text-3xl font-black text-stone-900">
          ${calculations.total.toFixed(2)}
        </span>
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
      <div
        className="absolute -bottom-3.5 left-3.5 h-4 bg-stone-100 w-[calc(100%-25px)]"
        style={{
          clipPath:
            "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)",
        }}
      ></div>
    </div>
  );
};
export default InvoiceCard;
