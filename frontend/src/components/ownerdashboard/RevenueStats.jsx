import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChart({ data }) {
  const gradientId = "revenueGradient";

  // Ensure chart has at least one dummy data point to maintain size
  const chartData =
    Array.isArray(data) && data.length > 0
      ? data
      : [{ period: "", revenue: 0, growth: 0 }];

  return (
    <div className="w-full h-64 bg-white rounded-xl shadow-sm p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B819EE" stopOpacity={1} />
              <stop offset="100%" stopColor="#6E149A" stopOpacity={1} />
            </linearGradient>

            <marker
              id="arrow"
              markerWidth={10}
              markerHeight={10}
              refX={5}
              refY={5}
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,10 L10,5 z" fill="#FFB800" />
            </marker>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="period"
            tick={{ fontSize: 13, fill: "#4B5563", fontWeight: 500 }}
          />

          <YAxis
            tick={{ fontSize: 13, fill: "#4B5563" }}
            domain={[0, "dataMax + 5000"]}
          />

          <YAxis
            yAxisId="growth"
            orientation="right"
            tick={{ fontSize: 12, fill: "#FFB800" }}
            domain={["auto", "auto"]}
          />

          <Tooltip
            wrapperStyle={{ fontSize: 13 }}
            cursor={{ fill: "rgba(122, 28, 169, 0.1)" }}
          />

          <Bar
            dataKey="revenue"
            fill={`url(#${gradientId})`}
            radius={[10, 10, 0, 0]}
          />

          <Line
            type="linear"
            dataKey="growth"
            stroke="#FFB800"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            markerEnd="url(#arrow)"
            yAxisId="growth"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
