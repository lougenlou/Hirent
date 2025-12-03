import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const BookingFailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorDetails = location.state || {};

  const {
    itemName = "Rental Item",
    total = 0,
    errorMessage = "Something went wrong",
    timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  } = errorDetails;

  return (
    <div className="w-full max-w-[400px] mx-auto px-4 pb-12">
      
      {/* Same spacing as Success Page */}
      <div className="mt-10">
        
        {/* Error Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Booking Failed</h1>
          <p className="text-gray-500 text-xs mt-1">We couldn't process your request.</p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative mb-6 border border-red-100">
          <div className="h-1.5 bg-red-500 w-full"></div>

          <div className="p-5">
            <div className="flex items-start gap-3 mb-4 text-left bg-red-50 p-3 rounded-lg border border-red-100">
              <div className="mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-red-800 leading-tight">{errorMessage}</p>
                <p className="text-xs text-red-600 mt-1">{timestamp}</p>
              </div>
            </div>

            <div className="border-t border-b border-dashed border-gray-200 py-3 mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Item</span>
                <span className="font-medium text-gray-900 truncate max-w-[180px]">{itemName}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Attempted Amount</span>
                 <span className="font-bold text-gray-900">₱{total?.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center italic">
              No charges were made to your account.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate(-1)} // Go back to try again
            className="w-full py-3 rounded-lg bg-red-600 text-white text-sm font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Try Again
          </button>
          
          <div className="grid grid-cols-2 gap-3">
             <button className="py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
               Help Center
             </button>
             <button 
               onClick={() => navigate('/')}
               className="py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
             >
               Back to Home
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingFailurePage;
