import { useEffect, useState } from "react";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import {
    CalendarCheck,
    CalendarClock,
    MapPin,
    CreditCard,
    Truck,
    Percent,
    ShieldAlert,
    Loader,
    AlertTriangle
} from "lucide-react";

export function ViewDetailsModal({ isOpen, onClose, bookingId }) {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && bookingId) {
            const fetchBookingDetails = async () => {
                setLoading(true);
                try {
                    const response = await makeAPICall(ENDPOINTS.BOOKINGS.GET_ONE(bookingId));
                    if (response.success) {
                        setBooking(response.data);
                    } else {
                        setError(response.msg || 'Failed to fetch booking details.');
                    }
                } catch (err) {
                    setError('An error occurred while fetching booking details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchBookingDetails();
        }
    }, [isOpen, bookingId]);

    if (!isOpen) return null;

    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-purple-600" size={48} /></div>;
        }

        if (error || !booking) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-red-600">
                    <AlertTriangle size={48} className="mb-4" />
                    <p className="text-center">{error || 'Booking details not found.'}</p>
                </div>
            );
        }

        const { itemId: item, ownerId: owner } = booking;
        const daysCount = Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)) + 1;

        return (
            <>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-20 flex items-center gap-4">
                    <img
                        src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/150'}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <h2 className="font-medium">{item.title}</h2>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 text-[15px]">Rental Details</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <CalendarCheck className="w-5 h-5 text-purple-700" />
                                <div>
                                    <p className="text-gray-500 text-xs">Date booked</p>
                                    <p className="text-sm">{new Date(booking.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex items-center gap-3">
                                <CalendarClock className="w-5 h-5 text-purple-700" />
                                <div>
                                    <p className="text-gray-500 text-xs">Rental Period</p>
                                    <p className="text-sm">{new Date(booking.startDate).toDateString()} – {new Date(booking.endDate).toDateString()}</p>
                                    <p className="text-gray-500 text-xs">{daysCount} days</p>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-purple-700" />
                                <p className="text-sm">{owner.ownerAddress || 'Location not available'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 text-[15px]">Price Summary</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal ({daysCount} days × ₱{item.pricePerDay})</span>
                                <span className="font-medium">₱{booking.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-1 text-gray-600"><Percent className="w-4 h-4" />Discount</span>
                                <span className="text-green-600">-₱{booking.discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-1 text-gray-600"><Truck className="w-4 h-4" />Shipping Fee</span>
                                <span>{booking.shippingFee > 0 ? `₱${booking.shippingFee.toFixed(2)}` : "Free"}</span>
                            </div>
                            {booking.securityDeposit > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1 text-gray-600"><ShieldAlert className="w-4 h-4" />Security Deposit</span>
                                    <span className="text-yellow-700">₱{booking.securityDeposit.toFixed(2)}</span>
                                </div>
                            )}
                            <hr className="border-gray-300" />
                            <div className="flex justify-between font-semibold text-purple-700 text-sm">
                                <span>Total</span>
                                <span>₱{booking.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button onClick={onClose} className="flex-1 border py-2 rounded-lg">Close</button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}>
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
