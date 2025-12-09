import React, { useState, useEffect } from "react";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CalendarRange,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Item image map
const imageMap = {
  "Gucci Duffle Bag": "/assets/items/gucci_duffle_bag.png",
  "Gaming Headset": "/assets/items/havit_hv.png",
  "IPS Monitor": "/assets/items/IPS_lcd.png",
  Keyboard: "/assets/items/Keyboard.png",
  Laptop: "/assets/items/laptop.png",
  "RGB Liquid CPU Cooler": "/assets/items/RGB_liquid_CPU.png",
};

const fallbackIcon = () => (
  <Wallet className="w-10 h-10 text-purple-700 opacity-60" />
);

const donutColors = ["#7A1CA9", "#A855F7", "#C4B5FD", "#DDD6FE"];
const block = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5";

const EarningsTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value || 0;
  return (
    <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 px-3 py-2 text-xs">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p className="text-[#7A1CA9] font-bold">₱{value.toLocaleString()}</p>
    </div>
  );
};

const ActivityTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const views = payload.find((p) => p.dataKey === "views")?.value || 0;
  const messages = payload.find((p) => p.dataKey === "messages")?.value || 0;
  const bookings = payload.find((p) => p.dataKey === "bookings")?.value || 0;

  return (
    <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 px-3 py-2 text-xs">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p className="text-purple-600">Views: {views}</p>
      <p className="text-blue-600">Messages: {messages}</p>
      <p className="text-green-600 font-semibold">Bookings: {bookings}</p>
    </div>
  );
};

export default function OwnerEarnings() {
  const [loading, setLoading] = useState(true);

  // Initialize with default values to prevent null errors
  const [summary, setSummary] = useState({
    monthEarnings: 0,
    lastMonth: 0,
    totalEarnings: 0,
    avgBookingValue: 0,
    completedBookings: 0,
  });

  const [wallet, setWallet] = useState({
    total: 0,
    available: 0,
    pending: 0,
    nextPayout: "-",
    payoutMethod: "-",
  });

  const [fullChartData, setFullChartData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [recent, setRecent] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [lowItems, setLowItems] = useState([]);

  const [timeframe, setTimeframe] = useState("12M");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const data = await makeAPICall(
          ENDPOINTS.EARNINGS?.GET_ALL || "/earnings"
        );
        if (data) {
          setWallet(data.wallet || wallet);
          setSummary(data.summary || summary);
          setFullChartData(data.chartData || []);
          setChartData(data.chartData || []);
          setCategories(data.categories || []);
          setWeeklyActivity(data.weeklyActivity || []);
          setRecent(data.recent || []);
          setTopItems(data.topItems || []);
          setLowItems(data.lowItems || []);
        }
      } catch (err) {
        console.error("Error fetching earnings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  useEffect(() => {
    if (fullChartData.length === 0) return;

    let filteredData = [];
    switch (timeframe) {
      case "3M":
        filteredData = fullChartData.slice(-3);
        break;
      case "6M":
        filteredData = fullChartData.slice(-6);
        break;
      case "12M":
      default:
        filteredData = fullChartData;
    }
    setChartData(filteredData);
  }, [timeframe, fullChartData]);

  if (loading)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <OwnerSidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <p className="text-gray-600">Loading earnings data...</p>
        </div>
      </div>
    );

  const growth =
    summary.lastMonth > 0
      ? ((summary.monthEarnings - summary.lastMonth) / summary.lastMonth) * 100
      : 0;

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) return;
    console.log("Withdraw:", withdrawAmount);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />

      <div className="flex-1 p-8 ml-60">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Earnings</h1>
            <p className="text-gray-500">
              Track your revenue, performance, and financial insights
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7A1CA9] text-white rounded-xl text-sm font-medium hover:bg-[#6a1894] transition shadow-md">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Wallet Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Balance */}
          <div className={block}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wallet className="w-8 h-8 text-[#7A1CA9]" />
              </div>
              <span className="text-sm ml-3 font-medium text-[#7A1CA9]">
                Total
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              ₱{wallet.total.toLocaleString()}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Total Balance</p>
          </div>

          {/* Available */}
          <div className={block}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <PiggyBank className="w-8 h-8 text-green-600" />
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="text-sm  text-green-600 font-medium hover:underline"
              >
                Withdraw
              </button>
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              ₱{wallet.available.toLocaleString()}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Available to Withdraw</p>
          </div>

          {/* Pending */}
          <div className={block}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CalendarRange className="w-8 h-8 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-600">
                Processing
              </span>
            </div>
            <h2 className="text-2xl font-bold text-orange-600">
              ₱{wallet.pending.toLocaleString()}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Pending Earnings</p>
          </div>

          {/* This Month */}
          <div className={block}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              {growth >= 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              ₱{summary.monthEarnings.toLocaleString()}
            </h2>
            <p
              className={`text-xs mt-1 font-medium ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}% from last month
            </p>
          </div>
        </div>

        {/* Payout Info Banner */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#7A1CA9]" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Next payout on {wallet.nextPayout}
              </p>
              <p className="text-xs text-gray-600">{wallet.payoutMethod}</p>
            </div>
          </div>
          <button className="text-sm text-[#7A1CA9] font-medium hover:underline">
            Update Method
          </button>
        </div>

        {/* Earnings Trend Chart */}
        <div className={`${block} mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Earnings Trend
            </h2>
            <div className="flex gap-2">
              {["3M", "6M", "12M"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    timeframe === tf
                      ? "bg-[#7A1CA9] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7A1CA9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7A1CA9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip content={<EarningsTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#7A1CA9"
                  strokeWidth={3}
                  fill="url(#lineGradient)"
                  dot={{ fill: "#7A1CA9", r: 5 }}
                  activeDot={{ r: 7, fill: "#A855F7" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className={block}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#7A1CA9]" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Lifetime Earnings
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              ₱{summary.totalEarnings.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              From {summary.completedBookings} completed bookings
            </p>
          </div>

          <div className={block}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-green-100 rounded-lg">
                <PiggyBank className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Avg Booking Value
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              ₱{summary.avgBookingValue.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Per rental transaction</p>
          </div>

          <div className={block}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Monthly Growth
              </span>
            </div>
            <h3
              className={`text-3xl font-bold ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}%
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Compared to previous month
            </p>
          </div>
        </div>

        {/* Category Breakdown & Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Pie Chart */}
          <div className={block}>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Revenue by Category
            </h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="percent"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} ${percent}%`}
                    labelLine={{ stroke: "#7A1CA9", strokeWidth: 1 }}
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={donutColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || !payload[0]) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 px-3 py-2 text-xs">
                          <p className="font-semibold text-gray-800">
                            {data.name}
                          </p>
                          <p className="text-[#7A1CA9] font-bold">
                            ₱{data.value.toLocaleString()}
                          </p>
                          <p className="text-gray-600">{data.percent}%</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Activity Bar Chart */}
          <div className={block}>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="day"
                  stroke="#9CA3AF"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip content={<ActivityTooltip />} />
                <Bar dataKey="views" fill="#7A1CA9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="messages" fill="#A855F7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="bookings" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7A1CA9]"></div>
                <span className="text-xs text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#A855F7]"></div>
                <span className="text-xs text-gray-600">Messages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                <span className="text-xs text-gray-600">Bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Item Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Performers */}
          <div className={block}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Performing Items
            </h2>
            <div className="space-y-3">
              {topItems.map((item, i) => {
                const img = imageMap[item.item];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        {img ? (
                          <img
                            src={img}
                            alt={item.item}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          fallbackIcon()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.item}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      ₱{item.amount.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Low Performers */}
          <div className={block}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Needs Attention
            </h2>
            <div className="space-y-3">
              {lowItems.map((item, i) => {
                const img = imageMap[item.item];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        {img ? (
                          <img
                            src={img}
                            alt={item.item}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          fallbackIcon()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.item}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-orange-600">
                      ₱{item.amount.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Earnings Table */}
        <div className={block}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Earnings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="text-left">
                  <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                    Item
                  </th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 uppercase text-right">
                    Net Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                          {imageMap[txn.item] ? (
                            <img
                              src={imageMap[txn.item]}
                              alt={txn.item}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <Wallet className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {txn.item}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{txn.date}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm font-semibold text-gray-800">
                        ₱{txn.net.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-modalSlideIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <PiggyBank className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Withdraw Funds
                </h3>
                <p className="text-sm text-gray-500">
                  Transfer to your account
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <p className="text-sm text-gray-600 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-green-600">
                ₱{wallet.available.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Payout to: {wallet.payoutMethod}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setWithdrawAmount("");
                }}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 py-2.5 bg-[#7A1CA9] text-white rounded-xl font-medium hover:bg-[#6a1894] transition"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Animation */}
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
