import React from "react";

// Stats Data with Updated Icons
const stats = [
  {
    label: "Total Listings",
    value: 0,
    sublabel: "Items",
    icon: "/icons/listing1.png", // Local icon for Total Listings
    iconBg: "bg-purple-600",
    sublabelColor: "text-green-600",
  },
  {
    label: "Active Rentals",
    value: 0,
    sublabel: "Active",
    icon: "/icons/calendar.png", // Local icon for Active Rentals
    iconBg: "bg-purple-600",
    sublabelColor: "text-red-600",
  },
  {
    label: "Pending Bookings",
    value: 0,
    sublabel: "Bookings",
    icon: "/icons/bookings1.png", // Updated icon for Pending Bookings
    iconBg: "bg-purple-600",
    sublabelColor: "text-orange-500",
  },
  {
    label: "Earnings This Month",
    value: "₱ 0.00",
    sublabel: "Earnings",
    icon: "/icons/dollar1.png", // Updated icon for Earnings
    iconBg: "bg-purple-600",
    sublabelColor: "text-green-600",
  },
];

export default function OwnerDashboard() {
  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="text-gray-400 text-xs mb-2">My Dashboard</div>
        <h2 className="text-2xl font-bold mb-1">
          Hello, <span className="text-black">John Doe!</span>
        </h2>
        <div className="text-gray-500 mb-8 text-base">
          Your hub to add, edit, and monitor all your listings and rental activity
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                  <img src={stat.icon} alt={stat.label} className="w-6 h-6" />
                </span>
              </div>
              <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
              <div className={`text-xs font-medium ${stat.sublabelColor}`}>{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className="bg-white border border-gray-200 rounded-xl py-12 px-8 flex flex-col items-center mt-2">
          <div className="w-40 h-40 rounded-full bg-transparent flex items-center justify-center mb-4">
            {/* Updated margin to move the text upward */}
            <img src="/bg/circle.png" alt="Empty state circle" className="w-32 h-32 rounded-full" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">
            Aw, you still don't have items
          </h3>
          <div className="text-gray-500 text-center mb-4">
            Your hub to add, edit, and monitor all your listings and rental activity
          </div>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
            Add a New Listing +
          </button>
        </div>
      </main>
    </div>
  );
}
