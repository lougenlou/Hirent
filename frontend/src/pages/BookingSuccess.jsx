import React, { useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef(null);
  
  const [isDownloading, setIsDownloading] = useState(false);

  const bookingDetails = location.state || {};

  const {
    itemName = "Professional DSLR Camera Kit",
    pricePerDay = 800,
    days = 4,
    subtotal = 3200,
    shippingFee = 20,
    securityDeposit = 700,
    bookingDate = "Dec 03, 2025",
    bookingId
  } = bookingDetails;

  const finalDiscount = 0; 
  const finalTotal = subtotal + shippingFee + securityDeposit;

  const finalBookingId = useMemo(() => {
    if (bookingId) return bookingId;
    return "ORD-2025-8832";
  }, [bookingId]);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    
    try {
      setIsDownloading(true);
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        // Slightly wider capture to prevent text clip
        windowWidth: 500, 
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // INCREASED PDF WIDTH to 100mm (was 80mm) to prevent cramping
      const pdfWidth = 100; 
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const cleanFilename = finalBookingId.replace(/[^a-z0-9-]/gi, '_');
      pdf.save(`${cleanFilename}.pdf`);
      
    } catch (err) {
      console.error("Failed to download receipt:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto px-4 pb-12">
        
        <div className="mt-10"> 
          
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="text-gray-500 text-xs mt-1">Request sent to owner.</p>
          </div>

          <div 
            ref={receiptRef} 
            className={`bg-white rounded-xl overflow-hidden relative mb-5 ${isDownloading ? 'shadow-none border border-gray-200' : 'shadow-xl'}`}
          >
            <div className="h-1.5 bg-purple-600 w-full"></div>

            <div className="p-6"> {/* Increased padding for better spacing */}
              
              {/* Header Section - Forced flex row to prevent wrapping */}
              <div className="flex flex-row justify-between items-start mb-6">
                <div className="flex flex-col items-start">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Receipt No.</p>
                  <p className="text-gray-900 font-medium text-sm break-all">{finalBookingId}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-gray-900 font-medium text-sm whitespace-nowrap">{bookingDate}</p>
                </div>
              </div>

              <div className="border-t border-b border-dashed border-gray-200 py-4 space-y-3">
                {/* Item Name - Allowed to take full width */}
                <div className="flex justify-between items-start text-sm mb-1">
                  <span className="font-bold text-gray-900 flex-1 mr-4 leading-snug">{itemName}</span>
                  <span className="text-gray-600 whitespace-nowrap font-medium">₱{pricePerDay.toLocaleString()}/day</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Duration</span>
                  <span>{days} days</span>
                </div>
              </div>

              <div className="py-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">+₱{shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Deposit</span>
                  <span className="font-medium">+₱{securityDeposit.toLocaleString()}</span>
                </div>
                
                {finalDiscount > 0 && (
                   <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₱{finalDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="bg-purple-50 -mx-6 px-6 py-4 flex justify-between items-center border-t border-purple-100 mt-2">
                <span className="font-bold text-purple-900 text-base">Total Paid</span>
                <span className="text-2xl font-extrabold text-purple-700">₱{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="relative h-4 bg-white">
               <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZD0iTTAgMTBMMTAgMCAyMCAxMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] bg-contain"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleDownloadReceipt}
              disabled={isDownloading}
              className="py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 bg-white"
            >
              {isDownloading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <span>Download</span>
                </>
              )}
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="py-2.5 rounded-lg bg-purple-600 text-white text-sm font-bold shadow-md shadow-purple-200 hover:bg-purple-700 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>

    </div>
  );
};

export default BookingSuccessPage;
