import React from "react";
import {
  Calendar,
  Truck,
  ShieldAlert,
  CircleCheckBig,
  Clock,
  CalendarOff,
  MapPin,
} from "lucide-react";

const CollectionCard = ({
  item,
  calculateItemTotal,
  openCancelModal,
  handleRemoveItem,
  navigate,
}) => {
  const handleActionClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const booking = item.booking;
  const itemData = item.itemId;

  const status = booking?.status;

  const countDays = () => {
    if (!booking?.duration) return "1 day";
    return `${booking.duration} day${booking.duration > 1 ? "s" : ""}`;
  };

  const canCancel = () => {
    if (!booking) return false;
    const today = new Date();
    const startDate = new Date(booking.startDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (
      diffDays >= 1 &&
      (booking.status === "pending" || booking.status === "approved")
    );
  };

  const statusStyles = {
    approved: "bg-purple-100 text-purple-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusIcons = {
    approved: <CircleCheckBig className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    cancelled: <CalendarOff className="w-3 h-3" />,
    completed: <CircleCheckBig className="w-3 h-3" />,
  };

  return (
    <div
      key={item._id}
      className="relative bg-white shadow-md shadow-gray-100 rounded-2xl p-3 hover:shadow-md transition"
    >
      <div className="flex gap-6 relative">
        <img
  src={item.itemId?.images?.[0] || "/placeholder.png"}
  className="w-36 h-36 bg-gray-100 object-contain rounded-xl"
/>


        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-[16px] flex items-center gap-2">
              {item.itemId?.title || "Unknown Title"}
<span className="text-xs px-1 bg-purple-100 text-purple-700 rounded-md border">
  {item.itemId?.category || "Uncategorized"}
</span>

            </h2>

            <div className="text-[13px] mt-1 text-gray-700">
              <div className="flex justify-start items-center text-[13px] text-gray-600 mt-1">
                <span>Listed by {item.itemId?.owner?.name || "Unknown"}</span>

                <span className="flex items-center ml-4 gap-1 text-[13px] text-gray-600">
                  <MapPin size={14} className="text-gray-500" />
                  {item.itemId?.zone}, {item.itemId?.location},{" "}
                  {item.itemId?.province}
                </span>
              </div>

              {/* STATUS BADGE */}
              {status && (
                <span
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    statusStyles[status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {statusIcons[status]}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )}

              {/* DETAILS SECTION */}
              <div className="flex justify-between items-start gap-4 mt-2 text-[13px] text-gray-950">
                <div className="flex flex-col gap-1">
                  {item.bookedFrom && item.bookedTo && (
                    <>
                      <p className="text-[13px] text-gray-900 font-semibold">
                        Date booked
                      </p>
                      <div className="flex items-center gap-1 text-gray-800 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {item.bookedFrom} - {item.bookedTo}
                        </span>
                      </div>
                    </>
                  )}

                  {status !== "approved" && status !== "pending" && (
                    <div className="flex items-center gap-1 text-gray-800 text-sm mb-3">
                      <Calendar size={15} />
                      {item.itemId?.minimumRentalDays &&
                      item.itemId?.maximumRentalDays
                        ? `${item.itemId.minimumRentalDays} - ${item.itemId.maximumRentalDays} days`
                        : item.daysAvailable ||
                          item.days ||
                          item.availableDays}{" "}
                      available
                    </div>
                  )}

                  <div className="flex items-center text-[12px] gap-2 text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      <span>
                        {item.shipping > 0
                          ? `Delivery (₱${Math.round(item.shipping)})`
                          : "Delivery (Free)"}
                      </span>
                    </div>

                    <span className="text-[10px] text-gray-400">•</span>

                    <div className="flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4" />
                      <span>
                        Security Deposit (₱{item.itemId?.securityDeposit || 0})
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE PRICE INFO */}
                <div className="text-right text-[13px] flex flex-col gap-0.5">
                  <span className="font-bold text-[15px] text-purple-900">
                    ₱{item.itemId?.pricePerDay || 0}/day
                  </span>

                  {(status === "approved" || status === "pending") &&
                    (() => {
                      const itemTotals = calculateItemTotal(item);
                      const totalWithDeposit =
                        itemTotals.total + (item.securityDeposit || 0);

                      return (
                        <div className="flex justify-between w-full text-[13px] gap-1">
                          <span className="text-gray-500">
                            Subtotal{" "}
                            <span className="text-gray-900">
                              ₱{itemTotals.subtotal}
                            </span>
                          </span>

                          <span className="text-gray-500">
                            Total{" "}
                            <span className="font-semibold text-gray-900">
                              ₱{totalWithDeposit}
                            </span>
                          </span>
                        </div>
                      );
                    })()}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="absolute bottom-1 right-0 flex items-center gap-1.5">
            {status === "approved" || status === "pending" ? (
              <button
                onClick={() => openCancelModal(booking._id)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border border-red-300 bg-red-50 hover:bg-red-100"
              >
                Cancel Booking
              </button>
            ) : (
              <button
                onClick={() => handleRemoveItem(itemData._id)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border border-red-300 bg-red-50 hover:bg-red-100"
              >
                Remove
              </button>
            )}

            {status === "approved" ? (
              <button
                onClick={() =>
                  alert(`Contacting owner: ${itemData.owner?.name}`)
                }
                className="px-3 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
              >
                Message Owner
              </button>
            ) : status === "pending" ? (
              <button
                onClick={() => navigate(`/edit-booking/${booking._id}`)}
                className="px-3 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
              >
                Edit Booking Details
              </button>
            ) : (
              <button
                onClick={() => navigate(`/booking/${itemData._id}`)}
                className="px-3 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
              >
                Continue to Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
