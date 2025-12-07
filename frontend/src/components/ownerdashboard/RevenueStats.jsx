// src/components/ownerdashboard/RevenueStats.jsx
import React from "react";
import RevenueChart from "../charts/RevenueChart";
import { revenueData } from "../../data/revenueData";

export default function RevenueStats({ revenuePeriod, setRevenuePeriod }) {
  return (
    <div className="lg:col-span-2 bg-white text-purple-900 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Statistics
        </h2>
        <select
          className="border text-sm px-3 py-1.5 rounded-lg text-gray-600"
          value={revenuePeriod}
          onChange={(e) => setRevenuePeriod(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Revenue chart */}
      <div className="h-96 bg-purple-50 rounded-lg p-2">
        <RevenueChart data={revenueData[revenuePeriod]} />
      </div>
    </div>
  );
}
