"use client";

import { useRef } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/details/formatting";
import { FaReceipt, FaTicketAlt, FaUsers } from "react-icons/fa";
import PrintButton from "./PrintButton";

interface InvoiceData {
  orderId: string;
  eventTitle: string;
  totalPrice: number;
  quantity: number;
  date: string;
  eventId: string;
  fees: number;
  discount: number;
  purchaserName: string;
}

interface ReceiptCardProps {
  invoiceData: InvoiceData;
  invoiceId: string;
}

export default function ReceiptCard({ invoiceData, invoiceId }: ReceiptCardProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const formattedDate = formatDate(invoiceData.date);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}} />
      <div className="min-h-screen bg-stone-100 py-8 px-4">
        <div
          ref={receiptRef}
          className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border border-stone-200 p-8 relative"
        >
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
              {invoiceData.totalPrice == 0 ? "FREE" : `${invoiceData.totalPrice}LE`}
            </p>
          </div>

          <div className="flex justify-between items-center text-sm text-stone-500">
            <span>Service Fees</span>
            <span>{invoiceData.fees.toFixed(2)}LE</span>
          </div>

          <div className="flex justify-between items-center text-sm text-green-600">
            <span>Discount</span>
            <span>{invoiceData.discount.toFixed(2)}LE</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-stone-200 my-6"></div>

        {/* Total */}
        {invoiceData.totalPrice == 0 ? (
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-3xl font-black text-stone-600">
                FREE
              </p>
            </div>
          </div>
        ) : (
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
              Total Paid
            </p>
          </div>
          <span className="text-3xl font-black text-stone-900">
            {invoiceData.totalPrice.toFixed(2)}LE
          </span>
        </div>
        )}
        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 no-print">
          <PrintButton
            contentRef={receiptRef}
            documentTitle={`Receipt-${invoiceData.orderId}`}
            label="Save as PDF"
            className="text-sm font-bold"
            variant="default"
          />
          <Link
            className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors"
            href={`/receipt/tickets?invoice_id=${invoiceId}`}
          >
            <FaTicketAlt size={16} />
            see tickets
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
      </div>
    </>
  );
}

