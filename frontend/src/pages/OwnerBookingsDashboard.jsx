import React, { useState } from "react";
import BookingStatsBar from "../components/bookings/BookingStatsBar";
import BookingTable from "../components/bookings/BookingTable";
import RenterDetailsModal from "../components/bookings/RenterDetailsModal";
import { HiOutlineChevronDown } from "react-icons/hi";

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
  {
    label: "Earnings This Month",
    value: "₱5,500.00",
    sub: "+18% from last month",
    iconColor: "bg-purple-700",
    valueColor: "text-green-600",
    subColor: "text-green-600",
  },
];

const SORT_OPTIONS = ["Booked Date", "Pending", "Approved", "Completed"];

const MOCK_BOOKINGS = [
  {
    id: 1,
    item: "Canon EOS M50",
    category: "Gadgets",
    itemImage: "/assets/product/canoneos.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 998 888 1234",
      avatar: "/assets/icons/profile1.png",
      address: "Unit 301, HiRent Tower, QC",
      verified: true,
      joined: "2022-04-01",
    },
    price: "₱750/day",
    discount: "with 15% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    status: "Approved",
  },
  {
    id: 2,
    item: "Camera Lens",
    category: "Gadgets",
    itemImage: "/assets/product/camlens.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 998 888 1234",
      avatar: "/assets/icons/profile1.png",
      address: "Unit 301, HiRent Tower, QC",
      verified: true,
      joined: "2022-04-01",
    },
    price: "₱250/day",
    discount: "",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
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
      phone: "+63 998 888 1234",
      avatar: "/assets/icons/profile1.png",
      address: "Unit 301, HiRent Tower, QC",
      verified: true,
      joined: "2022-04-01",
    },
    price: "₱800/day",
    discount: "with 30% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
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
      phone: "+63 998 888 1234",
      avatar: "/assets/icons/profile1.png",
      address: "Unit 301, HiRent Tower, QC",
      verified: true,
      joined: "2022-04-01",
    },
    price: "₱250/day",
    discount: "with 25% discount",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    status: "Completed",
  },
  {
    id: 5,
    item: "DJI Mavic Air 2",
    category: "Gadgets",
    itemImage: "/assets/product/dji.png",
    renter: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "+63 998 888 1234",
      avatar: "/assets/icons/profile1.png",
      address: "Unit 301, HiRent Tower, QC",
      verified: true,
      joined: "2022-04-01",
    },
    price: "₱700/day",
    discount: "",
    bookedDates: "2025-10-20",
    bookedDateEnd: "2025-10-24",
    status: "Pending",
  },
];

export default function OwnerBookingsDashboard() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Booked Date");
  const [bookings, setBookings] = useState([...MOCK_BOOKINGS]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  function handleSort(option) {
    let filtered = [...MOCK_BOOKINGS];

    if (option === "Booked Date") {
      filtered.sort((a, b) => new Date(b.bookedDates) - new Date(a.bookedDates));
    } else if (option === "Pending") {
      filtered = filtered.filter((b) => b.status === "Pending");
    } else if (option === "Approved") {
      filtered = filtered.filter((b) => b.status === "Approved");
    } else if (option === "Completed") {
      filtered = filtered.filter((b) => b.status === "Completed");
    }

    setSortBy(option);
    setBookings(filtered);
    setSortOpen(false);
  }

  return (
    <div className="w-full px-12 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2">
          <h2 className="font-semibold text-gray-600 text-base">Bookings</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-0">
            Hello, <span className="text-purple-700">John Doe!</span>
          </h1>
          <p className="mb-7 text-gray-500 text-sm">
            View and manage all bookings from renters
          </p>
        </div>

        <BookingStatsBar stats={KPI_STATS} />

        <div className="flex flex-row gap-3 items-center mb-6 mt-1 justify-end">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="uppercase text-xs font-semibold">Sort by</span>
          </div>
          <div className="relative">
            <button
              className="rounded border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition min-w-[180px] justify-between"
              onClick={() => setSortOpen((v) => !v)}
            >
              {sortBy}
              <HiOutlineChevronDown className="w-5 h-5" />
            </button>
            {sortOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-10 py-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-purple-50 ${
                      sortBy === opt ? "font-bold text-purple-700" : ""
                    }`}
                    onClick={() => handleSort(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <BookingTable bookings={bookings} onViewDetails={setSelectedBooking} />

        {selectedBooking && (
          <RenterDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </div>
  );
}
