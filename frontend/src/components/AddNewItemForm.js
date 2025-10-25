import React, { useState } from 'react';

export default function AddNewItemForm() {
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header - Outside the box */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Add New Item</h1>
        <p className="text-sm text-gray-500">List a new item for rent on HIRENT</p>
      </div>

      {/* Form Section - The white box */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-base font-semibold text-black mb-6">Add New Item</h2>

          <div className="space-y-5">
            {/* Item Name and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-normal text-black mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder='e.g "Sony EOS 5S Camera"'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-black mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-purple-600">
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Camera</option>
                  <option>Sports Equipment</option>
                  <option>Tools</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your item in detail..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm placeholder:text-purple-400"
              ></textarea>
            </div>

            {/* Price, Condition, and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-normal text-black mb-2">
                  Price per Day
                </label>
                <input
                  type="text"
                  placeholder="Enter price..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-black mb-2">
                  Condition
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-purple-600">
                  <option>Select condition</option>
                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-normal text-black mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Type where you are based"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center bg-white">
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src="/icons/upload.png" 
                    alt="Upload" 
                    className="w-14 h-14 mb-3 opacity-80"
                  />
                  <p className="text-purple-600 text-sm mb-3">
                    Drag and drop images here, or click to select
                  </p>
                  <button 
                    type="button"
                    className="px-6 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition text-sm font-medium"
                  >
                    Select image
                  </button>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">
                Availability
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-normal text-black mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-black mb-2">
                    Available To
                  </label>
                  <input
                    type="date"
                    value={availableTo}
                    onChange={(e) => setAvailableTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                className="flex-1 bg-purple-600 text-white py-2.5 rounded-md hover:bg-purple-700 transition font-medium text-sm"
              >
                List Item
              </button>
              <button 
                type="button"
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-md hover:bg-gray-50 transition font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
