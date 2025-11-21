import React, { useState, useEffect } from "react";
import BookingStatsBar from "../components/bookings/BookingStatsBar";
import BookingTable from "../components/bookings/BookingTable";
import ApprovalModal from "../components/bookings/ApprovalModal";
import RejectModal from "../components/bookings/RejectModal";
import { HiOutlineSearch } from "react-icons/hi";

const KPI_STATS = [
  {
    label: "Total Bookings",
    value: 47,
    sub: "+2 this month",
    iconColor: "bg-purple-700",
    valueColor: "text-gray-900",
    subColor: "text-green-600",
  },
  {
    label: "Upcoming Bookings",
    value: 15,
    sub: "3 this week",
    iconColor: "bg-purple-700",
    valueColor: "text-gray-900",
    subColor: "text-orange-600",
  },
  {
    label: "Pending Approvals",
    value: 8,
    sub: "Waiting for your confirmation",
    iconColor: "bg-purple-700",
    valueColor: "text-gray-900",
    subColor: "text-yellow-600",
  },
];

const MOCK_BOOKINGS = [
  {
    id: 1,
    item: "Canon EOS M50",
    category: "Gadgets",
    itemImage: "/assets/product/canoneos.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 912 345 6789",
      avatar: "",
      address: "123 Bonifacio St, Makati City, Metro Manila 1200",
      verified: true,
      joined: "2022-04-01",
      rating: 4.5,
    },
    price: "₱750/day",
    discount: "with 15% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱750/day",
    shipping: "Free",
    discountPercent: "15%",
    total: "₱637.50",
    status: "Pending",
  },
  {
    id: 2,
    item: "Camera Lens",
    category: "Gadgets",
    itemImage: "/assets/product/camlens.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 912 345 6789",
      avatar: "",
      address: "123 Bonifacio St, Makati City, Metro Manila 1200",
      verified: true,
      joined: "2022-04-01",
      rating: 4.5,
    },
    price: "₱250/day",
    discount: "",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱250/day",
    shipping: "Free",
    discountPercent: "",
    total: "₱250.00",
    status: "Approved",
  },
  {
    id: 3,
    item: "Electric Scooter",
    category: "Transport",
    itemImage: "/assets/product/e-scooter.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 912 345 6789",
      avatar: "",
      address: "123 Bonifacio St, Makati City, Metro Manila 1200",
      verified: true,
      joined: "2022-04-01",
      rating: 4.5,
    },
    price: "₱800/day",
    discount: "with 30% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱800/day",
    shipping: "Free",
    discountPercent: "30%",
    total: "₱560.00",
    status: "Pending",
  },
  {
    id: 4,
    item: "Camping Tent",
    category: "Outdoor",
    itemImage: "/assets/product/tent.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 912 345 6789",
      avatar: "",
      address: "123 Bonifacio St, Makati City, Metro Manila 1200",
      verified: true,
      joined: "2022-04-01",
      rating: 4.5,
    },
    price: "₱250/day",
    discount: "with 25% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱250/day",
    shipping: "Free",
    discountPercent: "25%",
    total: "₱187.50",
    status: "Approved",
  },
  {
    id: 5,
    item: "DJI Mavic Air 2",
    category: "Gadgets",
    itemImage: "/assets/product/dji.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 912 345 6789",
      avatar: "",
      address: "123 Bonifacio St, Makati City, Metro Manila 1200",
      verified: true,
      joined: "2022-04-01",
      rating: 4.5,
    },
    price: "₱700/day",
    discount: "",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱700/day",
    shipping: "Free",
    discountPercent: "",
    total: "₱700.00",
    status: "Pending",
  },
];

export default function OwnerBookingsDashboard() {
  const [bookings, setBookings] = useState([...MOCK_BOOKINGS]);
  const [expandedRow, setExpandedRow] = useState(null);

  const [approvalModalData, setApprovalModalData] = useState(null);
  const [rejectModalData, setRejectModalData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setBookings([...MOCK_BOOKINGS]);
      return;
    }

    const q = debouncedSearch.toLowerCase();
    const filtered = MOCK_BOOKINGS.filter(
      (b) =>
        b.item.toLowerCase().includes(q) ||
        b.renter.name.toLowerCase().includes(q)
    );

    setBookings(filtered);
  }, [debouncedSearch]);

  return (
    <div className="w-full px-10 py-10 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">

        {/* HEADER + KPIs ALIGNED */}
        <div className="flex justify-between items-start mb-10">
          
          {/* LEFT SIDE: HEADER + SEARCH */}
          <div className="flex flex-col w-full max-w-md">
            <h2 className="font-semibold text-gray-600 text-base">Bookings</h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Hello, <span className="text-purple-700">John Doe!</span>
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              View and manage all bookings from renters
            </p>

            {/* SEARCH BAR — FIXED ICON ALIGNMENT */}
            <div className="relative w-full">
              <HiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Search items or renters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2
                  border border-purple-400 rounded-xl
                  bg-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                "
              />
            </div>
          </div>

          {/* RIGHT SIDE: KPI CARDS */}
          <div className="flex gap-6 ml-10">
            <BookingStatsBar stats={KPI_STATS} />
          </div>
        </div>

        {/* TABLE */}
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
              setBookings(
                bookings.map((b) =>
                  b.id === approvalModalData.id
                    ? { ...b, status: "Approved" }
                    : b
                )
              );
              setApprovalModalData(null);
            }}
          />
        )}

        {/* REJECTION MODAL */}
        {rejectModalData && (
          <RejectModal
            booking={rejectModalData}
            onClose={() => setRejectModalData(null)}
            onConfirm={() => {
              setBookings(
                bookings.map((b) =>
                  b.id === rejectModalData.id
                    ? { ...b, status: "Rejected" }
                    : b
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
