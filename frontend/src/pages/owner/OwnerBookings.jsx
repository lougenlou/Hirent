// src/pages/owner/OwnerBookings.jsx
import React, { useState, useEffect } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ClockFading,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
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

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showApprovalModal, setShowApprovalModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch owner bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await makeAPICall(ENDPOINTS.BOOKINGS.OWNER_BOOKINGS);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Calculate stats dynamically from bookings
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter and search bookings from backend data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          (b.item?.name || "").toLowerCase().includes(q) ||
          (b.renter?.name || "").toLowerCase().includes(q) ||
          (b.item?.category || "").toLowerCase().includes(q) ||
          (b._id || "").toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (b) => b.status === statusFilter.toLowerCase()
      );
    }

    setBookings(filtered);
  }, [debouncedSearch, statusFilter]);

  // Update booking status on backend
  const handleApprove = async (booking) => {
    try {
      await makeAPICall(ENDPOINTS.BOOKINGS.UPDATE_STATUS(booking._id), {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "approved" } : b
        )
      );
      setShowApprovalModal(null);
    } catch (err) {
      console.error("Error approving booking:", err);
      setError("Failed to approve booking");
    }
  };

  // Reject booking on backend
  const handleReject = async (booking) => {
    try {
      await makeAPICall(ENDPOINTS.BOOKINGS.UPDATE_STATUS(booking._id), {
        method: "PUT",
        body: JSON.stringify({ status: "rejected", reason: rejectReason }),
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "rejected" } : b
        )
      );
      setShowRejectModal(null);
      setRejectReason("");
    } catch (err) {
      console.error("Error rejecting booking:", err);
      setError("Failed to reject booking");
    }
  };

  // Refresh bookings from backend
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await makeAPICall(ENDPOINTS.BOOKINGS.OWNER_BOOKINGS);
      setBookings(Array.isArray(data) ? data : []);
      setSearchQuery("");
      setStatusFilter("All");
    } catch (err) {
      console.error("Error refreshing bookings:", err);
      setError("Failed to refresh bookings");
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        label: "Pending",
        style: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },
      approved: {
        label: "Approved",
        style: "bg-green-100 text-green-700",
        icon: CheckCircle2,
      },
      rejected: {
        label: "Rejected",
        style: "bg-red-100 text-red-700",
        icon: XCircle,
      },
      completed: {
        label: "Completed",
        style: "bg-blue-100 text-blue-700",
        icon: Check,
      },
    };
    const config = statusMap[status?.toLowerCase()] || statusMap.pending;
    const IconComponent = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.style}`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-gray-500">Loading bookings...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-red-500">{error}</p>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Package className="w-16 h-16 text-gray-300" />
                      <p className="text-gray-500 text-md">No bookings yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <React.Fragment key={booking._id}>
                    <tr
                      className={`hover:bg-gray-50 cursor-pointer transition ${
                        expandedRow === booking._id ? "bg-white" : ""
                      }`}
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === booking._id ? null : booking._id
                        )
                      }
                    >
                      {/* Item column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              booking.item?.image ||
                              "https://via.placeholder.com/48"
                            }
                            alt={booking.item?.name || "Item"}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {booking.item?.name || "Unknown Item"}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {booking._id?.substring(0, 8) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Renter column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-[#7A1CA9]">
                              {(booking.renter?.name || "U").charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {booking.renter?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.renter?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Duration column */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <ClockFading className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm text-yellow-600">
                              {booking.days || 1} day
                              {booking.days !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-[13px] text-gray-500">
                              {formatDate(booking.bookedFrom)} –{" "}
                              {formatDate(booking.bookedTo)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Total column */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-800">
                          ₱{(booking.totalPrice || 0).toLocaleString()}
                        </p>
                      </td>

                      {/* Status column */}
                      <td className="py-4 px-6">
                        {getStatusBadge(booking.status)}
                      </td>

                      {/* Actions column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowApprovalModal(booking);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                title="Approve booking"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRejectModal(booking);
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Reject booking"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRow(
                                expandedRow === booking._id ? null : booking._id
                              );
                            }}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                            title="View details"
                          >
                            {expandedRow === booking._id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row with booking details */}
                    {expandedRow === booking._id && (
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
                                <div className="flex items-center gap-2 text-sm">
                                  <Hash className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Item ID:
                                  </span>
                                  <span className="text-gray-800 font-medium">
                                    {booking.item?._id?.substring(0, 8) ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Package className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Category:
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.item?.category || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Shield className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Security Deposit:
                                  </span>
                                  <span className="text-gray-800 font-semibold">
                                    ₱
                                    {(
                                      booking.securityDeposit || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Daily Rate:
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.item?.price || 0
                                    ).toLocaleString()}
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
                                    {booking.renter?.email || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.renter?.phone || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.renter?.address || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-gray-600">
                                    {booking.renter?.rating || "N/A"} rating
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
                                  <span className="text-gray-500">
                                    Daily Rate
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.item?.price || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Days</span>
                                  <span className="text-gray-800">
                                    {booking.days || 1}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Subtotal
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      (booking.item?.price || 0) *
                                      (booking.days || 1)
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Shipping
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.shippingFee || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Security Deposit
                                  </span>
                                  <span className="text-orange-600 font-medium">
                                    ₱
                                    {(
                                      booking.securityDeposit || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-semibold">
                                  <span className="text-gray-800">Total</span>
                                  <span className="text-[#7A1CA9]">
                                    ₱
                                    {(booking.totalPrice || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">
                                    Payment Method
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.paymentMethod || "N/A"}
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

              {/* Booking summary from backend data */}
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      showApprovalModal.item?.image ||
                      "https://via.placeholder.com/56"
                    }
                    alt={showApprovalModal.item?.name || "Item"}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showApprovalModal.item?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showApprovalModal._id?.substring(0, 8) || "N/A"}
                    </p>
                    <p className="text-sm font-semibold text-[#7A1CA9]">
                      ₱{(showApprovalModal.totalPrice || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-gray-200 pt-2">
                  <span className="text-gray-500">Security Deposit:</span>
                  <span className="text-orange-600 font-semibold">
                    ₱{(showApprovalModal.securityDeposit || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-500">Renter:</span>
                  <span className="text-gray-800">
                    {showApprovalModal.renter?.name || "Unknown"}
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

              {/* Booking summary from backend data */}
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      showRejectModal.item?.image ||
                      "https://via.placeholder.com/56"
                    }
                    alt={showRejectModal.item?.name || "Item"}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showRejectModal.item?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showRejectModal._id?.substring(0, 8) || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Renter: {showRejectModal.renter?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rejection reason input */}
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
