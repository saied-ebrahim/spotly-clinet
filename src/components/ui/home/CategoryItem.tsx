// import Image from "next/image";
// // Mock data based on the image provided
// const categories = [
//   {
//     name: "Entertainment",
//     imageUrl: "https://placehold.co/150x150/1F2937/ffffff?text=Music",
//     color: "text-indigo-600",
//   },
//   {
//     name: "Educational & Business",
//     imageUrl: "https://placehold.co/150x150/4B5563/ffffff?text=Crowd",
//     color: "text-gray-600",
//   },
//   {
//     name: "Cultural & Arts",
//     imageUrl: "https://placehold.co/150x150/EF4444/ffffff?text=Colors",
//     color: "text-red-600",
//   },
//   {
//     name: "Sports & Fitness",
//     imageUrl: "https://placehold.co/150x150/10B981/ffffff?text=Stadium",
//     color: "text-green-600",
//   },
//   {
//     name: "Technology & Innovation",
//     imageUrl: "https://placehold.co/150x150/3B82F6/ffffff?text=Tech",
//     color: "text-blue-600",
//   },
//   {
//     name: "Travel & Adventure",
//     imageUrl: "https://placehold.co/150x150/F59E0B/ffffff?text=Tent",
//     color: "text-yellow-600",
//   },
// ];
// // Main App component for full file generation
// const Categories = () => {
//   return (
//     <section className="max-w-7xl mx-auto py-12">
//       <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 px-4 sm:px-0">
//         Explore Categories
//       </h2>
//       {/* Category Carousel Container */}
//       {/* Enables horizontal scrolling and hides scrollbar on smaller screens */}
//       <div className="flex justify-evenly overflow-x-auto space-x-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar pt-4">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center group cursor-pointer w-[120px] sm:w-[150px] flex-shrink-0 transition transform hover:scale-105 duration-300"
//             role="button"
//             tabIndex="0"
//           >
//             {/* Image Circle */}
//             {/* <div className="w-full h-[120px] sm:h-[150px] rounded-full overflow-hidden shadow-xl ring-4 ring-white transition duration-300 group-hover:ring-indigo-500">
//               <Image
//                 src={category.imageUrl}
//                 alt={category.name}
//                 width={150}
//                 height={150}
//                 className="w-full h-full object-cover"
//                 // Placeholder fallback for potential image load errors
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://placehold.co/150x150/CCCCCC/000000?text=Category";
//                 }}
//               />
//             </div> */}
//             <div className="w-full h-[120px] sm:h-[150px] rounded-full overflow-hidden shadow-xl ring-4 ring-white transition duration-300 group-hover:ring-indigo-500 relative">
//               <Image
//                 // 2. Use the state variable here, not the direct prop
//                 src="/event.jpg"
//                 // src={category.imageUrl}
//                 alt={category.name}
//                 width={150}
//                 height={150}
//                 className="w-full h-full object-cover"
//                 // 3. Update state on error
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://placehold.co/150x150/CCCCCC/000000?text=Category";
//                 }}
//               />
//             </div>
//             {/* Category Name */}
//             <p
//               className={`mt-4 text-sm sm:text-base font-semibold text-center text-gray-700 transition duration-300 group-hover:${category.color} leading-snug`}
//             >
//               {category.name}
//             </p>
//           </div>
//         ))}
//       </div>
//       {/* Custom styles to hide the scrollbar for aesthetics */}
//       <style jsx="true">{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// };
// export default Categories;
//------------------------------------
//------------------------------------
//------------------------------------
"use client";
import { CategoryItemInterface } from "@/types/CategoryInterface";
import Image from "next/image";

// interface Category {
//   imageUrl: string;
//   title: string;
//   ringColor: string;
//   categoryColor: string;
// }

// 2. Individual Category Item Component
export const CategoryItem = ({
  category,
}: {
  category: CategoryItemInterface;
}) => {
  // console.log(category);
  // const [imgSrc, setImgSrc] = useState(category.imageUrl);
  return (
    // Updated Width Classes:
    // Mobile: w-[calc(50%-8px)] -> Fits 2 items with gap-4 (16px/2 = 8px)
    // Tablet (md): w-[calc(25%-18px)] -> Fits 4 items with gap-6 (3*24px/4 = 18px)
    // Widescreen (xl): w-[calc(14.28%-21px)] -> Fits 7 items with gap-6 (6*24px/7 = ~20.5px)
    <div
      className="group flex flex-col items-center cursor-pointer snap-start shrink-0 
                    w-[calc(50%-8px)] 
                    md:w-[calc(25%-18px)] 
                    xl:w-[calc(14.28%-21px)]"
    >
      {/* Circle Container - Responsive sizing */}
      <div
        className={`relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden shadow-lg border-4 border-white transition-all duration-300 transform hover:scale-110 ${category.ringColor} ring-2 ring-transparent`}
      >
        {/* <img
              src={imgSrc}
              alt={category.name}
              className="w-full h-full object-cover"
              onError={() => {
                setImgSrc("https://placehold.co/150x150/CCCCCC/000000?text=Error");
              }}
            /> */}
        <Image
          src={category.imageUrl}
          alt={category.title}
          fill
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement;
          //   target.onerror = null;
          //   target.src =
          //     "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
          // }}
        />
      </div>

      {/* Label */}
      <span
        className={`mt-4 text-sm sm:text-base font-bold text-gray-700 transition-colors duration-300 ${category.categoryColor} text-center px-1 truncate w-full rounded-xl`}
      >
        {/* {category.name} */}
        {category.title}
      </span>
    </div>
  );
};
