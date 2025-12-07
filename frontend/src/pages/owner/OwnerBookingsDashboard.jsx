// OwnerBookingsDashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layouts/OwnerSidebar";
import { HiOutlineSearch } from "react-icons/hi";

import sampleBookings from "../../data/sampleBookings";
import BookingTable from "../../components/bookings/BookingTable";
import ApprovalModal from "../../components/bookings/ApprovalModal";
import RejectModal from "../../components/bookings/RejectModal";

// Import your images
import cameraImg from "../../assets/items/camera.png";
import camera1Img from "../../assets/items/camera1.png";
import droneImg from "../../assets/items/drone.png";
import gimbalImg from "../../assets/items/gimbal.png";
import laptopImg from "../../assets/items/laptop.png";

// Map item keys to images
const itemImages = {
  camera: cameraImg,
  camera1: camera1Img,
  drone: droneImg,
  gimbal: gimbalImg,
  laptop: laptopImg,
};

// Transform raw sampleBookings into structured data for the table
const transformBookings = (bookings) =>
  bookings.map((b) => ({
    ...b,
    itemImage: itemImages[b.itemKey] || "https://via.placeholder.com/40",
    renter: {
      name: b.renter || "Unknown",
      email: b.renterEmail || "-",
      phone: b.renterPhone || "-",
      address: b.renterAddress || "-",
      rating: b.renterRating || 4.5,
    },
    bookedDates: new Date(b.bookedDate.split(" - ")[0]),
    bookedDateEnd: new Date(b.bookedDate.split(" - ")[1]),
    price: `₱ ${b.pricePerDay}`,
    discount: b.discount || 0, // default discount to 0 if not provided
    securityDeposit: b.securityDeposit || 0, // default security deposit to 0 if not provided
  }));

export default function OwnerBookingsDashboard() {
  const [bookings, setBookings] = useState(transformBookings(sampleBookings));
  const [expandedRow, setExpandedRow] = useState(null);
  const [approvalModalData, setApprovalModalData] = useState(null);
  const [rejectModalData, setRejectModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter bookings by search query
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setBookings(transformBookings(sampleBookings));
      return;
    }

    const q = debouncedSearch.toLowerCase();
    const filtered = sampleBookings.filter(
      (b) =>
        b.item.toLowerCase().includes(q) ||
        (b.renter || "").toLowerCase().includes(q)
    );

    setBookings(transformBookings(filtered));
  }, [debouncedSearch]);

  return (
    <div className="flex bg-gray-50 pl-72 pr-8 min-h-screen">
      <Sidebar />

      <div className="flex-1 py-10">
        {/* HEADER + SEARCH */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Bookings</h1>
            <p className="text-gray-600 text-[15px] mb-4">
              View and manage all bookings from renters
            </p>

            <div className="relative w-full">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items or renters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-6 py-2 border border-gray-200 shadow-sm rounded-xl bg-white  text-purple-900   text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* KPI STATS Placeholder */}
          <div className="flex ml-6 gap-4">
            {/* TODO: map KPI_STATS here */}
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        <BookingTable
          bookings={bookings}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          onApprove={(b) => setApprovalModalData(b)}
          onReject={(b) => setRejectModalData(b)}
        />

        {/* APPROVAL MODAL */}
        {approvalModalData && (
          <ApprovalModal
            booking={approvalModalData}
            onClose={() => setApprovalModalData(null)}
            onConfirm={() => {
              setBookings((prev) =>
                prev.map((b) =>
                  b.id === approvalModalData.id
                    ? { ...b, status: "Approved" }
                    : b
                )
              );
              setApprovalModalData(null);
            }}
          />
        )}

        {/* REJECT MODAL */}
        {rejectModalData && (
          <RejectModal
            booking={rejectModalData}
            onClose={() => setRejectModalData(null)}
            onConfirm={() => {
              setBookings((prev) =>
                prev.map((b) =>
                  b.id === rejectModalData.id ? { ...b, status: "Rejected" } : b
                )
              );
              setRejectModalData(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
