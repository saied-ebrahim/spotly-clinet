// import Image from "next/image";

// export default function OnlineEventCard({ event }) {
//   return (
//     <div className="mb-10 bg-linear-to-r from-emerald-600  to-teal-500 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
//       <div className="relative lg:w-1/3 w-full h-48 lg:h-64">
//         <Image
//           src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
//           alt="Featured Webinar"
//           fill
//           className="rounded-lg w-full object-cover shadow-lg"
//         />
//       </div>
//       <div className="lg:w-2/3 text-white">
//         <span className="inline-block bg-yellow-300 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase">
//           {/* {Featured Webinar} */}
//           {event.category}
//         </span>
//         <h3 className="text-3xl font-extrabold mb-3">
//           {/* Next-Level Marketing Strategies 2026 */}
//           {event.title}
//         </h3>
//         <p className="mb-4 text-emerald-100">
//           {/* Join industry leaders for a live webinar on future-proofing your
//           digital marketing skills. Limited free slots available! */}
//           {event.description}
//         </p>
//         <div className="flex items-center space-x-6 text-sm">
//           <span className="flex items-center font-medium">
//             <i data-lucide="calendar" className="w-4 h-4 mr-1"></i>
//             {/* Mon, Dec 9,2025 */}
//             {event.date}
//           </span>
//           <span className="flex items-center font-medium">
//             <i data-lucide="users" className="w-4 h-4 mr-1"></i> 10k+ Registered
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";

export default function OnlineEventCard({ event }) {
  return (
    <div className="mb-10 bg-linear-to-r from-emerald-600 to-teal-500 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
      {/* Image Section */}
      <div className="relative lg:w-1/3 w-full h-48 lg:h-64">
        <Image
          src={event.image} // Connected to mock data
          alt={event.title} // Connected for better SEO/Accessibility
          fill
          className="rounded-lg w-full object-cover shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="lg:w-2/3 text-white">
        <span className="inline-block bg-yellow-300 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase">
          {event.category}
        </span>

        <h3 className="text-3xl font-extrabold mb-3">{event.title}</h3>

        <p className="mb-4 text-emerald-100">{event.description}</p>

        <div className="flex items-center space-x-6 text-sm">
          <span className="flex items-center font-medium">
            <i data-lucide="calendar" className="w-4 h-4 mr-1"></i>
            {event.date}
          </span>

          <span className="flex items-center font-medium">
            <i data-lucide="users" className="w-4 h-4 mr-1"></i>
            {/* Connected to mock data with a fallback just in case */}
            {event.registeredCount || "10k+"} Registered
          </span>
        </div>
      </div>
    </div>
  );
}
