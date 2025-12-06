"use client";

import {
  FiX,
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import { Order } from "@/types/order";

interface ViewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function ViewOrderModal({
  isOpen,
  onClose,
  order,
}: ViewOrderModalProps) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all my-8">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Order Details</h3>
            <p className="text-sm text-slate-500 mt-1">ID: {order._id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Customer Information */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-brand-primary">
              <FiUser /> Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Full Name
                </span>
                <p className="text-slate-800 font-medium">
                  {order.userID.firstName} {order.userID.lastName}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email
                </span>
                <p className="text-slate-800">{order.userID.email}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phone
                </span>
                <p className="text-slate-800">{order.userID.phone}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Gender
                </span>
                <p className="text-slate-800 capitalize">
                  {order.userID.gender}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-brand-primary">
              <FiMapPin /> Location
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Country
                  </span>
                  <p className="text-slate-800 capitalize">
                    {order.userID.address.country}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    City
                  </span>
                  <p className="text-slate-800 capitalize">
                    {order.userID.address.city}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    State
                  </span>
                  <p className="text-slate-800 capitalize">
                    {order.userID.address.state}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-brand-primary">
              <FiShoppingBag /> Order Summary
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Quantity
                  </span>
                  <span className="text-2xl font-bold text-slate-800">
                    {order.quantity}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Discount
                  </span>
                  <span className="text-lg font-medium text-green-600">
                    {order.discount}%
                  </span>
                </div>
                <div className="col-span-2 md:col-span-2 text-right">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-brand-primary">
                    ${order.totalAfterDiscount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Ticket Type ID
                  </span>
                  <code className="text-xs bg-white px-2 py-1 rounded border border-slate-200 w-fit text-slate-600">
                    {order.ticketTypeID}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="flex flex-col md:flex-row gap-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <FiCalendarItem
                label="Created At"
                value={formatDate(order.createdAt)}
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const FiCalendarItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <FiCalendar />
    <span>
      {label}: <span className="font-medium text-slate-700">{value}</span>
    </span>
  </div>
);
