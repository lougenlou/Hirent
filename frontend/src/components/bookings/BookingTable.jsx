import React from "react";
import { HiOutlineCalendar, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const statusMap = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-700",
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4"
          fill={star <= Math.floor(rating) ? "#facc15" : "none"}
          stroke="#facc15"
          viewBox="0 0 24 24"
        >
          <polygon
            points="12 4 15 10 22 10.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 10.5 9 10"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
        </svg>
      ))}
    </div>
  );
}

export default function BookingTable({
  bookings,
  expandedRow,
  setExpandedRow,
  onApprove,
  onReject,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-white text-xs font-bold text-gray-600">
            <th className="px-7 py-4 text-left">Item</th>
            <th className="px-7 py-4 text-left">Renter</th>
            <th className="px-7 py-4 text-left">Price</th>
            <th className="px-7 py-4 text-left">Booked Dates</th>
            <th className="px-7 py-4 text-left">Actions</th>
            <th className="px-7 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <React.Fragment key={booking.id}>
              <tr className="border-t hover:bg-purple-50 transition">
                <td className="px-7 py-4 flex gap-3 items-center">
                  <img
                    src={booking.itemImage}
                    alt={booking.item}
                    className="w-10 h-10 object-cover rounded shadow bg-gray-100"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40?text=Item";
                    }}
                  />
                  <div>
                    <div className="font-bold text-sm text-gray-900">{booking.item}</div>
                    <div className="text-xs text-gray-400">{booking.category}</div>
                  </div>
                </td>
                <td className="px-7 py-4">
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                      {booking.renter.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        {booking.renter.name}
                      </div>
                      <div className="text-xs text-gray-400">{booking.renter.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-7 py-4 min-w-[110px]">
                  <div className="font-bold text-purple-700">{booking.price}</div>
                  {booking.discount && (
                    <div className="text-xs text-green-500">{booking.discount}</div>
                  )}
                </td>
                <td className="px-7 py-4 text-xs font-medium text-gray-800">
                  <div className="flex gap-2 items-center">
                    <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
                    {formatDate(booking.bookedDates)} - {formatDate(booking.bookedDateEnd)}
                  </div>
                </td>
                <td className="px-7 py-4">
                  <div className="flex gap-2">
                    {booking.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onApprove(booking)}
                          className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition flex items-center gap-1"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => onReject(booking)}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition flex items-center gap-1"
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}
                    {booking.status === "Approved" && (
                      <span className={`px-4 py-2 rounded-lg font-bold text-xs ${statusMap[booking.status]}`}>
                        Approved
                      </span>
                    )}
                    {booking.status === "Rejected" && (
                      <span className={`px-4 py-2 rounded-lg font-bold text-xs ${statusMap[booking.status]}`}>
                        Rejected
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-7 py-4 text-right">
                  <button
                    onClick={() =>
                      setExpandedRow(expandedRow === booking.id ? null : booking.id)
                    }
                    className="text-gray-500 hover:text-purple-700 transition"
                    aria-label={`${expandedRow === booking.id ? 'Collapse' : 'Expand'} booking details`}
                  >
                    {expandedRow === booking.id ? (
                      <HiOutlineChevronUp className="w-5 h-5" />
                    ) : (
                      <HiOutlineChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>

              {expandedRow === booking.id && (
                <tr className="bg-gray-50 border-t">
                  <td colSpan="6" className="px-7 py-6">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Renter Information */}
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-3">
                          Renter Information
                        </h4>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Full Name</span>
                            <div className="font-semibold">{booking.renter.name}</div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Email Address</span>
                            <div className="font-semibold">{booking.renter.email}</div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Contact Number</span>
                            <div className="font-semibold">{booking.renter.phone}</div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Complete Address</span>
                            <div className="font-semibold">{booking.renter.address}</div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Rating</span>
                            <div className="flex items-center gap-2">
                              <StarRating rating={booking.renter.rating} />
                              <span className="text-xs font-semibold">{booking.renter.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-3">
                          Booking Details
                        </h4>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">From Date</span>
                            <div className="font-semibold">
                              {formatDate(booking.bookedDates)}
                            </div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">To Date</span>
                            <div className="font-semibold">
                              {formatDate(booking.bookedDateEnd)}
                            </div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Duration</span>
                            <div className="font-semibold">{booking.duration}</div>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs mb-1">Payment Method</span>
                            <div className="inline-flex items-center bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded mt-1">
                              {booking.paymentMethod}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-3">
                          Price Summary
                        </h4>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">{booking.subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-semibold">{booking.shipping}</span>
                          </div>
                          {booking.discountPercent && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span className="font-semibold">{booking.discountPercent}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-3 border-t border-gray-300 mt-3">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-lg">{booking.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
