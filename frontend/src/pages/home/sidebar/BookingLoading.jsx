import React from "react";
import { useNavigate } from "react-router-dom";

const BookingLoading = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center mb-12">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">
          Booking in Progress
        </h1>
        <p className="text-gray-700 mb-6">
          You have items in your collection. Go to your Collection to book them or continue browsing other items.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/collection")}
            className="bg-purple-800 hover:bg-purple-800 text-white px-6 py-2 rounded-xl transition"
          >
            Go to Collection
          </button>
          <button
            onClick={() => navigate("/browse")}
            className="border border-purple-800 text-purple-800 px-6 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingLoading;
