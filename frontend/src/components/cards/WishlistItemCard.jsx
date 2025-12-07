import React from "react";
import { MapPin, Calendar, ShoppingBag } from "lucide-react";

const WishlistItemCard = ({ item, removeFromWishlist, onAddToCollection }) => {
  return (
    <div className="relative rounded-2xl shadow-sm hover:shadow-lg p-3 transition-all bg-white text-purple-900 w-full max-w-[270px]">
      {/* Remove Button */}
      <button
        onClick={() => removeFromWishlist(item.id)}
        className="absolute top-1 right-1 shadow-md text-red-500 hover:text-red-700 px-2 py-1 text-[13px] font-medium border border-red-300 rounded-full bg-white z-20"
      >
        Remove
      </button>

      {/* Image */}
      <div className="relative w-full h-40 bg-gray-100 mx-auto rounded-xl mb-3 flex items-center justify-center overflow-hidden text-purple-900">
        <img
          src={item.image}
          className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
        />

        {item.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        {item.sale && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            Sale
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-bold text-[15px]">{item.name}</h3>
        <p className="text-[13px] text-gray-500 mb-2">by {item.owner}</p>

        <div className="flex items-center gap-1 text-gray-600 text-[13px] mb-1">
          <MapPin size={15} />
          {item.location}
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-[13px] mb-3">
          <Calendar size={15} />
          {item.daysAvailable || item.days || item.availableDays} days available
        </div>

        <p className="text-[#7A1CA9] font-bold text-[18px] mb-4">{item.price}</p>

        {/* Add to collection */}
        <button
          onClick={() => onAddToCollection(item)}
          className="w-full bg-[#7A1CA9] px-3 py-2 text-[13px] text-white border rounded-full hover:bg-purple-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to collection
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
