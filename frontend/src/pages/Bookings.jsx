import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Calendar, Info } from "lucide-react";

const Bookings = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showCardFields, setShowCardFields] = useState(false);
  const [showEwalletOptions, setShowEwalletOptions] = useState(false);
  const [selectedEwallet, setSelectedEwallet] = useState("");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    if (method === "card") {
      setShowCardFields(true);
      setShowEwalletOptions(false);
      setSelectedEwallet("");
    } else if (method === "ewallet") {
      setShowEwalletOptions(true);
      setShowCardFields(false);
    } else {
      setShowCardFields(false);
      setShowEwalletOptions(false);
      setSelectedEwallet("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-[#F8F8FC] min-h-screen">
        <Sidebar />

        <div className="flex-1 px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* ITEM SUMMARY */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Item Summary</h2>

                <div className="flex items-start gap-4">
                  <img
                    src="/assets/products/Canon.png"
                    alt="Canon"
                    className="w-28 h-28 object-contain rounded-lg border border-gray-200 p-2"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      Professional DSLR Camera Kit
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-[#7A1CA9] text-white rounded-full flex items-center justify-center text-xs font-semibold">S</div>
                      <div>
                        <p className="text-xs text-gray-500">Listed by</p>
                        <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-1">Naga City, Camarines Sur</p>

                    <p className="text-[#7A1CA9] font-bold text-base">
                      ₱800 <span className="text-sm text-gray-600 font-normal">per day</span>
                    </p>

                    <div className="mt-3 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
                      ✓ <span>Coupon applied:</span> <span className="font-semibold">10% off</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* APPLY COUPON */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
                <div className="flex gap-3">
                  <input
                    placeholder="Enter Code (Optional)"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <button className="px-8 py-2.5 bg-[#7A1CA9] text-white rounded-lg text-sm hover:bg-[#67168e] transition">
                    Apply
                  </button>
                </div>
              </div>

              {/* RENTAL PERIOD */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-1">Rental Period</h2>
                <p className="text-xs text-gray-500 mb-4">Start date must be scheduled 1–2 days after booking.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Start */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
                    <div className="relative">
                      <input
                        placeholder="Pick a date"
                        className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  {/* End */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
                    <div className="relative">
                      <input
                        placeholder="Pick a date"
                        className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Rental Duration</label>
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue={4}
                        className="w-full pr-14 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <span className="absolute right-3 top-3 text-sm text-gray-600">Days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD (TOP) */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Payment Method</h2>

                  <div className="flex gap-2 opacity-80">
                    <img src="/assets/icons/credit.png" className="h-5" />
                    <img src="/assets/icons/creditcard.png" className="h-5" />
                    <img src="/assets/icons/ewallet.png" className="h-5" />
                  </div>
                </div>

                {/* COD */}
                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => handlePaymentChange("cod")}
                  />
                  <img src="/assets/icons/cod.png" className="w-5" />
                  <span className="text-sm font-medium">Cash on Delivery</span>
                </label>
                <p className="text-xs text-gray-500 ml-10 mt-1">
                  Cash payment will be collected upon delivery or pickup.
                </p>

                {/* CARD */}
                <div className="mt-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => handlePaymentChange("card")}
                    />
                    <img src="/assets/icons/creditcard.png" className="w-5" />
                    <span className="text-sm font-medium">Credit / Debit Card</span>
                  </label>

                  {showCardFields && (
                    <div className="ml-10 mt-3 p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
                      <p className="text-sm font-medium">Add a new card</p>

                      <input
                        placeholder="Card Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="CVV" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                        <input placeholder="Expiry (MM/YY)" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>

                      <input
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />

                      <p className="text-xs text-gray-500">
                        Your card details are encrypted and processed safely.
                      </p>
                    </div>
                  )}
                </div>

                {/* E-Wallet */}
                <div className="mt-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="ewallet"
                      checked={paymentMethod === "ewallet"}
                      onChange={() => handlePaymentChange("ewallet")}
                    />
                    <img src="/assets/icons/ewallet.png" className="w-5" />
                    <span className="text-sm font-medium">Online / E-Wallet</span>
                  </label>

                  {/* GCASH/MAYA – SHOWN ONLY WHEN SELECTED */}
                  {showEwalletOptions && (
                    <div className="ml-10 mt-3 space-y-2">
                      {/* GCASH */}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                          selectedEwallet === "gcash"
                            ? "border-2 border-[#7A1CA9] bg-purple-50"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ewallet"
                          value="gcash"
                          checked={selectedEwallet === "gcash"}
                          onChange={(e) => setSelectedEwallet(e.target.value)}
                        />
                        <img src="/assets/icons/gcash.png" className="w-5" />
                        <span className="text-sm font-medium">GCash</span>
                      </label>

                      {/* MAYA */}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                          selectedEwallet === "maya"
                            ? "border-2 border-[#7A1CA9] bg-purple-50"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ewallet"
                          value="maya"
                          checked={selectedEwallet === "maya"}
                          onChange={(e) => setSelectedEwallet(e.target.value)}
                        />
                        <img src="/assets/icons/maya.png" className="w-5" />
                        <span className="text-sm font-medium">Maya</span>
                      </label>

                      <p className="text-xs text-gray-500">
                        Your payment will be redirected securely to third-party providers.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* BOOKING DETAILS */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

                {/* Delivery */}
                <label className="flex items-start gap-3 p-4 border-2 border-[#7A1CA9] bg-purple-50 rounded-lg mb-3 cursor-pointer">
                  <input type="radio" name="delivery" defaultChecked />
                  <div>
                    <p className="font-medium text-sm">Delivery</p>
                    <p className="text-xs text-gray-600">
                      Item will be delivered to your address<br />+₱15 shipping fee
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="delivery" />
                  <div>
                    <p className="font-medium text-sm">Pickup</p>
                    <p className="text-xs text-gray-600">
                      Pick up from owner’s location<br />Free – No Shipping Fee
                    </p>
                  </div>
                </label>

                {/* Notes */}
                <div className="mt-4">
                  <label className="text-sm font-medium mb-1 block">Notes for Owner (Optional)</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                    rows={3}
                    maxLength={500}
                    placeholder="Any special requests or instructions for the owner..."
                  ></textarea>
                  <p className="text-xs text-gray-400 text-right mt-1">0/500 characters</p>
                </div>
              </div>

              {/* RETURN DETAILS – NO PNG ICONS */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Return Details & Security Deposit</h2>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex gap-2 mb-4">
                  <Info size={16} className="text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    A refundable security deposit may be required.
                  </p>
                </div>

                {/* Deposit Amount */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Security Deposit Amount</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <p className="font-bold">₱1000.00</p>
                    <p className="text-xs text-gray-500">Set by item owner</p>
                  </div>
                </div>

                {/* 📌 NO PNG ICONS HERE */}
                <div className="space-y-4">

                  {/* Cash on Return */}
                  <div>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <input type="radio" name="deposit" />
                      <span className="text-sm font-medium">Cash on Return</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-9">
                      You will pay the deposit in cash upon return. Immediate refund if no damage.
                    </p>
                  </div>

                  {/* Deduct from Card */}
                  <div>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <input type="radio" name="deposit" />
                      <span className="text-sm font-medium">Deduct from Card on File</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-9">
                      A temporary hold will be placed and released once returned in good condition.
                    </p>
                  </div>

                  {/* E-Wallet */}
                  <div>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <input type="radio" name="deposit" />
                      <span className="text-sm font-medium">Online / E-Wallet</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-9">
                      Refund returned to your e-wallet within 1–2 business days.
                    </p>
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg mt-4">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-xs">
                    I understand the deposit will be refunded after inspection unless damages are found.
                  </span>
                </label>

                {/* Additional Notes */}
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">
                    Additional notes regarding return condition (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                    rows={3}
                    placeholder="Enter any special notes or concerns..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* RIGHT – ORDER SUMMARY */}
            <div>
              <div className="sticky top-28 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Professional DSLR Camera Kit</span>
                    <span className="text-[#7A1CA9] font-semibold">₱800</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>---</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>---</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>₱20.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Security Deposit</span>
                    <span>₊₱700.00</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>₱720.00</span>
                  </div>
                </div>

                {/* Yellow Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-yellow-800 text-center">
                    Select rental dates to see total price
                  </p>
                </div>

                {/* Buttons */}
                <button className="w-full py-3 mt-4 rounded-xl bg-[#7A1CA9] hover:bg-[#67168e] text-white font-semibold">
                  Place Booking
                </button>
                <button className="w-full py-3 mt-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
