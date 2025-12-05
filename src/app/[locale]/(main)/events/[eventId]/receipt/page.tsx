
import { BsCreditCard, BsQrCode } from 'react-icons/bs';
import { FaClock, FaDownload, FaMapPin, FaUser } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';

function page() {
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
  const total = eventData.ticketType.price + eventData.ticketType.discount;

  
    return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans text-stone-800 transition-all duration-300">
      
      {/* Responsive Container:
        - Mobile: max-w-md (Vertical Receipt Look)
        - Desktop (md+): max-w-5xl (Horizontal Ticket Look)
      */}
      <div className="w-full max-w-md md:max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden relative flex flex-col md:flex-row transition-all duration-500 ease-in-out">
        
        {/* === SECTION 1: EVENT DETAILS (Top on Mobile / Left on Desktop) === */}
        <div className="flex-1 p-6 md:p-10 relative">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8 md:mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-2.5 rounded-xl shadow-lg">
                <FaTicket size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                 <span className="block font-bold text-lg md:text-xl tracking-tight leading-none capitalize">{eventData.organizer.firstName + " " + eventData.organizer.lastName}</span>
                 <span className="text-xs text-stone-400 font-medium tracking-wide uppercase">Official Ticket</span>
              </div>
            </div>
            {/* Mobile Only Receipt Info (Shown at top for quick ref) */}
            <div className="md:hidden text-right text-xs text-stone-400 font-mono">
              <p className="font-bold text-stone-600">#{eventData.ticketType.ticketID}</p>
              <p>{receiptMeta.purchaseDate}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Date Block */}
            <div className="lg:col-span-3 flex md:block">
               <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 text-center w-24 md:w-auto h-24 md:h-full flex flex-col justify-center items-center flex-shrink-0 mr-4 md:mr-0">
                  <span className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-widest mb-0 md:mb-1">Nov</span>
                  <span className="text-3xl md:text-5xl font-black text-stone-900 mb-0 md:mb-1">15</span>
                  <span className="hidden md:inline text-sm font-medium text-stone-500">Saturday</span>
               </div>
               
               {/* Mobile Title adjacent to date */}
               <div className="md:hidden flex flex-col justify-center">
                  <h1 className="text-2xl font-black text-stone-900 leading-tight">
                    {eventData.title}
                  </h1>
               </div>
            </div>

            {/* Event Info (Desktop layout) */}
            <div className="lg:col-span-9 flex flex-col justify-center">
              <h1 className="hidden md:block text-3xl md:text-4xl font-black text-stone-900 mb-2 leading-tight">
                {eventData.title}
              </h1>
              <p className="text-sm md:text-lg text-stone-500 mb-4 md:mb-6">{eventData.description}</p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 lg:gap-8">
                <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-stone-600 bg-stone-50 px-3 py-2 md:px-4 md:py-2 rounded-full border border-stone-100 w-fit">
                  <FaClock size={16} className="text-blue-600 md:w-[18px] md:h-[18px]" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-stone-600 bg-stone-50 px-3 py-2 md:px-4 md:py-2 rounded-full border border-stone-100 w-fit">
                  <FaMapPin size={16} className="text-red-500 md:w-[18px] md:h-[18px]" />
                  <span>{eventData.location.district}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-100 my-6 md:my-8"></div>

          {/* Attendee Info */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="bg-stone-100 p-2 md:p-3 rounded-full">
                  <FaUser size={20} className="text-stone-500 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-stone-400 uppercase font-bold tracking-wider mb-0.5">Attendee</p>
                  <p className="font-bold text-base md:text-lg text-stone-900">{receiptMeta.attendee}</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:flex gap-4 md:gap-8">
                <div>
                  <p className="text-[10px] md:text-xs text-stone-400 uppercase font-bold tracking-wider mb-0.5">Type</p>
                  {/* <p className="font-medium text-sm md:text-base text-stone-700">{ticketData.ticketType}</p> */}
                  <p className="font-medium text-sm md:text-base text-stone-700">{"Standard Ticket"}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-stone-400 uppercase font-bold tracking-wider mb-0.5">Seat</p>
                  <p className="font-medium text-sm md:text-base text-stone-700">{"Row A, Seat 12"}</p>
                </div>
             </div>
          </div>
        </div>


        {/* === THE TEAR LINE (Responsive) === */}
        {/* Desktop: Vertical dashed line with notches top/bottom 
            Mobile: Horizontal dashed line with notches left/right
        */}
        {/* <div className="relative md:w-0 md:border-l-2 border-dashed border-stone-300 w-full h-0 border-t-2 md:border-t-0 md:my-6"> */}
          {/* Top Notch (Desktop) / Left Notch (Mobile) */}
          {/* <div className="absolute 
            md:-top-9 md:-left-3 md:ml-0 md:mt-0 
            -left-3 -top-3 
            w-6 h-6 bg-stone-100 rounded-full z-10">
          </div> */}
          
          {/* Bottom Notch (Desktop) / Right Notch (Mobile) */}
          {/* <div className="absolute 
            md:-bottom-9 md:-left-3 md:right-auto md:ml-0 md:mb-0 
            -right-3 -top-3 
            w-6 h-6 bg-stone-100 rounded-full z-10">
          </div>
        </div> */}
         <div className="relative md:w-0 md:border-l-2 border-dashed border-stone-300 w-full h-auto border-t-2 md:border-t-0 my-0 md:my-6">
          {/* Top/Left Notch */}
          <div className="absolute top-0 md:-top-6 left-0 md:-left-3 -ml-3 md:ml-0 -mt-3 md:mt-0 w-6 h-6 bg-stone-100 rounded-full z-10"></div>
          {/* Bottom/Right Notch */}
          <div className="absolute right-0 md:bottom-0 md:-right-3 md:left-auto md:-ml-3 -mr-3 md:mr-0 -mt-3 md:mb-0 w-6 h-6 bg-stone-100 rounded-full z-10 hidden md:block" style={{bottom: '-24px'}}></div>
           {/* Mobile Right Notch */}
           <div className="md:hidden absolute right-0 -mr-3 -mt-3 w-6 h-6 bg-stone-100 rounded-full z-10"></div>
        </div>


        {/* === SECTION 2: RECEIPT STUB (Bottom on Mobile / Right on Desktop) === */}
        <div className="w-full md:w-80 bg-stone-50 p-6 md:p-8 flex flex-col md:border-none">
          
          {/* Receipt Metadata (Desktop mainly, simplified on mobile) */}
          <div className="mb-6 space-y-1 hidden md:block">
             <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Receipt</span>
                <span className="font-mono text-xs font-bold text-stone-600">{eventData.ticketType.ticketID}</span>
             </div>
             <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Date</span>
                <span className="font-mono text-xs text-stone-500">{receiptMeta.purchaseDate.split(' ')[0]}</span>
             </div>
             <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Order ID</span>
                <span className="font-mono text-xs text-blue-600 font-bold">#{eventData.ticketType.ticketID.split('-')[1]}</span>
             </div>
             <div className="border-t border-stone-200 mt-4 mb-2"></div>
          </div>

          {/* Pricing Compact */}
          <div className="space-y-2 mb-auto">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Ticket</span>
                <span>${eventData.ticketType.price.toFixed(0)}</span>
              </div>
              {/* <div className="flex justify-between text-sm text-stone-500">
                <span>Fees</span>
                <span>${eventData.ticketType.fees.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between text-sm text-green-600">
                <span>Disc</span>
                <span>-${Math.abs(eventData.ticketType.discount).toFixed(0)}</span>
              </div>
              <div className="border-t border-dashed border-stone-300 my-3 pt-2">
                <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-stone-900">Total</span>
                    <span className="text-xl font-bold text-stone-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 justify-end">
                    <BsCreditCard size={12} className="text-stone-400"/>
                    <span className="text-[10px] text-stone-400 font-mono">VISA •••• 4242</span>
                </div>
              </div>
          </div>

          {/* QR Code */}
          <div className="mt-6 md:mt-8 bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center">
             <BsQrCode size={100} className="text-stone-900 mb-2 w-20 h-20 md:w-24 md:h-24" />
             <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Scan for Entry</p>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
             <button className="flex items-center justify-center gap-2 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors">
              <FaDownload size={14} />
              PDF
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors">
              <FiShare2 size={14} />
              Share
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default page