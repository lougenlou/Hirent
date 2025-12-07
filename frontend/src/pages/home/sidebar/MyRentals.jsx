import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
} from "lucide-react";
import mockListings from "../../../data/mockData";
import sampleUsercollection from "../../../data/sampleUsercollection";
import CancelConfirmationModal from "../../../components/modals/CancelModal";
import { ViewDetailsModal } from "../../../components/modals/ViewDetailsModal";
import RentalSummary from "../../../components/cards/RentalSummary";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";
import RentalCard from "../../../components/cards/MyRentalsCard";

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
    document.title = "Hirent — My Rentals";

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

    const collectionData = user.collection?.length
      ? user.collection
      : sampleUsercollection;

    const merged = collectionData
      .map((r) => {
        const product = mockListings.find((p) => p.id === r.id);
        if (!product) return null;

        const parsedPrice = parseFloat(
          (product.price || "0").toString().replace(/[^0-9.]/g, "")
        );

        return {
          ...product,
          ...r,
          price: parsedPrice,
          totalAmount: parsedPrice * (r.days || 1),
          status:
            r.status && r.status.trim() !== ""
              ? r.status
              : !r.bookedFrom || !r.bookedTo
              ? "cancelled"
              : "pending",
        };
      })
      .filter(Boolean);

    const limited = [];

    const approved = merged.filter((r) => r.status === "approved").slice(0, 1);
    const pending = merged.filter((r) => r.status === "pending").slice(0, 2);
    const cancelled = merged
      .filter((r) => r.status === "cancelled")
      .slice(0, 1);
    const completed = merged
      .filter((r) => r.status === "completed")
      .slice(0, 1);

    limited.push(...approved, ...pending, ...cancelled, ...completed);

    setRentals(limited);
  }, []);

  const handleCancel = (id) => {
    setRentals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "cancelled" } : item
      )
    );
  };

  const confirmCancel = () => {
    handleCancel(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  const filtered = rentals.filter((r) => {
    if (filter === "approved") return r.status === "approved";
    if (filter === "pending") return r.status === "pending";
    if (filter === "cancelled") return r.status === "cancelled";
    if (filter === "completed") return r.status === "completed";

    return true;
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
        {/* Back + Sort in one row */}
        <div className="flex items-center justify-between mb-3 mt-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back
          </button>
        </div>

        {/* MY RENTALS TITLE */}
        <div className="flex items-start gap-4 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
            <Package className="w-8 h-8 text-[#a12fda]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900 mt-1 ">
              My Rentals
            </h1>
            <p className="text-gray-500 text-sm mr-4">
              View and manage your booked items
            </p>
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
          {["all", "approved", "pending", "cancelled", "completed"].map(
            (cat) => (
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
                {
                  rentals.filter((r) =>
                    cat === "all" ? true : r.status === cat
                  ).length
                }
                )
              </button>
            )
          )}
        </div>

        {/* RENTAL SUMMARY BOX */}
        <RentalSummary rentals={rentals} />

        {/* FOOTER INFO */}
        <div className="bg-purple-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-purple-700 text-[13px]">
          <ul className="space-y-1">
            <li>✓ View and manage all your booked items in one place</li>
            <li>
              ✓ Keep track of rental status (pending, approved, completed,
              cancelled)
            </li>
            <li>✓ Get notified of updates and messages from owners</li>
            <li>✓ Re-book completed rentals easily</li>
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN — RENTALS LIST */}
      <div className="flex-1 pl-6 pb-20 pt-10">
        {/* RENTAL CARDS */}
        <div className="grid grid-cols-1 gap-4">
          {sorted.map((item) => (
            <RentalCard
              key={item.id}
              item={item}
              onViewDetails={(id) => {
                setSelectedRentalId(id);
                setDetailsModalOpen(true);
              }}
              onRemove={(id) =>
                setRentals((prev) => prev.filter((r) => r.id !== id))
              }
              onCancel={(id) => {
                setSelectedId(id);
                setShowModal(true);
              }}
            />
          ))}
        </div>
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
