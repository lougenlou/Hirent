import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makeAPICall, ENDPOINTS } from "../../config/api";

const POLL_INTERVAL = 3000; // 3 seconds

const BookingPaymentStatus = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending"); // pending, paid, failed
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const pollPaymentStatus = async () => {
      try {
        const response = await makeAPICall(
          ENDPOINTS.BOOKINGS.PAYMENT_STATUS(bookingId)
        );

        if (response.success && response.data) {
          const paymentStatus = response.data.paymentStatus; // expects 'pending', 'paid', 'failed'

          setStatus(paymentStatus);

          if (paymentStatus === "paid") {
            clearInterval(intervalId);
            navigate(`/booking/confirmation/${bookingId}`);
          } else if (paymentStatus === "failed") {
            clearInterval(intervalId);
            setError("Payment failed or expired. Please try again.");
          }
        } else {
          setError("Unable to fetch payment status.");
        }
      } catch (err) {
        console.error("Error polling payment status:", err);
        setError("Error checking payment status. Please try again.");
      }
    };

    intervalId = setInterval(pollPaymentStatus, POLL_INTERVAL);

    // Initial poll immediately
    pollPaymentStatus();

    return () => clearInterval(intervalId);
  }, [bookingId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      {status === "pending" && !error && (
        <>
          <h1 className="text-2xl font-bold text-purple-700 mb-4">
            Waiting for payment confirmation...
          </h1>
          <p className="text-gray-600">Please do not close this page.</p>
        </>
      )}

      {error && (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate(`/booking/${bookingId}`)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Retry Booking
          </button>
        </>
      )}
    </div>
  );
};

export default BookingPaymentStatus;
