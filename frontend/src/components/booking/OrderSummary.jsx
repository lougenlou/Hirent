import React from 'react';

const OrderSummary = ({ product, pricing, rentalData, onPlaceBooking }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  // Check if dates are selected to toggle the warning/button state
  const hasDates = rentalData.startDate && rentalData.endDate;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {/* Product Info */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
           {/* Optional: Add small thumbnail if you have image prop */}
           {product.image && (
              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
           )}
           <div>
            <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
            <p className="text-purple-600 font-bold">
              {formatCurrency(product.pricePerDay)}
              <span className="text-sm text-gray-500 font-normal"> / day</span>
            </p>
           </div>
        </div>
        
        {/* Price Breakdown */}
        <div className="pt-2 space-y-3">

          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              {pricing.subtotal > 0 ? formatCurrency(pricing.subtotal) : "---"}
            </span>
          </div>

          {/* Subtotal Explanation */}
          {pricing.subtotal > 0 && (
            <p className="text-xs text-gray-400 -mt-2">
              {rentalData.days} {rentalData.days === 1 ? "day" : "days"} × {formatCurrency(product.pricePerDay)}
            </p>
          )}

          {/* Discount - Now Dynamic */}
          <div className={`flex justify-between text-sm ${pricing.discount > 0 ? 'text-green-600' : 'text-gray-600'}`}>
            <span>Discount</span>
            <span className="font-medium">
              {pricing.discount > 0 ? `-${formatCurrency(pricing.discount)}` : "₱0.00"}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="text-gray-900 font-medium">
              {pricing.shippingFee > 0
                ? `+${formatCurrency(pricing.shippingFee)}`
                : "Free"}
            </span>
          </div>

          {/* Security Deposit */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Security Deposit</span>
            <span className="text-gray-900 font-medium">
              +{formatCurrency(pricing.securityDeposit)}
            </span>
          </div>
        </div>
        
        {/* Total + Actions */}
        <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-end mb-6">
            <span className="font-semibold text-gray-700 mb-1">Total</span>
            <span className="text-3xl font-bold text-purple-600">
              {formatCurrency(pricing.total)}
            </span>
          </div>
          
          {/* Conditional Warning: Only show if dates are missing */}
          {!hasDates && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xs text-yellow-800 pt-0.5">
                Please select your rental start and end dates to proceed.
              </p>
            </div>
          )}
          
          <button 
            onClick={onPlaceBooking}
            disabled={!hasDates}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 
              ${hasDates 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-purple-200' 
                : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
          >
            Place Booking
          </button>
          
          <button className="w-full mt-3 bg-white border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
