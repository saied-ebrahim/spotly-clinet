
"use client";
import useFavoriteStore from "@/hooks/useFavorateStore";
import { EventDocument } from "@/types/eventInterface";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

   const FavoriteBtn = ({event}: {event: EventDocument}) => {
     const [isAnimating, setIsAnimating] = useState(false);
  const {favorites, toggleFavorite } = useFavoriteStore();
  const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleFavorite(event);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300); // 300ms matches CSS duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
//   const isFavorite = useFavoriteStore((state) =>
//     state.favorites.includes(event)
// );
    //    let {favorites, toggleFavorite} = useFavoriteStore();
    let isLiked = favorites.some((favorite) => favorite._id === event._id);
    return (
         <button
                onClick={handleAddFavorites}
                className={`p-3 rounded-full transition-all active:scale-95 border border-gray-200   ${
                isLiked
                ? "bg-red-50 text-yellow-500 hover:bg-yellow-100"
                : "bg-white/90 text-gray-400 hover:text-yellow-500 hover:bg-white"
                }
                ${
                isAnimating
                ? "scale-125 shadow-md ring-2 ring-yellow-100"
                : "hover:scale-110 active:scale-95"
                }`}
                >
                <FaStar
                className={`w-5 h-5 ${
                isLiked ? "text-yellow-500 fill-yellow-500 " : "text-gray-600"
                }`}
                />
                </button>
    );
}
 export default FavoriteBtn;