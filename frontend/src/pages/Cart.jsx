import React, { useState } from 'react';
import { Trash2, Home } from 'lucide-react';
import { initialCartItems } from '../data/cartData';

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');

  const handleDurationChange = (id, value) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, duration: parseInt(value) || 1 } : item
    ));
  };

  const handleDurationTypeChange = (id, value) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, durationType: value } : item
    ));
  };

  const handleCheckboxChange = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  const calculateSubtotal = (item) => {
    const multiplier = item.durationType === 'Weeks' ? item.duration * 7 : item.duration;
    return item.price * multiplier;
  };

  const subtotal = cartItems
    .filter(item => item.checked)
    .reduce((sum, item) => sum + calculateSubtotal(item), 0);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    // Add margin-left to account for sidebar (ml-16 = 64px = w-16 sidebar width)
    <div className="min-h-screen bg-gray-50 ml-16 py-6 px-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Home size={16} />
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          {/* Cart Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white border-b border-gray-200">
              <div className="col-span-5 text-sm font-semibold text-gray-700">Product</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700">Price</div>
              <div className="col-span-3 text-sm font-semibold text-gray-700">Duration</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700">Subtotal</div>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                Your cart is empty
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 items-center hover:bg-gray-50 transition">
                  {/* Product Column */}
                  <div className="col-span-5 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="w-4 h-4 rounded accent-[#7A1CA9] cursor-pointer"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-2 text-sm text-gray-800">
                    ₱{item.price.toFixed(2)}
                  </div>

                  {/* Duration Column */}
                  <div className="col-span-3 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.duration}
                      onChange={(e) => handleDurationChange(item.id, e.target.value)}
                      className="w-16 px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
                    />
                    <select
                      value={item.durationType}
                      onChange={(e) => handleDurationTypeChange(item.id, e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent cursor-pointer"
                    >
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                    </select>
                  </div>

                  {/* Subtotal Column */}
                  <div className="col-span-1 text-sm font-semibold text-gray-800">
                    ₱{calculateSubtotal(item).toFixed(2)}
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button className="px-6 py-2.5 border-2 border-[#7A1CA9] text-[#7A1CA9] rounded-md hover:bg-[#7A1CA9] hover:text-white transition font-medium text-sm">
              Return To Shop
            </button>
            <button
              onClick={handleClearAll}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition font-medium text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Coupon Section */}
          <div className="flex items-center gap-4 mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 max-w-xs px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent text-sm"
            />
            <button className="px-8 py-2.5 bg-[#7A1CA9] text-white rounded-md hover:bg-[#6a1895] transition font-medium text-sm">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total Sidebar */}
        <div className="lg:w-96">
          <div className="bg-[#7A1CA9] text-white rounded-lg p-6 shadow-lg sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Cart Total</h2>
            
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center pb-4">
                <span className="text-sm">Subtotal:</span>
                <span className="text-lg font-semibold">₱{subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center pb-4 border-t border-white/20 pt-4">
                <span className="text-sm">Shipping:</span>
                <span className="text-lg font-semibold">{shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pb-6 border-t border-white/20 pt-4">
                <span className="text-base font-semibold">Total:</span>
                <span className="text-xl font-bold">₱{total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-white text-[#7A1CA9] py-3 rounded-md font-semibold hover:bg-gray-100 transition text-sm shadow-md">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
