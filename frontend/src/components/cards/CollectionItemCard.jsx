import React from "react";
import {
  Calendar,
  Truck,
  ShieldAlert,
  CircleCheckBig,
  Clock,
  CalendarOff,
} from "lucide-react";

const CollectionCard = ({
  item,
  calculateItemTotal,
  openCancelModal,
  handleRemoveItem,
  navigate,
}) => {
  // 🔒 REQUIRED GUARD — prevents white screen crashes
  if (!item || !item.itemId) {
    return null;
  }

  return (
    <div
      key={item._id}
      className="relative bg-white shadow-md shadow-gray-100 rounded-2xl p-3 hover:shadow-md transition"
    >
      <div className="flex gap-6 relative">
        <img
          alt="Item image"
          src={item.itemId.images?.[0] || "/placeholder.png"}
          className="w-36 h-36 bg-gray-100 object-contain rounded-xl"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-[16px]">
              {item.itemId.title || "Untitled Item"}
            </h2>

            <div className="text-[13px] mt-1 text-gray-700">
              <div className="flex items-center gap-1">
                Listed by {item.itemId.owner?.name || "Unknown"}
              </div>

              {/* STATUS BADGE */}
              <div
                className={`absolute top-1 right-0 inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full ${
                  item.status === "approved"
                    ? "bg-green-200 text-green-800"
                    : item.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.status === "approved" && (
                  <CircleCheckBig className="w-3 h-3" />
                )}
                {item.status === "pending" && <Clock className="w-3 h-3" />}
                {item.status !== "approved" &&
                  item.status !== "pending" && (
                    <CalendarOff className="w-3 h-3" />
                  )}

                <span>
                  {item.status === "approved"
                    ? "Approved"
                    : item.status === "pending"
                    ? "Waiting"
                    : "Not Booked Yet"}
                </span>
              </div>

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

                  {item.status !== "approved" &&
                    item.status !== "pending" && (
                      <div className="flex items-center gap-1 text-gray-800 text-[13px] mb-3">
                        <Calendar size={15} />
                        {item.daysAvailable ||
                          item.days ||
                          item.availableDays}{" "}
                        days available
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
                        Security Deposit (₱
                        {item.itemId.securityDeposit ?? 0})
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE PRICE INFO */}
                <div className="text-right text-[13px] flex flex-col gap-0.5">
                  <span className="font-bold text-[15px] text-purple-900">
                    ₱{item.itemId.pricePerDay ?? 0}/day
                  </span>

                  {(item.status === "approved" ||
                    item.status === "pending") &&
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
            {item.status === "approved" || item.status === "pending" ? (
              <button
                onClick={() => openCancelModal(item._id)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border border-red-300 bg-red-50 hover:bg-red-100"
              >
                Cancel Booking
              </button>
            ) : (
              <button
                onClick={() => handleRemoveItem(item.itemId._id)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border border-red-300 bg-red-50 hover:bg-red-100"
              >
                Remove from collection
              </button>
            )}

            {item.status === "approved" ? (
              <button
                onClick={() => alert(`Contacting owner`)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
              >
                Message Owner
              </button>
            ) : item.status === "pending" ? (
              <button
                onClick={() => navigate(`/edit-booking/${item._id}`)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
              >
                Edit Booking Details
              </button>
            ) : (
              <button
                onClick={() => navigate(`/booking/${item.itemId._id}`)}
                className="px-3 py-1.5 text-[12.5px] shadow-sm bg-[#7A1CA9] text-white rounded-full hover:bg-purple-800"
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
