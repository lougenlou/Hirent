import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplyCoupon from '../components/booking/ApplyCoupon';
import DeliveryMethod from '../components/booking/DeliveryMethod';
import ItemSummary from '../components/booking/ItemSummary';
import OrderSummary from '../components/booking/OrderSummary';
import PaymentMethod from '../components/booking/PaymentMethod';
import RentalPeriod from '../components/booking/RentalPeriod';
import ReturnDetails from '../components/booking/ReturnDetails';
import CancellationPolicy from '../components/booking/CancellationPolicy';
import RentalTerms from '../components/booking/RentalTerms';
import LateReturnPolicy from '../components/booking/LateReturnPolicy';

const Booking = () => {
  const navigate = useNavigate();

  const [rentalData, setRentalData] = useState({
    startDate: '',
    endDate: '',
    days: 4,
  });

  const [couponData, setCouponData] = useState({
    applied: true,
    discount: 10,
  });

  // State for payment
  const [paymentMethod, setPaymentMethod] = useState(''); 
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  
  const productData = {
    name: 'Professional DSLR Camera Kit',
    owner: 'Sarah Johnson',
    location: 'Negri City, Camerines Sur',
    pricePerDay: 800,
    image: '/assets/products/Canon.png',
  };

  const calculatePricing = () => {
    const subtotal = productData.pricePerDay * rentalData.days;
    const discountAmount = couponData.applied ? (subtotal * couponData.discount) / 100 : 0;
    const shippingFee = deliveryMethod === 'delivery' ? 20 : 0;
    const securityDeposit = 700;
    const total = subtotal - discountAmount + shippingFee + securityDeposit;

    return { subtotal, discount: discountAmount, shippingFee, securityDeposit, total };
  };

  const pricing = calculatePricing();

  const handlePlaceBooking = async () => {
    const uniqueBookingId = "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const bookingDetails = {
      bookingId: uniqueBookingId,
      itemName: productData.name,
      pricePerDay: productData.pricePerDay,
      days: rentalData.days,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      shippingFee: pricing.shippingFee,
      securityDeposit: pricing.securityDeposit,
      total: pricing.total,
      startDate: rentalData.startDate,
      endDate: rentalData.endDate,
      bookingDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    // --- DEBUGGING LOG ---
    console.log("Selected Payment Method:", paymentMethod); 

    // 1. FAIL IMMEDIATELY if no payment method is selected
    if (!paymentMethod) {
        console.log("No payment method selected -> Failing");
        navigate('/booking-failure', { 
            state: { 
                ...bookingDetails, 
                errorMessage: "Please select a payment method.", 
                timestamp: new Date().toLocaleString() 
            } 
        });
        return; 
    }

    // 2. FAIL for Card/E-Wallet (Simulation)
    // Since we don't have real inputs yet, we assume choosing them = failure (e.g., "Forgot to enter details")
    if (paymentMethod === 'card' || paymentMethod === 'ewallet' || paymentMethod === 'credit_card' || paymentMethod === 'gcash' || paymentMethod === 'paymaya') {
        console.log("Online Payment Selected -> Simulating Failure (No details provided)");
        
        // Fake processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        navigate('/booking-failure', { 
            state: { 
                ...bookingDetails, 
                errorMessage: "Payment failed. No card/wallet details provided.", 
                timestamp: new Date().toLocaleString() 
            } 
        });
        return;
    }

    // 3. SUCCESS only for Cash / COD
    console.log("Cash Payment -> Success");
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/booking-success', { state: bookingDetails });
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 lg:w-2/3 space-y-6">
          <ItemSummary product={productData} days={rentalData.days} coupon={couponData} />
          <ApplyCoupon couponData={couponData} setCouponData={setCouponData} />
          <RentalPeriod rentalData={rentalData} setRentalData={setRentalData} />
          <LateReturnPolicy />
          
          {/* IMPORTANT: Ensure PaymentMethod actually calls setPaymentMethod */}
          <PaymentMethod 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          
          <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
          <ReturnDetails deliveryMethod={deliveryMethod} />
          <CancellationPolicy />
          <RentalTerms />
        </div>
        
        <div className="lg:w-1/3">
          <div className="sticky top-24 self-start">
            <OrderSummary 
              product={productData}
              pricing={pricing}
              rentalData={rentalData}
              onPlaceBooking={handlePlaceBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
