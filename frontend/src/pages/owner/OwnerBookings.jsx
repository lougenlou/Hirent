// src/pages/owner/OwnerBookings.jsx
import React, { useState, useEffect } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ClockFading,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  ShieldCheck,
  X,
  Check,
  Package,
  TrendingUp,
  CalendarClock,
  Download,
  RefreshCw,
  Hash,
  Shield,
} from "lucide-react";

const MOCK_BOOKINGS = [
  {
    id: 1,
    productId: "PRD-2024-001",
    item: "Gucci Duffle Bag",
    category: "Fashion",
    itemImage: "/assets/items/gucci_duffle_bag.png",
    securityDeposit: "₱2,000",
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
    price: "₱1,200/day",
    discount: "with 15% discount",
    bookedDates: "2025-12-10",
    bookedDateEnd: "2025-12-14",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱6,000",
    shipping: "Free",
    discountPercent: "15%",
    total: "₱5,100.00",
    status: "Pending",
    createdAt: "2025-12-08",
  },
  {
    id: 2,
    productId: "PRD-2024-002",
    item: "HAVIT HV Gaming Headset",
    category: "Gaming",
    itemImage: "/assets/items/havit_hv.png",
    securityDeposit: "₱500",
    renter: {
      name: "Juan Dela Cruz",
      email: "juan.delacruz@gmail.com",
      phone: "+63 917 123 4567",
      avatar: "",
      address: "456 Rizal Ave, Quezon City, Metro Manila 1100",
      verified: true,
      joined: "2023-01-15",
      rating: 4.8,
    },
    price: "₱150/day",
    discount: "",
    bookedDates: "2025-12-12",
    bookedDateEnd: "2025-12-16",
    duration: "5 days",
    paymentMethod: "GCash",
    subtotal: "₱750",
    shipping: "Free",
    discountPercent: "",
    total: "₱750.00",
    status: "Approved",
    createdAt: "2025-12-09",
  },
  {
    id: 3,
    productId: "PRD-2024-003",
    item: "IPS LCD Gaming Monitor",
    category: "Electronics",
    itemImage: "/assets/items/IPS_lcd.png",
    securityDeposit: "₱3,000",
    renter: {
      name: "Ana Reyes",
      email: "ana.reyes@gmail.com",
      phone: "+63 918 765 4321",
      avatar: "",
      address: "789 Ayala Blvd, Pasay City, Metro Manila 1300",
      verified: false,
      joined: "2024-06-20",
      rating: 4.2,
    },
    price: "₱500/day",
    discount: "with 20% discount",
    bookedDates: "2025-12-15",
    bookedDateEnd: "2025-12-19",
    duration: "5 days",
    paymentMethod: "Maya",
    subtotal: "₱2,500",
    shipping: "Free",
    discountPercent: "20%",
    total: "₱2,000.00",
    status: "Pending",
    createdAt: "2025-12-10",
  },
  {
    id: 4,
    productId: "PRD-2024-004",
    item: "AK-900 Wired Keyboard",
    category: "Electronics",
    itemImage: "/assets/items/Keyboard.png",
    securityDeposit: "₱800",
    renter: {
      name: "Pedro Garcia",
      email: "pedro.garcia@gmail.com",
      phone: "+63 919 234 5678",
      avatar: "",
      address: "321 Taft Ave, Manila City 1000",
      verified: true,
      joined: "2021-11-05",
      rating: 4.9,
    },
    price: "₱200/day",
    discount: "with 10% discount",
    bookedDates: "2025-12-20",
    bookedDateEnd: "2025-12-22",
    duration: "3 days",
    paymentMethod: "Bank Transfer",
    subtotal: "₱600",
    shipping: "Free",
    discountPercent: "10%",
    total: "₱540.00",
    status: "Approved",
    createdAt: "2025-12-11",
  },
  {
    id: 5,
    productId: "PRD-2024-005",
    item: "RGB Liquid CPU Cooler",
    category: "Computer Parts",
    itemImage: "/assets/items/RGB_liquid_CPU.png",
    securityDeposit: "₱1,500",
    renter: {
      name: "Lisa Mendoza",
      email: "lisa.mendoza@gmail.com",
      phone: "+63 920 345 6789",
      avatar: "",
      address: "567 EDSA, Mandaluyong City 1550",
      verified: true,
      joined: "2023-08-12",
      rating: 4.7,
    },
    price: "₱350/day",
    discount: "",
    bookedDates: "2025-12-25",
    bookedDateEnd: "2025-12-28",
    duration: "4 days",
    paymentMethod: "GCash",
    subtotal: "₱1,400",
    shipping: "Free",
    discountPercent: "",
    total: "₱1,400.00",
    status: "Pending",
    createdAt: "2025-12-12",
  },
  {
    id: 6,
    productId: "PRD-2024-006",
    item: "ASUS Vivobook Laptop",
    category: "Electronics",
    itemImage: "/assets/items/laptop.png",
    securityDeposit: "₱5,000",
    renter: {
      name: "Carlos Tan",
      email: "carlos.tan@gmail.com",
      phone: "+63 921 456 7890",
      avatar: "",
      address: "890 Shaw Blvd, Pasig City 1600",
      verified: true,
      joined: "2022-03-18",
      rating: 4.6,
    },
    price: "₱800/day",
    discount: "with 25% discount",
    bookedDates: "2025-12-05",
    bookedDateEnd: "2025-12-07",
    duration: "3 days",
    paymentMethod: "Maya",
    subtotal: "₱2,400",
    shipping: "Free",
    discountPercent: "25%",
    total: "₱1,800.00",
    status: "Completed",
    createdAt: "2025-12-01",
  },
];

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([...MOCK_BOOKINGS]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showApprovalModal, setShowApprovalModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate stats dynamically
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    approved: bookings.filter((b) => b.status === "Approved").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    rejected: bookings.filter((b) => b.status === "Rejected").length,
  };

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter bookings
  useEffect(() => {
    let filtered = [...MOCK_BOOKINGS];

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.item.toLowerCase().includes(q) ||
          b.renter.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.productId.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setBookings(filtered);
  }, [debouncedSearch, statusFilter]);

  const handleApprove = (booking) => {
    setBookings(
      bookings.map((b) =>
        b.id === booking.id ? { ...b, status: "Approved" } : b
      )
    );
    setShowApprovalModal(null);
  };

  const handleReject = (booking) => {
    setBookings(
      bookings.map((b) =>
        b.id === booking.id ? { ...b, status: "Rejected" } : b
      )
    );
    setShowRejectModal(null);
    setRejectReason("");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setBookings([...MOCK_BOOKINGS]);
      setSearchQuery("");
      setStatusFilter("All");
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      Completed: "bg-blue-100 text-blue-700",
    };
    const icons = {
      Pending: <Clock className="w-3 h-3" />,
      Approved: <CheckCircle2 className="w-3 h-3" />,
      Rejected: <XCircle className="w-3 h-3" />,
      Completed: <Check className="w-3 h-3" />,
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />

      <main className="flex-1 p-8 ml-60">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Bookings</h1>
            <p className="text-gray-500">
              View and manage all booking requests from renters
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7A1CA9] text-white rounded-xl text-sm font-medium hover:bg-[#6a1894] transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-8 h-8 text-[#7A1CA9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockFading className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.pending}
                </p>
                <p className="text-xs text-gray-500">Pending Approval</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BadgeCheck className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.approved}
                </p>
                <p className="text-xs text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items, renters, product ID, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex gap-2">
                {["All", "Pending", "Approved", "Completed", "Rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        statusFilter === status
                          ? "bg-[#7A1CA9] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                      {status !== "All" && (
                        <span className="ml-1">
                          (
                          {status === "Pending"
                            ? stats.pending
                            : status === "Approved"
                            ? stats.approved
                            : status === "Completed"
                            ? stats.completed
                            : stats.rejected}
                          )
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-5 text-[13px] font-medium text-gray-600">
                  Item
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Renter
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Duration
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Total
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 text-sm">No bookings found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <tr
                      className={`hover:bg-gray-50 cursor-pointer transition ${
                        expandedRow === booking.id ? "bg-white" : ""
                      }`}
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === booking.id ? null : booking.id
                        )
                      }
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.itemImage}
                            alt={booking.item}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {booking.item}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {booking.productId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-[#7A1CA9]">
                              {booking.renter.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm flex items-center gap-1">
                              {booking.renter.name}
                              {booking.renter.verified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.renter.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          {/* Duration with Clock Icon */}
                          <div className="flex items-center gap-1">
                            <ClockFading className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm text-yellow-600">
                              {booking.duration}
                            </p>
                          </div>

                          {/* Booked Dates with Calendar Icon */}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-[13px] text-gray-500">
                              {formatDate(booking.bookedDates)} –{" "}
                              {formatDate(booking.bookedDateEnd)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-800">
                          {booking.total}
                        </p>
                        {booking.discountPercent && (
                          <p className="text-xs text-green-600">
                            {booking.discountPercent} off
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {booking.status === "Pending" && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowApprovalModal(booking);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRejectModal(booking);
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRow(
                                expandedRow === booking.id ? null : booking.id
                              );
                            }}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                          >
                            {expandedRow === booking.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedRow === booking.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-5 py-6">
                          <div className="grid grid-cols-3 gap-6">
                            {/* Product Info */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Package className="w-4 h-4 text-[#7A1CA9]" />
                                Product Information
                              </h4>
                              <div className="space-y-2">
                                <div className="flex just gap-2 text-sm">
                                  <Hash className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Product ID:
                                  </span>
                                  <span className="text-gray-800 font-medium">
                                    {booking.productId}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Package className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Category:
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Shield className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Security Deposit:
                                  </span>
                                  <span className="text-gray-800 font-semibold">
                                    {booking.securityDeposit}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Daily Rate:
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.price}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Renter Info */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4 text-[#7A1CA9]" />
                                Renter Information
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.renter.email}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.renter.phone}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.renter.address}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-gray-600">
                                    {booking.renter.rating} rating
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CalendarClock className="w-4 h-4 text-[#7A1CA9]" />
                                Payment Summary
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Price</span>
                                  <span className="text-gray-800">
                                    {booking.price}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Subtotal
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.subtotal}
                                  </span>
                                </div>
                                {booking.discountPercent && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Discount
                                    </span>
                                    <span className="text-green-600">
                                      -{booking.discountPercent}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Shipping
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.shipping}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Security Deposit
                                  </span>
                                  <span className="text-orange-600 font-medium">
                                    {booking.securityDeposit}
                                  </span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-semibold">
                                  <span className="text-gray-800">Total</span>
                                  <span className="text-[#7A1CA9]">
                                    {booking.total}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">
                                    Payment Method
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.paymentMethod}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-modalSlideIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Approve Booking
                  </h3>
                  <p className="text-sm text-gray-500">
                    Confirm this booking request
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={showApprovalModal.itemImage}
                    alt={showApprovalModal.item}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showApprovalModal.item}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showApprovalModal.productId}
                    </p>
                    <p className="text-sm font-semibold text-[#7A1CA9]">
                      {showApprovalModal.total}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-gray-200 pt-2">
                  <span className="text-gray-500">Security Deposit:</span>
                  <span className="text-orange-600 font-semibold">
                    {showApprovalModal.securityDeposit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-500">Renter:</span>
                  <span className="text-gray-800">
                    {showApprovalModal.renter.name}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(null)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApprove(showApprovalModal)}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Approve Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-modalSlideIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Reject Booking
                  </h3>
                  <p className="text-sm text-gray-500">
                    Provide a reason for rejection
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={showRejectModal.itemImage}
                    alt={showRejectModal.item}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showRejectModal.item}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showRejectModal.productId}
                    </p>
                    <p className="text-sm text-gray-500">
                      Renter: {showRejectModal.renter.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter the reason for rejecting this booking..."
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(null);
                    setRejectReason("");
                  }}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(showRejectModal)}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Animation Style */}
      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modalSlideIn {
          animation: modalSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
