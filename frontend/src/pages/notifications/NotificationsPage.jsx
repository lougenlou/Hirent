import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Info, AlertCircle, Dot, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead: markNotificationAsRead,
    fetchNotifications,
  } = useNotifications();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Hirent — Notifications";
    fetchNotifications(); // Re-fetch notifications when the page is loaded
    return () => {
      document.title = "Hirent";
    };
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification._id);
    }
    // If the notification is related to a booking, navigate to the My Rentals page
    if (notification.type.startsWith('booking_')) {
      navigate('/my-rentals');
    }
  };


  // Render notification icon
  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "alert":
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  // Apply filter
  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  return (
    <div className="min-h-screen pt-10 px-8 md:px-20 lg:px-40 pb-20" style={{ background: "#fbfbfb" }}>
      {/* HEADER */}
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="p-1 mb-2 flex items-start gap-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
            <Bell className="w-10 h-10 text-[#a12fda]" />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] mt-1 font-bold text-purple-900">Notifications</h1>
            <p className="text-gray-500 text-[15px]">
              See new messages, mentions, and activity notifications.
            </p>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {["all", "booking", "payment", "alert", "system"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-lg text-[13px] transition ${
              filter === cat
                ? "bg-[#7A1CA9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
            }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 text-sm">Loading notifications...</p>
      )}


      {/* NOTIFICATION LIST */}
      {!loading && (
        <div className="space-y-5">
          {filteredNotifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
              className={`w-full px-5 py-4 rounded-2xl bg-white shadow-md cursor-pointer transform transition hover:scale-[1.01] ${!notif.isRead ? "border-l-4 border-[#7A1CA9]" : "opacity-90"}`}
            >
              <div className="flex items-start gap-4">
                {renderIcon(notif.type)}

                <div className="flex-1">
                  <p className={`text-[15px] ${!notif.isRead ? "font-semibold" : "font-normal"}`}>
                    {notif.message}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                </div>

                {!notif.isRead && <Dot className="text-[#7A1CA9] w-6 h-6 mt-1" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredNotifications.length === 0 && (
        <div className="text-center text-gray-500 py-10 text-sm">No notifications found.</div>
      )}
    </div>
  );
};

export default NotificationsPage;
