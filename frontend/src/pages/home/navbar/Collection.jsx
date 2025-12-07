import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import emptycollection from "../../../assets/empty-collection.png";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import mockListings from "../../../data/mockData";
import sampleUsercollection from "../../../data/sampleUsercollection";

import SortDropdown from "../../../components/dropdown/SortDropdown";
import CancelConfirmationModal from "../../../components/modals/CancelModal";

import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";

import CollectionCard from "../../../components/cards/CollectionItemCard";
import CollectionSummary from "../../../components/cards/CollectionSummary";

const CollectionPage = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState(null);

  const [collectionItems, setcollectionItems] = useState([]);

  useEffect(() => {
    document.title = "Hirent — Collection";
    return () => {
      document.title = "Hirent";
    };
  }, []);

  useEffect(() => {
    let user = getFakeUser();

    if (!user) {
      const token = generateFakeToken();
      localStorage.setItem("fakeToken", token);
      user = getFakeUser();
    }

    const merged = (user.collection || [])
      .map((collectionItem) => {
        const product = mockListings.find((p) => p.id === collectionItem.id);
        if (!product) return null;

        const rawPrice = product.price ? product.price.toString() : "0";
        const price = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 0;

        const defaultcollectionItem =
          sampleUsercollection.find((i) => i.id === collectionItem.id) || {};

        return {
          ...product,
          ...defaultcollectionItem,
          ...collectionItem,
          price,
          days: collectionItem.days || defaultcollectionItem.days || 1,
          shipping:
            collectionItem.shipping ?? defaultcollectionItem.shipping ?? 0,
          status:
            collectionItem.status || defaultcollectionItem.status || "pending",
          bookedFrom:
            collectionItem.bookedFrom || defaultcollectionItem.bookedFrom || "",
          bookedTo:
            collectionItem.bookedTo || defaultcollectionItem.bookedTo || "",
          couponDiscount:
            collectionItem.couponDiscount ??
            defaultcollectionItem.couponDiscount ??
            0,
          adjustedSubtotal:
            price * (collectionItem.days || defaultcollectionItem.days || 1),
        };
      })
      .filter(Boolean);

    setcollectionItems(merged);
  }, []);

  const updateFakeUsercollection = (newcollection) => {
    const user = getFakeUser();
    if (!user) return;
    const updatedUser = { ...user, collection: newcollection };
    const base64Payload = btoa(JSON.stringify(updatedUser));
    const newToken = `fakeHeader.${base64Payload}.fakeSignature`;
    localStorage.setItem("fakeToken", newToken);
  };

  const handleRemoveItem = (id) => {
    const newcollection = collectionItems.filter((item) => item.id !== id);
    setcollectionItems(newcollection);
    updateFakeUsercollection(newcollection);
  };

  const calculateItemTotal = (item) => {
    const pricePerDay = item.price || 0;
    let daysCount = item.days || 1;

    if (item.bookedFrom && item.bookedTo) {
      const from = new Date(item.bookedFrom);
      const to = new Date(item.bookedTo);
      const msPerDay = 1000 * 60 * 60 * 24;
      const diff = Math.floor((to - from) / msPerDay) + 1;
      daysCount = diff > 0 ? diff : daysCount;
    }

    const shippingFee = typeof item.shipping === "number" ? item.shipping : 0;

    const sampleItem = sampleUsercollection.find((si) => si.id === item.id);
    const discountPercent = sampleItem ? sampleItem.couponDiscount : 0;

    const subtotal = pricePerDay * daysCount;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal + shippingFee - discountAmount;

    return {
      subtotal,
      discountAmount,
      shippingFee,
      total,
      daysCount,
      pricePerDay,
    };
  };

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const openCancelModal = (id) => {
    setSelectedCancelId(id);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    const updatedcollection = collectionItems.map((item) => {
      if (item.id === selectedCancelId) {
        return {
          ...item,
          status: "not booked",
          bookedFrom: null,
          bookedTo: null,
        };
      }
      return item;
    });

    setcollectionItems(updatedcollection);
    updateFakeUsercollection(updatedcollection);
    setShowCancelModal(false);
    setSelectedCancelId(null);
    alert("Booking canceled successfully.");
  };

  const filteredItems = collectionItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "approved") return item.status === "approved";
    if (filter === "pending") return item.status === "pending";
    if (filter === "notBooked") return item.status !== "booked";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aDate = new Date(a.addedAt || a.bookedFrom || Date.now());
    const bDate = new Date(b.addedAt || b.bookedFrom || Date.now());
    return sortOrder === "latest" ? bDate - aDate : aDate - bDate;
  });

  const notBookedItems = collectionItems.filter(
    (item) => item.status !== "booked"
  );

  const approvedItems = collectionItems.filter(
    (item) => item.status === "approved"
  );

  const approvedTotals = approvedItems.reduce(
    (acc, item) => {
      const itemTotals = calculateItemTotal(item);
      acc.subtotal += itemTotals.subtotal;
      acc.shipping += itemTotals.shippingFee;
      acc.discount += itemTotals.discountAmount;
      return acc;
    },
    { subtotal: 0, shipping: 0, discount: 0 }
  );

  const approvedSecurityDepositTotal = approvedItems.reduce(
    (acc, item) => acc + (item.securityDeposit || 0),
    0
  );

  const approvedGrandTotal =
    approvedTotals.subtotal + approvedTotals.shipping - approvedTotals.discount;

  const approvedGrandTotalWithDeposit =
    approvedGrandTotal + approvedSecurityDepositTotal;

  const waitingCount = collectionItems.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <div className="flex min-h-screen px-4 md:px-6 lg:px-8">
      <div className="w-[520px] pl-16 flex-shrink-0 sticky top-10 self-start min-h-screen bg-gray-50 border-r border-gray-200">
        {/* Go Back */}
        <div className="mb-3 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back
          </button>
        </div>
        {/* Title */}
        <div className="flex items-center justify-between mb-5 mr-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
              <ShoppingBag className="w-8 h-8 text-[#a12fda]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-900 mt-1">
                Your Collection
              </h1>
              <p className="text-gray-500 text-sm">
                Items you gathered for booking
              </p>
            </div>
          </div>

          {/* Sort beside header */}
          <SortDropdown
            options={["Latest", "Oldest"]}
            onSortChange={(value) => setSortOrder(value.toLowerCase())}
          />
        </div>
        {/* Category Filter Buttons */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded-lg text-[13px] transition ${
              filter === "all"
                ? "bg-[#7A1CA9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
            }`}
          >
            All Items ({collectionItems.length})
          </button>

          <button
            onClick={() => setFilter("approved")}
            className={`px-2 py-1 rounded-lg text-[13px]  transition ${
              filter === "approved"
                ? "bg-[#7A1CA9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
            }`}
          >
            Approved ({approvedItems.length})
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-2 py-1 rounded-lg text-[13px] transition ${
              filter === "pending"
                ? "bg-[#7A1CA9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
            }`}
          >
            Pending ({waitingCount})
          </button>

          <button
            onClick={() => setFilter("notBooked")}
            className={`px-2 py-1 rounded-lg text-[13px] transition ${
              filter === "notBooked"
                ? "bg-[#7A1CA9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
            }`}
          >
            Not Booked Yet ({notBookedItems.length})
          </button>
        </div>

        <hr className="border-t border-gray-200 mb-4" />
        <CollectionSummary
          navigate={navigate}
          collectionItems={collectionItems}
          approvedItems={approvedItems}
          waitingCount={waitingCount}
          approvedTotals={approvedTotals}
          approvedSecurityDepositTotal={approvedSecurityDepositTotal}
          approvedGrandTotalWithDeposit={approvedGrandTotalWithDeposit}
        />
      </div>

      {/* RIGHT SCROLLABLE ITEMS LIST */}
      <div className="flex-1 pl-6 pt-8 pb-12">
        {collectionItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[90vh] w-full">
            <img src={emptycollection} className="w-64 h-64 mb-3" />
            <h2 className="text-[22px] font-bold">Your Collection is Empty</h2>
            <p className="text-gray-500 text-center max-w-sm mb-4">
              Looks like you haven’t added any items yet.
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="bg-white border border-[#7A1CA9]/20 text-[#7A1CA9] px-3 py-1.5 text-sm rounded-lg shadow hover:bg-gray-50"
            >
              Go to Shop ➔
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {sortedItems.map((item) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  calculateItemTotal={calculateItemTotal}
                  openCancelModal={openCancelModal}
                  handleRemoveItem={handleRemoveItem}
                  navigate={navigate}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CancelConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancelBooking}
      />
    </div>
  );
};

export default CollectionPage;
