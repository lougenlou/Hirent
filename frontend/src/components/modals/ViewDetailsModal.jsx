import { useEffect, useState } from "react";
import {
    CalendarCheck,
    CalendarClock,
    MapPin,
    CreditCard,
    Package,
    Truck,
    DollarSign,
    CheckCircle2,
    Clock,
    Tag,
    Percent,
    ShieldAlert,
} from "lucide-react";

import TruckIcon from "../../assets/delivery.png";
import DeliveryTrackingModal from "./DeliveryTrackingModal";
import CancelConfirmationModal from "./CancelModal";

function ImageWithFallback({ src, alt, className }) {
    const [error, setError] = useState(false);
    return (
        <img
            src={error ? "https://via.placeholder.com/150" : src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
}

// TODO: Ensure rentalData includes: image, ownerLocation, renterLocation, price, shippingFee, etc.

const deliverySteps = [
    { key: "pending", label: "Order Confirmed", icon: CheckCircle2 },
    { key: "preparing", label: "Preparing Item", icon: Package },
    { key: "in-transit", label: "In Transit", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const pickupSteps = [
    { key: "pending", label: "Order Confirmed", icon: CheckCircle2 },
    { key: "preparing", label: "Preparing Item", icon: Package },
    { key: "ready-pickup", label: "Ready for Pickup", icon: CheckCircle2 },
];

export function ViewDetailsModal({ isOpen, onClose, itemId, rentalData }) {
    const [iconAnimated, setIconAnimated] = useState(false);
    const [rental, setRental] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isTrackingOpen, setIsTrackingOpen] = useState(false);

    // Animate truck icon
    useEffect(() => {
        setIconAnimated(isOpen);
    }, [isOpen]);

    // Load rental details (REAL DATA)
    useEffect(() => {
        if (isOpen && itemId && rentalData) {
            const found = rentalData.find((r) => r.id === itemId);
            setRental(found || null);
        }
    }, [isOpen, itemId, rentalData]);

    if (!isOpen || !rental) return null;

    // Determine delivery method
    const steps =
        rental.delivery?.deliveryType === "shipping"
            ? deliverySteps
            : pickupSteps;

    const currentStepIndex = steps.findIndex(
        (s) => s.key === rental.delivery?.current
    );

    // Track data
    const trackingData = rental.delivery
        ? {
              currentStep: currentStepIndex,
              currentLocation: rental.delivery.currentLocation,
              estimatedDate: rental.delivery.estimatedDate,
              courier: rental.delivery.courier,
              steps,
          }
        : null;

    // Calculate total price (REAL DATA)
    const pricePerDay = rental.price || 0;

    const bookedFrom = new Date(rental.bookedFrom);
    const bookedTo = new Date(rental.bookedTo);
    const diff =
        Math.floor((bookedTo - bookedFrom) / (1000 * 60 * 60 * 24)) + 1;
    const daysCount = diff > 0 ? diff : 1;

    const shippingFee = Number(rental.shipping || 0);
    const discountPercent = Number(rental.couponDiscount || 0);
    const securityDeposit = Number(rental.securityDeposit || 0);

    const subtotal = pricePerDay * daysCount;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount + shippingFee + securityDeposit;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">

                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-20 flex items-center gap-4">
                        <img
                            src={rental.image}
                            alt={rental.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="font-medium">{rental.name}</h2>
                            <p className="text-gray-500 text-sm">{rental.category}</p>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="p-6 space-y-6">

                        {/* RENTAL DETAILS */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-900 text-[15px]">
                                Rental Details
                            </h3>

                            <div className="bg-gray-50 rounded-xl p-4 space-y-4">

                                {/* Date Booked */}
                                <div className="flex items-center gap-3">
                                    <CalendarCheck className="w-5 h-5 text-purple-700" />
                                    <div>
                                        <p className="text-gray-500 text-xs">Date booked</p>
                                        <p className="text-sm">
                                            {new Date(rental.dateBooked).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Rental Period */}
                                <div className="flex items-center gap-3">
                                    <CalendarClock className="w-5 h-5 text-purple-700" />
                                    <div>
                                        <p className="text-gray-500 text-xs">Rental Period</p>
                                        <p className="text-sm">
                                            {bookedFrom.toDateString()} –{" "}
                                            {bookedTo.toDateString()}
                                        </p>
                                        <p className="text-gray-500 text-xs">{daysCount} days</p>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* REAL LOCATION */}
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-purple-700" />

                                    {/* TODO: Add owner location support from backend */}
                                    <p className="text-sm flex items-center gap-1">
                                        {rental.ownerLocation || "Owner Location"}{" "}
                                        <img
                                            src={TruckIcon}
                                            className={`w-4 h-4 transition-all ${
                                                iconAnimated
                                                    ? "opacity-70 translate-x-0"
                                                    : "opacity-0 -translate-x-4"
                                            }`}
                                        />
                                        {rental.renterLocation || "Your Location"}
                                    </p>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Payment */}
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-purple-700" />
                                    <div>
                                        <p className="text-gray-500 text-xs">Payment Method</p>
                                        <p className="text-sm">{rental.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PRICE SUMMARY */}
                        <div>
                            <h3 className="font-medium text-gray-900 text-[15px]">
                                Price Summary
                            </h3>

                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">

                                {/* Subtotal */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Subtotal ({daysCount} days × ₱{pricePerDay})
                                    </span>
                                    <span className="font-medium">
                                        ₱{subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {/* Discount */}
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <Percent className="w-4 h-4" />
                                        Discount ({discountPercent}%)
                                    </span>
                                    <span className="text-green-600">
                                        -₱{discountAmount.toFixed(2)}
                                    </span>
                                </div>

                                {/* Shipping */}
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <Truck className="w-4 h-4" />
                                        Shipping Fee
                                    </span>
                                    <span>
                                        {shippingFee > 0
                                            ? `₱${shippingFee.toFixed(2)}`
                                            : "Free"}
                                    </span>
                                </div>

                                {/* Security Deposit */}
                                {securityDeposit > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <ShieldAlert className="w-4 h-4" />
                                            Security Deposit
                                        </span>
                                        <span className="text-yellow-700">
                                            ₱{securityDeposit.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                <hr className="border-gray-300" />

                                <div className="flex justify-between font-semibold text-purple-700 text-sm">
                                    <span>Total</span>
                                    <span>₱{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Status */}
                        {rental.delivery && (
                            <div className="space-y-2">
                                <h3 className="font-medium text-gray-900 text-[15px]">
                                    Delivery Status
                                </h3>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    {steps.map((step, index) => {
                                        const Icon = step.icon;
                                        const isCompleted = index < currentStepIndex;
                                        const isCurrent = index === currentStepIndex;

                                        return (
                                            <div
                                                key={step.key}
                                                className="relative flex items-center gap-4 pb-6 last:pb-0"
                                            >
                                                <div
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                                        isCompleted
                                                            ? "bg-purple-700 text-white"
                                                            : isCurrent
                                                            ? "bg-purple-200 text-purple-700 ring-4 ring-purple-100"
                                                            : "bg-gray-200 text-gray-400"
                                                    }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </div>

                                                <p
                                                    className={`${
                                                        isCompleted || isCurrent
                                                            ? "text-gray-900"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {step.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-2 pt-4">
                            {rental.status === "approved" &&
                                rental.delivery?.deliveryType === "shipping" && (
                                    <button
                                        onClick={() => setIsTrackingOpen(true)}
                                        className="flex-1 bg-purple-700 text-white py-2 rounded-lg"
                                    >
                                        Track Item
                                    </button>
                                )}

                            {rental.status !== "cancelled" && (
                                <button
                                    onClick={() => {
                                        setSelectedId(rental.id);
                                        setShowCancelModal(true);
                                    }}
                                    className="flex-1 border border-red-300 text-red-600 py-2 rounded-lg"
                                >
                                    Cancel Booking
                                </button>
                            )}

                            <button
                                onClick={onClose}
                                className="flex-1 border py-2 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <CancelConfirmationModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={() => {
                    if (rental.id === selectedId) {
                        rental.status = "cancelled";
                    }
                    setShowCancelModal(false);
                    onClose();
                }}
            />

            <DeliveryTrackingModal
                isOpen={isTrackingOpen}
                onClose={() => setIsTrackingOpen(false)}
                trackingData={trackingData}
            />
        </>
    );
}
