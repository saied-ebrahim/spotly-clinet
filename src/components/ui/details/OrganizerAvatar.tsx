// import { EventDocument } from "@/types/eventInterface";
// import Image from "next/image";

// const OrganizerAvatar = ({ event }: { event: EventDocument }) => {
//   const organizer = event.organizer;
//   const isThereAvatar = Boolean(organizer?.avatar);
  
//   // Safe extraction of initials
//   const firstName = organizer?.firstName || "";
//   const lastName = organizer?.lastName || "";
//   // Get first char of each, join them, and uppercase just in case
//   const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

//   return (
//     <section className="space-y-4">
             
//               <div className="p-4 gap-2  bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap items-center justify-between hover:shadow-md transition-shadow duration-300">
//                 <h2 className="text-xl font-semibold text-gray-900">Hosted by</h2>
//                 <div className="flex items-center gap-4 grow sm:flex-nowrap">
//                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-200 flex items-center justify-center shrink-0">
//       {isThereAvatar ? (
//         <Image
//           src={organizer?.avatar as string}
//           alt={`${firstName} ${lastName}`}
//           fill
//           className="object-cover"
//           sizes="48px"
//         />
//       ) : (
//         <span className="text-gray-600 font-semibold text-lg select-none">
//           {initials || "?"}
//         </span>
//       )}
//     </div>
                 
//                   <span className="font-bold text-gray-900">
//                     {`${firstName} ${lastName}`}
//                   </span>
//                 </div>
              
//               </div>
//             </section>
//   );
// };

// export default OrganizerAvatar;


//----------------
// import { EventDocument } from "@/types/eventInterface";

// const OrganizerAvatar = ({ event }: { event: EventDocument }) => {
//   const organizer = event.organizer;
//   const isThereAvatar = Boolean(organizer?.avatar);

//   // Safe extraction of initials
//   const firstName = organizer?.firstName || "";
//   const lastName = organizer?.lastName || "";
//   const fullName = `${firstName} ${lastName}`.trim() || "Unknown Organizer";
  
//   // Get first char of each, join them, and uppercase
//   const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

//   return (
//     <div className="w-full">
//       <div className="group flex flex-col p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
        
//         {/* Label */}
//         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
//           Hosted By
//         </span>

//         <div className="flex items-center gap-4">
//           {/* Avatar Container */}
//           <div className="relative w-14 h-14 rounded-full ring-2 ring-white shadow-sm shrink-0 overflow-hidden">
//             {isThereAvatar ? (
//               <img
//                 src={organizer?.avatar as string}
//                 alt={fullName}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               // Gradient Placeholder
//               <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-bold text-xl select-none tracking-tight">
//                   {initials || "?"}
//                 </span>
//               </div>
//             )}
            
//             {/* Optional: Online/Verified Status Indicator */}
//             <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
//           </div>

//           {/* Name & Role */}
//           <div className="flex flex-col">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
//               {fullName}
//             </h3>
//             <p className="text-sm text-gray-500 font-medium">
//               Event Organizer
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OrganizerAvatar;

//---------------
import { EventDocument } from "@/types/eventInterface";

const OrganizerAvatar = ({ event }: { event: EventDocument }) => {
  const organizer = event.organizer;
  const isThereAvatar = Boolean(organizer?.avatar);

  // Safe extraction of initials
  const firstName = organizer?.firstName || "";
  const lastName = organizer?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Unknown Organizer";
  
  // Get first char of each, join them, and uppercase
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
        
        {/* Avatar Container */}
        <div className="relative shrink-0">
          <div className="relative w-16 h-16 rounded-full ring-4 ring-gray-50 shadow-sm overflow-hidden">
            {isThereAvatar ? (
              <img
                src={organizer?.avatar as string}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              // Gradient Placeholder
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl select-none tracking-tight">
                  {initials || "?"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Hosted by
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
            {fullName}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
             Event Organizer
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default OrganizerAvatar;

