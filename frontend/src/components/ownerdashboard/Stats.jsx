// src/components/ownerdashboard/Stats.jsx
import React from "react";

export default function Stats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white text-purple-900 rounded-xl p-4 shadow-sm relative"
        >
          {/* Icon box */}
          {stat.icon && (
            <div className="absolute top-4 right-4 rounded-lg flex items-center justify-center">
              <img
                src={stat.icon}
                alt={`${stat.label} icon`}
                className="w-10 h-10"
              />
            </div>
          )}

          <p className="text-[14px] text-gray-700 mb-2">{stat.label}</p>
          <p className="text-[26px] font-semibold text-gray-800 mt-1">{stat.value}</p>

          {stat.sublabel && (
            <p className={`text-[14px] ${stat.sublabelColor}`}>{stat.sublabel}</p>
          )}

          {/* Full-width horizontal line right below sublabel */}
          {stat.sublabel && <hr className="border-gray-200 mt-2 my-2 -mx-4" />}

          <p className="text-xs text-gray-400">{stat.date}</p>
        </div>
      ))}
    </div>
  );
}
