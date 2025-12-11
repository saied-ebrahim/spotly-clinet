// import axiosInstance from "@/lib/axios";
// "use client";
// import { useEffect, useState } from "react";
"use client";
import axiosInstance from "@/lib/axios";
import { formatDate } from "@/utils/details/formatting";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCreditCard, FaDownload, FaReceipt, FaTicketAlt, FaUsers } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

// const getData = async () => {
//   // const res = await axiosInstance.get(`/events/LE{eventId}`);
//   const checkout = await axiosInstance.get(
//     "/checkout/complete?session_id=cs_test_a1NDJyTIdZxQdzo2zdwxOGfrtAmMhrIbV852cTVa1sqM6yK93pL0ONS3UB"
//   );
//   // console.log(checkout);
//   return checkout;
// };


const InvoiceCard = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoice_id");
  // const invoice = await axiosInstance.get(`/invoice/LE{invoiceId}`);
  console.log(invoiceId);


  const [invoiceData, setInvoiceData] = useState({orderId: "", eventTitle: "", totalPrice: 0,quantity: 0,date: "",eventId: "",fees: 0,discount: 0, purchaserName: "" }); 
  const getData = async () => {
    let res = await axiosInstance.get(`/tickets/order/${invoiceId}`);
    console.log(res.data.data);
    let invoice = {
      orderId: res.data.data.order.id.slice(5),
      totalPrice: res.data.data.checkout.totalAmount,
      quantity: res.data.count,
      date: res.data.data.checkout.paidAt,
      eventId: res.data.data.order.eventID.slice(5),
      eventTitle: res.data.data.tickets[0].event.title,
      fees: res.data.data?.fees || 100,
      discount: res.data.data?.discount || 0,
      purchaserName: res.data.data.tickets[0].user.firstName + " " + res.data.data.tickets[0].user.lastName,
    };
    setInvoiceData(invoice);
  };
  const formattedDate = formatDate(invoiceData.date);
  useEffect(() => {
    getData();
  }, []);
  console.log(invoiceData);
  if (!invoiceData.orderId) return <div>Loading...</div>;
  return (
    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border border-stone-200 p-8 relative my-[50px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-600">
          <FaReceipt size={24} />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Payment Receipt</h2>
        <p className="text-stone-400 text-sm mt-1">{formattedDate}</p>
      </div>

      {/* Meta Data Table */}
      <div className="bg-stone-50 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Order ID</span>
          <span className="font-mono font-bold text-stone-800">
            {invoiceData.orderId}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Event ID</span>
          <span className="font-mono font-bold text-stone-800">
            {invoiceData.eventId}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Purchaser</span>
          <span className="font-medium text-stone-800">
            {invoiceData.purchaserName}
          </span>
        </div>
      </div>

      {/* Itemized List - Aggregated */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-bold text-stone-900">
              {invoiceData.eventTitle}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <FaUsers size={12} className="text-stone-400" />
              <p className="text-xs text-stone-500">Qty: {invoiceData.quantity}</p>
            </div>
          </div>
          <p className="text-sm font-bold text-stone-900">
            {invoiceData.totalPrice}LE
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-stone-500">
          <span>Service Fees</span>
          <span>{invoiceData.fees.toFixed(2)}LE</span>
        </div>

        <div className="flex justify-between items-center text-sm text-green-600">
          <span>Discount</span>
          <span>-{invoiceData.discount.toFixed(2)}LE</span>
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
          {invoiceData.totalPrice.toFixed(2)}LE
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 bg-stone-900 rounded-xl text-sm font-bold text-white hover:bg-stone-800 transition-colors">
          <FaDownload size={16} />
          PDF
        </button>
      <Link className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors" href={`/receipt/tickets?invoice_id=${invoiceId}`}>
        <button className="flex gap-2">
          <FaTicketAlt size={16} />
         see tickets
        </button>
      </Link>
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
