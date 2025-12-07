import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import GoogleStyleCalendar from "../../components/calendar/GoogleStyleCalendar";

export default function Booking({ sampleBookings }) {
  
  const uniqueItems = useMemo(() => {
    const map = {};
    sampleBookings.forEach((b) => {
      if (!map[b.itemKey]) {
        map[b.itemKey] = {
          item: b.item,
          itemKey: b.itemKey,
        };
      }
    });
    return Object.values(map);
  }, [sampleBookings]);

  
  const [selectedItemKey, setSelectedItemKey] = useState("all");

  
  const currentBookings =
    selectedItemKey === "all"
      ? sampleBookings
      : sampleBookings.filter((b) => b.itemKey === selectedItemKey);

  return (
    <div className="bg-white text-gray-900 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Booking Schedule
        </h2>
      </div>

      {/* Item Selector */}
      <div className="mb-1">
        <label className="text-sm text-gray-600 mr-2">Select Item:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedItemKey}
          onChange={(e) => setSelectedItemKey(e.target.value)}
        >
          <option value="all">All Items</option>
          {uniqueItems.map((item) => (
            <option key={item.itemKey} value={item.itemKey}>
              {item.item}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      {currentBookings.length > 0 ? (
        <GoogleStyleCalendar bookings={currentBookings} />
      ) : (
        <p className="text-sm text-gray-500">No booking found.</p>
      )}
    </div>
  );
}
