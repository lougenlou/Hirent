import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Calendar,
  Download,
  ChevronDown,
  Eye,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import cameraImg from "../../assets/items/camera.png";
import droneImg from "../../assets/items/drone.png";
import laptopImg from "../../assets/items/laptop.png";
import camera1Img from "../../assets/items/camera1.png";
import gimbalImg from "../../assets/items/gimbal.png";

import gcashIcon from "../../assets/payment/GCash.png";
import paypalIcon from "../../assets/payment/paypal.png";
import mayaIcon from "../../assets/payment/maya.png";
import bankIcon from "../../assets/payment/bank.png";
import cashIcon from "../../assets/payment/cash.png";

import totalBookingsIcon from "../../assets/icons/total.svg";
import activeRentalsIcon from "../../assets/icons/active.svg";
import pendingBookingsIcon from "../../assets/icons/pending.svg";
import totalEarningsIcon from "../../assets/icons/earnings.svg";

import AnimatedWelcome from "../../components/AnimatedWelcome";

import Sidebar from "../../components/layouts/OwnerSidebar";
import profPic from "../../assets/profile/prof_pic.jpg";
import sampleBookings from "../../data/sampleBookings";
import DropdownPortal from "../../components/button/DropdownPortal";

// dashboard section
import Stats from "../../components/ownerdashboard/Stats";
import RevenueStats from "../../components/ownerdashboard/RevenueStats";
import Booking from "../../components/ownerdashboard/Booking";
import BookingTable from "../../components/ownerdashboard/BookingTable";

// Compute stats dynamically
const totalBookings = sampleBookings.length;
const activeRentals = sampleBookings.filter(
  (b) => b.status === "Pending" || b.status === "Active"
).length;
const totalListings = [...new Set(sampleBookings.map((b) => b.item))].length;
const totalEarnings = sampleBookings.reduce(
  (sum, b) => sum + Number(b.pricePerDay),
  0
);

const stats = [
  {
    label: "Total Listings",
    value: totalBookings,
    sublabel: "+2 this month",
    sublabelColor: "text-green-500",
    date: "Updated just now",
    icon: totalBookingsIcon, // icon added here
  },
  {
    label: "Active Rentals",
    value: activeRentals,
    sublabel: "3 ending soon",
    sublabelColor: "text-red-500",
    date: "Updated just now",
    icon: activeRentalsIcon,
  },
  {
    label: "Pending Bookings",
    value: totalListings,
    sublabel: "Awaiting approval",
    sublabelColor: "text-yellow-500",
    date: "Updated just now",
    icon: pendingBookingsIcon,
  },
  {
    label: "Earnings This Month",
    value: `₱ ${totalEarnings.toLocaleString()}`,
    sublabel: "+18% from last month",
    sublabelColor: "text-green-500",
    date: "Updated just now",
    icon: totalEarningsIcon,
  },
];

export default function OwnerDashboard() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const downloadButtonRef = React.useRef(null);
  const dashboardRef = React.useRef(null);

  const [revenuePeriod, setRevenuePeriod] = React.useState("week"); // default

  const ActionsDropdown = ({ booking }) => {
    return (
      <button
        onClick={() => console.log("View booking", booking.id)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 transition"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </button>
    );
  };

  const paymentIcons = {
    gcash: gcashIcon,
    maya: mayaIcon,
    paypal: paypalIcon,
    "bank transfer": bankIcon,
    cash: cashIcon,
  };

  const itemImages = {
    camera: cameraImg,
    drone: droneImg,
    laptop: laptopImg,
    camera1: camera1Img,
    gimbal: gimbalImg,
  };

  const avatarPNGs = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
  ];

  const getRenterAvatar = (renter, index) => {
    // Pick avatar based on index for simplicity
    return avatarPNGs[index % avatarPNGs.length];
  };

  const exportToCSV = () => {
    // --- STATS ---
    const statsHeader = ["Stat", "Value"];
    const statsRows = stats.map((s) => [s.label, s.value]);

    // --- REVENUE STATS ---
    const revenueHeader = ["Revenue Period", "Amount"];
    const revenueRows = [
      [
        "This Month",
        sampleBookings.reduce((sum, b) => sum + Number(b.pricePerDay), 0),
      ],
      // You can add more periods if you have historical revenue
    ];

    // --- BOOKINGS TABLE ---
    const bookingsHeader = [
      "Booking ID",
      "Item",
      "Price",
      "Renter",
      "Booked Date",
      "Payment Method",
      "Status",
    ];
    const bookingsRows = sampleBookings.map((b) => [
      b.id,
      b.item,
      `₱ ${b.pricePerDay}`,
      b.renter,
      b.bookedDate,
      b.paymentMethod,
      b.status,
    ]);

    // Combine all sections with empty row in between
    const csvContent = [
      ["DASHBOARD STATS"],
      statsHeader,
      ...statsRows,
      [],
      ["REVENUE STATS"],
      revenueHeader,
      ...revenueRows,
      [],
      ["BOOKINGS TABLE"],
      bookingsHeader,
      ...bookingsRows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dashboard-data.csv");
    link.click();
  };

  const exportDashboardToPDF = () => {
    const doc = new jsPDF();

    let yPos = 15;

    // --- STATS ---
    doc.setFontSize(14);
    doc.text("Dashboard Stats", 14, yPos);
    yPos += 10;
    stats.forEach((stat) => {
      doc.setFontSize(12);
      doc.text(`${stat.label}: ${stat.value}`, 14, yPos);
      yPos += 8;
    });

    yPos += 5;

    // --- REVENUE STATS ---
    doc.setFontSize(14);
    doc.text("Revenue Stats", 14, yPos);
    yPos += 10;

    const revenueRows = [
      [
        "This Month",
        sampleBookings.reduce((sum, b) => sum + Number(b.pricePerDay), 0),
      ],
      // Add more periods if needed
    ];

    revenueRows.forEach((row) => {
      doc.setFontSize(12);
      doc.text(`${row[0]}: ₱ ${row[1]}`, 14, yPos);
      yPos += 8;
    });

    yPos += 5;

    // --- BOOKINGS TABLE ---
    const tableColumn = [
      "Booking ID",
      "Item",
      "Price",
      "Renter",
      "Booked Date",
      "Payment",
      "Status",
    ];
    const tableRows = sampleBookings.map((b) => [
      b.id,
      b.item,
      `₱ ${b.pricePerDay}`,
      b.renter,
      b.bookedDate,
      b.paymentMethod,
      b.status,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("dashboard-data.pdf");
  };

  return (
    <div className="pl-60 flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main ref={dashboardRef} className="collection-scale flex-1 py-6">
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-5">
          {/* Search */}
          <div className="flex items-center bg-white text-purple-900 px-4 py-2 rounded-xl shadow-sm border max-w-sm w-full">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              placeholder="Search"
              className="ml-2 w-full bg-transparent focus:outline-none text-sm text-gray-700"
            />
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-5">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="flex items-center gap-2">
              <img
                src={profPic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold  text-gray-900 ">Genlord</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="borde-gray-200 mb-5"></hr>

        {/* TITLE + DOWNLOAD */}
        <div className="flex justify-between items-center mb-4">
          <AnimatedWelcome />

          <div className="relative inline-block text-left">
            <button
              ref={downloadButtonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-[#7A1CA9] text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <Download className="w-4 h-4" />
              Download
              <ChevronDown className="w-4 h-4" />
            </button>

            <DropdownPortal open={dropdownOpen} buttonRef={downloadButtonRef}>
              <button
                onClick={exportToCSV}
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Download as CSV
              </button>
              <button
                onClick={exportDashboardToPDF}
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Download as PDF
              </button>
            </DropdownPortal>
          </div>
        </div>

        {/* STATS */}
        <Stats stats={stats} />

        {/* REVENUE + SCHEDULE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <RevenueStats
            revenuePeriod={revenuePeriod}
            setRevenuePeriod={setRevenuePeriod}
          />

          <Booking sampleBookings={sampleBookings} />
        </div>

        {/* BOOKINGS TABLE */}
        <BookingTable
          sampleBookings={sampleBookings}
          getRenterAvatar={getRenterAvatar}
          itemImages={itemImages}
          paymentIcons={paymentIcons}
          ActionsDropdown={ActionsDropdown}
        />
      </main>
    </div>
  );
}
