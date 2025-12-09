import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import emptyItems from "../../../assets/empty-listings.png"
import CancelConfirmationModal from "../../../components/modals/CancelModal";
import { ViewDetailsModal } from "../../../components/modals/ViewDetailsModal";
import RentalSummary from "../../../components/cards/RentalSummary";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import RentalCard from "../../../components/cards/MyRentalsCard";
import { makeAPICall, ENDPOINTS } from "../../../config/api";

const MyRentalsPage = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState(null);

  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    document.title = "Hirent — Rental History";
    return () => { document.title = "Hirent"; };
  }, []);

  // Fetch user's rentals from backend
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await makeAPICall(ENDPOINTS.BOOKINGS.GET_MY);
        if (Array.isArray(data)) {
          // Calculate totalAmount for each rental
          const processed = data.map((rental) => {
            const price = parseFloat(
              String(rental.item?.price || 0).replace(/[^0-9.]/g, "")
            );
            const days = rental.days || 1;
            return {
              ...rental,
              price,
              totalAmount: price * days,
              status: rental.status || "pending",
            };
          });
          setRentals(processed);
        }
      } catch (err) {
        console.error("Error fetching rentals:", err);
      }
    };

    fetchRentals();
  }, []);

  const handleCancel = async (id) => {
    try {
      await makeAPICall(ENDPOINTS.BOOKINGS.CANCEL(id), { method: "PUT" });
      setRentals((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item))
      );
    } catch (err) {
      console.error("Error cancelling rental:", err);
    }
  };

  const confirmCancel = () => {
    handleCancel(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  const safeRentals = Array.isArray(rentals) ? rentals : [];
  
  const filtered = safeRentals.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aDate = new Date(a.bookedFrom || a.addedAt || Date.now());
    const bDate = new Date(b.bookedFrom || b.addedAt || Date.now());
    return sortOrder === "latest" ? bDate - aDate : aDate - bDate;
  });

  return (
    <div className="flex min-h-screen px-4 md:px-6 lg:px-8">
      {/* LEFT STATIC COLUMN */}
      <div className="w-[560px] pl-16 flex-shrink-0 sticky top-10 self-start h-fit bg-gray-50 border-r border-gray-200">
        {/* Back + Sort */}
        <div className="flex items-center justify-between mb-3 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back
          </button>
        </div>

        {/* TITLE */}
        <div className="flex items-start gap-4 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
            <Package className="w-8 h-8 text-[#a12fda]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900 mt-1">Your Rental History</h1>
            <p className="text-gray-500 text-sm mr-4">View and manage your booked items</p>
          </div>
          <div className="mt-4">
            <SortDropdown
              options={["Latest", "Oldest"]}
              onSortChange={(value) => setSortOrder(value.toLowerCase())}
            />
          </div>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-4 mr-5">
          {["all", "approved", "pending", "cancelled", "completed"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1 rounded-lg text-[13px] transition ${
                filter === cat
                  ? "bg-[#7A1CA9] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} (
              {safeRentals.filter((r) => (cat === "all" ? true : r.status === cat)).length})
            </button>
          ))}
        </div>

        {/* RENTAL SUMMARY */}
        <RentalSummary rentals={rentals} />

        {/* FOOTER INFO */}
        <div className="bg-purple-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-purple-700 text-[13px]">
          <ul className="space-y-1">
            <li>✓ View and manage all your booked items in one place</li>
            <li>✓ Keep track of rental status (pending, approved, completed, cancelled)</li>
            <li>✓ Get notified of updates and messages from owners</li>
            <li>✓ Re-book completed rentals easily</li>
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN — RENTALS LIST */}
      <div className="flex-1 pl-6 pb-20 pt-10">
  {rentals.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[90vh] w-full">
      <img
        src={emptyItems}
        alt="No Rentals"
        className="w-64 h-64 mb-3 object-contain"
      />
      <h2 className="text-[22px] font-bold text-gray-700">No bookings yet.</h2>
      <p className="text-gray-400 text-center max-w-sm mb-4">
        Looks like you haven’t booked any items yet.
      </p>
      <button
        onClick={() => navigate("/collection")}
        className="bg-white border border-[#7A1CA9]/20 text-[#7A1CA9] px-3 py-1.5 text-sm rounded-lg shadow hover:bg-gray-50"
      >
        Go to Collection ➔
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {sorted.map((item) => (
        <RentalCard
          key={item.id}
          item={item}
          onViewDetails={(id) => {
            setSelectedRentalId(id);
            setDetailsModalOpen(true);
          }}
          onRemove={(id) => setRentals((prev) => prev.filter((r) => r.id !== id))}
          onCancel={(id) => {
            setSelectedId(id);
            setShowModal(true);
          }}
        />
      ))}
    </div>
  )}
</div>


      {/* MODALS */}
      <CancelConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmCancel}
      />
      <ViewDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        rentalData={rentals}
        itemId={selectedRentalId}
      />
    </div>
  );
};

export default MyRentalsPage;
