// src/components/ownerdashboard/BookingTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function BookingTable({
  sampleBookings,
  getRenterAvatar,
  itemImages,
  paymentIcons,
  ActionsDropdown,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-purple-900 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Bookings</h2>
          <p className="text-sm text-gray-500">Manage all your booking activity</p>
        </div>

        <div>
          <button
            onClick={() => navigate("/owner/bookings")}
            className="px-3 py-1.5 border text-sm rounded-lg hover:bg-gray-50"
          >
            See All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b">
            <tr className="text-gray-400 font-normal">
              <th className="px-6 py-3 font-normal">Booking ID</th>
              <th className="px-6 py-3 font-normal">Item & Price</th>
              <th className="px-6 py-3 font-normal">Renter</th>
              <th className="px-6 py-3 font-normal">Booked Date</th>
              <th className="px-6 py-3 font-normal">Payment Method</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 font-normal">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {sampleBookings.map((row, i) => (
              <tr key={row.id} className="hover:bg-purple-50 transition">
                {/* Booking ID */}
                <td className="px-6 py-4">
                  <span className="text-gray-600">{row.id}</span>
                </td>

                {/* Item */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={itemImages[row.itemKey]}
                        alt={row.item}
                        className="w-10 h-10 object-contain"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{row.item}</span>
                      {row.pricePerDay && (
                        <span className="text-[13px] text-gray-500">
                          ₱ {row.pricePerDay} per day
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Renter */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={getRenterAvatar(row.renter, i)}
                      alt={row.renter}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{row.renter}</span>
                      <span className="text-xs text-gray-500">{row.renterEmail}</span>
                    </div>
                  </div>
                </td>

                {/* Booked Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{row.bookedDate}</span>
                  </div>
                </td>

                {/* Payment Method */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={paymentIcons[row.paymentMethod.toLowerCase()]}
                      alt={row.paymentMethod}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{row.paymentMethod}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      row.status === "Completed"
                        ? "bg-green-50 text-green-500"
                        : row.status === "Cancelled"
                        ? "bg-red-50 text-red-500"
                        : row.status === "Pending"
                        ? "bg-yellow-50 text-yellow-500"
                        : row.status === "Active"
                        ? "bg-orange-50 text-orange-500"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <ActionsDropdown booking={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
