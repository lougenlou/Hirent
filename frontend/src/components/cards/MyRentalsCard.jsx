import React from "react";
import {
    Calendar,
    MapPin,
    Eye,
    User,
    MessageCircle,
    CalendarPlus,
    CircleOff,
    BadgeCheck,
    CircleCheckBig,
    ClockFading,
    Truck,
} from "lucide-react";

// TODO: Backend must return:
// → item.ownerLocation
// → item.renterLocation
// → item.pricePerDay
// → item.shippingFee
// → item.discountPercent

const RentalCard = ({ item, onViewDetails, onRemove }) => {
    // Count rental days
    const countDays = () => {
        if (!item.bookedFrom || !item.bookedTo) return `${item.days || 1} day`;

        const from = new Date(item.bookedFrom);
        const to = new Date(item.bookedTo);

        const diff =
            Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

        return `${diff} day${diff > 1 ? "s" : ""}`;
    };

    // Calculate total (REAL DATA)
    const pricePerDay = Number(item.price || 0);

    const days = (() => {
        if (!item.bookedFrom || !item.bookedTo) return 1;
        const from = new Date(item.bookedFrom);
        const to = new Date(item.bookedTo);
        return Math.max(1, Math.floor((to - from) / 86400000) + 1);
    })();

    const shippingFee = Number(item.shipping || 0);
    const discountPercent = Number(item.discount || 0);
    const securityDeposit = Number(item.securityDeposit || 0);

    const subtotal = pricePerDay * days;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount + shippingFee + securityDeposit;

    return (
        <div className="relative bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition">

            <span
                className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 
                    ${
                        item.status === "approved"
                            ? "bg-purple-100 text-purple-700"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    }`}
            >
                {item.status === "approved" && <BadgeCheck className="w-4 h-4" />}
                {item.status === "pending" && <ClockFading className="w-4 h-4" />}
                {item.status === "cancelled" && <CircleOff className="w-4 h-4" />}
                {item.status === "completed" && <CircleCheckBig className="w-4 h-4" />}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>

            {/* CONTENT */}
            <div className="flex gap-5">
                <img
                    src={item.image}
                    className="w-32 h-32 object-cover rounded-lg"
                    alt={item.name}
                />

                <div className="flex-1 flex flex-col justify-between">

                    <div>
                        <h2 className="font-semibold text-[16px] flex items-center gap-2">
                            {item.name}
                            <span className="text-xs px-1 bg-purple-100 text-purple-700 rounded-md border">
                                {item.category}
                            </span>
                        </h2>

                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                            <User className="w-4 h-4" />
                            Listed by {item.ownerName || "Unknown Owner"}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            {item.ownerLocation || "Owner Location"}
                        </div>
                    </div>

                    {/* DATE */}
                    <div className="text-[13px] text-gray-900 mt-3">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {new Date(item.bookedFrom).toLocaleDateString()} →{" "}
                        {new Date(item.bookedTo).toLocaleDateString()}

                        <p className="text-yellow-600 flex gap-1 items-center mt-1">
                            <ClockFading className="w-4 h-4" />
                            {countDays()}
                        </p>
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-14">
                        <div>
                            <p className="text-xs text-gray-500">Rent per day</p>
                            <p className="text-[16px] font-bold text-purple-900">₱{pricePerDay}</p>
                        </div>

                        {item.status !== "cancelled" && (
                            <div>
                                <p className="text-xs text-gray-500">Total amount</p>
                                <p className="font-bold text-[16px] text-purple-900">
                                    ₱{total.toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-2 mt-2">

                        {(item.status === "approved" || item.status === "pending") && (
                            <>
                                <button
                                    onClick={() => onViewDetails(item.id)}
                                    className="px-3 py-1.5 border rounded-full text-xs hover:bg-gray-50 flex items-center"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View More Details
                                </button>

                                <button className="px-3 py-1.5 border rounded-full text-xs hover:bg-gray-50 flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Message Owner
                                </button>
                            </>
                        )}

                        {item.status === "cancelled" && (
                            <button
                                onClick={() => onRemove(item.id)}
                                className="px-3 py-1.5 border rounded-full text-xs text-red-600 border-red-300 bg-red-50 hover:bg-red-100"
                            >
                                Remove
                            </button>
                        )}

                        {item.status === "completed" && (
                            <button className="px-3 py-1.5 border rounded-full text-xs hover:bg-gray-50 flex items-center">
                                <CalendarPlus className="w-4 h-4 mr-1" />
                                Book Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalCard;
