import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import GoogleStyleCalendar from "../../components/calendar/GoogleStyleCalendar";

export default function Booking({ sampleBookings }) {
  // SAFETY: Ensure bookings is always a valid array
  const bookings = Array.isArray(sampleBookings) ? sampleBookings : [];

  // Extract unique items safely
  const uniqueItems = useMemo(() => {
    const map = {};

    bookings.forEach((b) => {
      const key = b?.itemKey;
      if (!key) return;

      if (!map[key]) {
        map[key] = {
          item: b?.item || "Unknown Item",
          itemKey: key,
        };
      }
    });

    return Object.values(map);
  }, [bookings]);

  const [selectedItemKey, setSelectedItemKey] = useState("all");

  // Filter current bookings safely
  const currentBookings =
    selectedItemKey === "all"
      ? bookings
      : bookings.filter((b) => b?.itemKey === selectedItemKey);

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

      {/* Calendar or Empty State */}
      {currentBookings.length > 0 ? (
        <GoogleStyleCalendar bookings={currentBookings} />
      ) : (
        <div className="text-center py-6 text-sm text-gray-500 bg-gray-50 rounded-lg">
          No bookings yet for this item.
        </div>
      )}
    </div>
  );
}
