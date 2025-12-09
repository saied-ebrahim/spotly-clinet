// "use client";

// import { useState, useEffect } from "react"; // Added useEffect
// import { createPortal } from "react-dom"; // 1. Import createPortal
// import { RxCross2 } from "react-icons/rx";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { BsChevronRight } from "react-icons/bs";
// import { EventDocument } from "@/types/eventInterface";
// import { performCheckout } from "./RedirectToCheckout";
// import { ToastContainer } from "react-toastify";

// export default function TicketsModal({
//   isOpen,
//   onClose,
//   event,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   event: EventDocument;
// }) {
//   const [quantity, setQuantity] = useState(1);
//   const [mounted, setMounted] = useState(false); // Track if component is mounted
//   const ticketPrice =
//     event.ticketType.price -
//     event.ticketType.price * (event.ticketType.discount || 0);

//   const handleIncrement = () => setQuantity((prev) => prev + 1);
//   const handleDecrement = () => {
//     if (quantity > 0) setQuantity((prev) => prev - 1);
//   };

//   //   . Prevent Hydration Error: Wait until client-side mount
//   const handleProceed = async () => {
//     const url = await performCheckout({
//       eventID: event._id,
//       quantity: quantity,
//       discount: event.ticketType.discount || 0,
//     });
//     console.log("url", url);
//     if (!url) return;
//     window.location.href = url as string;

//   };
//   useEffect(() => {
//     // eslint-disable-next-line
//     setMounted(true);
//   }, []);

//   // 3. If not open or not mounted yet, return null
//   if (!isOpen || !mounted) return null;

//   // 4. Wrap the entire JSX in createPortal(JSX, document.body)
//   return createPortal(
//     <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//       {/* Click outside handler */}
//       <div className="absolute inset-0" onClick={onClose}></div>

//       <div className="relative w-full max-w-[400px] bg-gray-50 rounded-lg shadow-xl overflow-hidden font-sans z-10">
//         {/* Header */}
//         <div className="bg-white flex justify-between items-center p-4 border-b border-gray-100">
//           <h2 className="text-lg font-medium text-gray-800">Select Tickets</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <RxCross2 size={24} />
//           </button>
//         </div>

//         {/* Body Content */}
//         <div className="p-4 min-h-[200px]">
//           <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 px-1">
//             <span>Ticket Types</span>
//             <span>Quantity</span>
//           </div>

//           <div className="bg-white shadow-sm border border-gray-100 flex justify-between items-center relative h-20">
//             <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-green-700"></div>
//             <div className="pl-5 flex flex-col justify-center">
//               <h3 className="font-semibold text-gray-800 text-base">
//                 Standard Ticket
//               </h3>
//               <p className="text-sm text-gray-500">
//                 EGP {ticketPrice.toFixed(2)}
//               </p>
//             </div>

//             <div className="pr-4 flex items-center gap-3">
//               <button
//                 onClick={handleDecrement}
//                 disabled={quantity === 0}
//                 className={`rounded-full border p-1.5 transition-colors ${
//                   quantity === 0
//                     ? "border-gray-200 text-gray-300"
//                     : "border-gray-400 text-gray-600 hover:border-gray-600"
//                 }`}
//               >
//                 <AiOutlineMinus size={14} />
//               </button>

//               <span className="text-xl font-medium w-4 text-center text-gray-800">
//                 {quantity}
//               </span>

//               <button
//                 onClick={handleIncrement}
//                 className="rounded-full border border-gray-400 text-gray-800 p-1.5 hover:border-gray-600 transition-colors"
//               >
//                 <AiOutlinePlus size={14} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-white p-4 border-t border-gray-100">
//           <div className="flex justify-center items-center gap-4 mb-4 text-lg">
//             <div className="font-medium text-gray-800">
//               Qty: <span className="font-semibold">{quantity}</span>
//             </div>
//             <div className="font-medium text-gray-800">
//               Total:{" "}
//               <span className="font-bold text-green-700">
//                 EGP {quantity * ticketPrice}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={handleProceed}
//             className="w-full bg-[#2c2e3e] hover:bg-[#232432] text-white py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors font-medium"
//           >
//             Proceed
//             <BsChevronRight strokeWidth={0.5} />
//           </button>
//         </div>
//       </div>
//         <ToastContainer />
//     </div>,
//     document.body // Target container
//   );
// }
//--------------
"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { createPortal } from "react-dom"; // 1. Import createPortal
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

import { EventDocument } from "@/types/eventInterface";
import { performCheckout } from "./RedirectToCheckout";

import { ToastContainer } from "react-toastify";

export default function TicketsModal({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: EventDocument;
}) {
  const [quantity, setQuantity] = useState(1);
  // const [ticketsLeft, setTicketsLeft] = useState(event.analytics.ticketsAvailable-quantity);
  const [mounted, setMounted] = useState(false); // Track if component is mounted
  const ticketPrice =
    event.ticketType.price -
    event.ticketType.price * (event.ticketType.discount || 0);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };
  // console.log("quantity", quantity);
  // console.log("event.analytics.ticketsAvailable >0", event.analytics.ticketsAvailable >0);
  //   . Prevent Hydration Error: Wait until client-side mount
  console.log("tickets left", event.analytics.ticketsAvailable - quantity);
  const handleProceed = async () => {
    const url = await performCheckout({
      eventID: event._id,
      quantity: quantity,
      discount: event.ticketType.discount || 0,
    });
    // console.log("url", url);
    if (!url) return;
    window.location.href = url as string;
  };
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // 3. If not open or not mounted yet, return null
  if (!isOpen || !mounted) return null;

  // 4. Wrap the entire JSX in createPortal(JSX, document.body)
  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Click outside handler */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-[400px] bg-gray-50 rounded-lg shadow-xl overflow-hidden font-sans z-10">
        {/* Header */}
        <div className="bg-white flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">Select Tickets</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 min-h-[200px] relative">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 px-1">
            <span>Ticket Types</span>
            <span>Quantity</span>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 flex justify-between items-center relative h-20">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-700"></div>
            <div className="pl-5 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-800 text-base">
                Standard Ticket
              </h3>
              <p className="text-sm text-gray-500">
                EGP {ticketPrice.toFixed(2)}
              </p>
            </div>

            <div className="pr-4 flex items-center gap-3">
              <button
                onClick={handleDecrement}
                disabled={quantity === 0}
                className={`rounded-full border p-1.5 transition-colors ${
                  quantity === 0
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-400 text-gray-600 hover:border-gray-600"
                }`}
              >
                <AiOutlineMinus size={14} />
              </button>

              <span className="text-xl font-medium w-4 text-center text-gray-800">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                disabled={
                  quantity === event.ticketType.quantity ||
                  event.analytics.ticketsAvailable - quantity === 0
                }
                className={`rounded-full border p-1.5 transition-colors ${
                  event.analytics.ticketsAvailable - quantity === 0
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-400 text-gray-600 hover:border-gray-600"
                }`}
              >
                <AiOutlinePlus size={14} />
              </button>
            </div>
            {event.analytics.ticketsAvailable - quantity < 15 && (
              <div className="absolute -bottom-15 left-[50%] translate-x-[-50%] text-sm font-semibold  bg-red-100 border border-red-500 p-2 rounded-[10px]">
                {`${event.analytics.ticketsAvailable - quantity} Tickets Left`}{" "}
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="bg-white p-4 border-t border-gray-100">
          <div className="flex justify-center items-center gap-4 mb-4 text-lg">
            <div className="font-medium text-gray-800">
              Qty: <span className="font-semibold">{quantity}</span>
            </div>
            <div className="font-medium text-gray-800">
              Total:{" "}
              <span className="font-bold text-green-700">
                EGP {quantity * ticketPrice}
              </span>
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="w-full bg-[#2c2e3e] hover:bg-[#232432] text-white py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors font-medium"
            // disabled={event.analytics.ticketsAvailable-quantity === 195}>
            disabled={event.analytics.ticketsAvailable > 0}
          >
            Proceed
            <BsChevronRight strokeWidth={0.5} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>,
    document.body // Target container
  );
}
