import React from "react";
import { Package, Clock, CircleCheckBig, CircleOff } from "lucide-react";

const RentalSummary = ({ rentals }) => {
  const count = (status) =>
    rentals.filter((r) => (status ? r.status === status : true)).length;

  const completedRentals = rentals.filter((r) => r.status === "completed");

  const subtotal = completedRentals.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const days = item.days || 1;
    return sum + price * days;
  }, 0);

  const totalShipping = completedRentals.reduce(
    (sum, item) => sum + (item.shipping || 0),
    0
  );

  const totalCoupon = completedRentals.reduce((sum, item) => {
    const discount = item.couponDiscount || 0;
    const price = Number(item.price || 0);
    const days = item.days || 1;
    return sum + (price * days * discount) / 100;
  }, 0);

  const totalSecurity = completedRentals.reduce(
    (sum, item) => sum + (item.securityDeposit || 0),
    0
  );

  const total = subtotal + totalShipping + totalSecurity - totalCoupon;

  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow-sm space-y-1 mr-5">
      <h2 className="font-semibold text-[16px] mb-2">Rental Summary</h2>

      {/* Completed Items */}
      <div className="flex items-center text-gray-600 mb-1 gap-1.5">
        <Package className="w-4 h-4" />
        <p className="text-[13px]">
          {count("completed")} item{count("completed") !== 1 ? "s" : ""} rented
        </p>
      </div>

      {/* Status Breakdown */}
      <div className="flex flex-col gap-1 ml-4 text-[13px]">
        {count("approved") > 0 && (
          <div className="flex items-center gap-1.5 text-green-700">
            <CircleCheckBig className="w-3 h-3" />
            <span>{count("approved")} approved</span>
          </div>
        )}

        {count("pending") > 0 && (
          <div className="flex items-center gap-1.5 text-yellow-700">
            <Clock className="w-3 h-3" />
            <span>{count("pending")} pending</span>
          </div>
        )}

        {count("cancelled") > 0 && (
          <div className="flex items-center gap-1.5 text-red-700">
            <CircleOff className="w-3 h-3" />
            <span>{count("cancelled")} cancelled</span>
          </div>
        )}
      </div>

      <hr className="my-3" />

      {/* Approved Section */}
      {count("approved") > 0 && (
        <div className="text-[13px] space-y-1 pb-2">
          <p className="font-semibold mt-3 mb-2">Approved Rentals</p>
          {rentals
            .filter((r) => r.status === "approved")
            .map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>₱{item.price}</span>
              </div>
            ))}
        </div>
      )}

      {/* Pending Section */}
      {count("pending") > 0 && (
        <div className="text-[13px] space-y-1 pb-2">
          <p className="font-semibold mt-3 mb-2">Pending Rentals</p>
          {rentals
            .filter((r) => r.status === "pending")
            .map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>₱{item.price}</span>
              </div>
            ))}
        </div>
      )}

      {/* Totals */}
      <div className="text-[13px] space-y-1 pt-3 border-t border-gray-200">
        <div className="flex justify-between">
          <span>Subtotal of Completed Items</span>
          <span>₱{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Coupon Discounts Used</span>
          <span>-₱{totalCoupon.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Security Deposit Used</span>
          <span>₱{totalSecurity.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 pb-2">
          <span>Total Expense</span>
          <span>₱{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-md text-[13px]">
        Your rental status updates appear here.
      </div>
    </div>
  );
};

export default RentalSummary;
