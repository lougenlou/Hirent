import React from "react";
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

import { Circle, CircleCheck, Clock, CircleSlash } from "lucide-react";

const statusMap = {
  Approved: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Completed: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
  Active: "bg-green-100 text-green-600",
  Cancelled: "bg-red-50 text-red-600",
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
  itemImages,
  getRenterAvatar,
  paymentIcons,
  ActionsDropdown,
}) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-50/60 text-[13px] font-normal text-gray-700 border-b">
            {[
              "ID",
              "Item & Price",
              "Renter",
              "Booked Dates",
              "Status",
              "Actions",
            ].map((h) => {
              let pxClass = "px-2";

              if (h === "ID") pxClass = "px-6";

              if (h === "Status") pxClass = "px-4";
              if (h === "Actions") pxClass = "px-4";

              return (
                <th key={h} className={`${pxClass} py-3 text-left`}>
                  {h}
                </th>
              );
            })}
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => {
            const isOpen = expandedRow === b.id;
            return (
              <React.Fragment key={b.id}>
                {/* MAIN ROW */}
                <tr className="hover:bg-purple-50 transition">
                  {/* BOOKING ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600 text-[13px] font-medium">
                      {b.id}
                    </span>
                  </td>

                  {/* ITEM & PRICE */}
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img
                          src={itemImages?.[b.itemKey] || b.itemImage}
                          alt={b.item}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[13px] text-gray-900">
                          {b.item}
                        </span>
                        {b.pricePerDay && (
                          <span className="text-[13px] text-gray-500">
                            ₱ {b.pricePerDay} per day
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* RENTER */}
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={getRenterAvatar?.(b.renter, i) || ""}
                        alt={b.renter.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-[13px] text-gray-900">
                          {b.renter.name}
                        </span>
                        <span className="text-[13px] text-gray-500">
                          {b.renter.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* BOOKED DATES */}
                  <td className="px-2 py-4">
                    <div className="flex items-center text-[13px] text-gray-600 gap-2">
                      <HiOutlineCalendar className="w-4 h-4 text-gray-600" />
                      <span>
                        {formatDate(b.startDate)} – {formatDate(b.endDate)}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        statusMap[b.status]
                      }`}
                    >
                      {b.status === "Active" && <Circle className="w-2 h-2 text-green-500" fill="currentColor" />}
                      {b.status === "Completed" && (
                        <CircleCheck className="w-3 h-3" />
                      )}
                      {b.status === "Pending" && <Clock className="w-3 h-3" />}
                      {b.status === "Cancelled" && (
                        <CircleSlash className="w-3 h-3" />
                      )}
                      {b.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    {ActionsDropdown ? (
                      <ActionsDropdown booking={b} />
                    ) : b.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => onApprove(b)}
                          className="px-2 py-1 bg-green-50 border border-green-200 text-green-600 text-[13px] font-medium rounded-lg hover:bg-green-100 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(b)}
                          className="px-2 py-1 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium rounded-lg hover:bg-red-100 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </td>

                  {/* EXPAND BUTTON */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setExpandedRow(isOpen ? null : b.id)}
                      className="text-gray-500 hover:text-purple-700 transition"
                    >
                      {isOpen ? (
                        <HiOutlineChevronUp className="w-5 h-5" />
                      ) : (
                        <HiOutlineChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* EXPANDED DETAILS */}
                <tr>
                  <td colSpan="8" className="px-6 py-0">
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-[1000px] opacity-100 py-6"
                          : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {/* RENTER DETAILS */}
                        <div>
                          <h4 className="font-semibold text-[15px] mb-3">
                            Renter Information
                          </h4>
                          <div className="space-y-3 text-sm">
                            {[
                              ["Full Name", b.renter.name],
                              ["Email Address", b.renter.email],
                              ["Contact Number", b.renter.phone],
                              ["Complete Address", b.renter.address],
                            ].map(([label, value]) => (
                              <div key={label}>
                                <span className="text-gray-500 text-xs block">
                                  {label}
                                </span>
                                <p className="font-medium">{value}</p>
                              </div>
                            ))}
                            <div>
                              <span className="text-gray-500 text-xs block">
                                Rating
                              </span>
                              <div className="flex items-center gap-2">
                                <StarRating rating={b.renter.rating} />
                                <span className="text-xs font-semibold">
                                  {b.renter.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BOOKING DETAILS */}
                        <div>
                          <h4 className="font-semibold text-[15px] mb-3">
                            Booking Details
                          </h4>
                          <div className="space-y-3 text-sm">
                            <Detail
                              label="From Date"
                              value={formatDate(b.startDate)}
                            />
                            <Detail
                              label="To Date"
                              value={formatDate(b.endDate)}
                            />
                            <Detail label="Duration" value={b.duration} />
                            <div>
                              <span className="text-gray-500 text-xs block">
                                Payment Method
                              </span>
                              <span className="inline-block bg-blue-600 text-white font-semibold text-[13px] px-2 py-1 rounded mt-1">
                                {b.paymentMethod}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* PRICE SUMMARY */}
                        <div>
                          <h4 className="font-semibold text-[15px] mb-3">
                            Price Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <SummaryRow
                              label="Subtotal"
                              value={`₱ ${b.subtotal}`}
                            />
                            <SummaryRow
                              label="Shipping"
                              value={`₱ ${b.shipping}`}
                            />
                            {b.discount && (
                              <SummaryRow
                                label="Discount"
                                value={`₱ ${b.discount}`}
                                className="text-green-600"
                              />
                            )}
                            {b.securityDeposit && (
                              <SummaryRow
                                label="Security Deposit"
                                value={`₱ ${b.securityDeposit}`}
                                className="text-yellow-600"
                              />
                            )}
                            <div className="flex justify-between border-t pt-3 mt-3">
                              <span className="font-bold">Total</span>
                              <span className="font-bold text-lg">
                                ₱ {b.total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Small reusable components
function Detail({ label, value }) {
  return (
    <div>
      <span className="text-gray-500 text-xs block">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, className = "" }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
