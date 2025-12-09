import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Info, AlertCircle, Dot, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { makeAPICall, ENDPOINTS } from "../../config/api";

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Set document title
  useEffect(() => {
    document.title = "Hirent — Notifications";
    return () => {
      document.title = "Hirent";
    };
  }, []);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await makeAPICall(ENDPOINTS.NOTIFICATIONS.GET_ALL);
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Failed fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark single notification as read and optionally navigate
  const markAsRead = async (id, redirect) => {
    try {
      await makeAPICall(ENDPOINTS.NOTIFICATIONS.READ(id), { method: "POST" });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );

      if (redirect) navigate(redirect);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await makeAPICall(ENDPOINTS.NOTIFICATIONS.READ_ALL, { method: "POST" });
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      await makeAPICall(ENDPOINTS.NOTIFICATIONS.CLEAR_ALL, { method: "POST" });
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
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

        <div className="flex gap-2">
          {notifications.some((n) => n.unread) && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-1.5 rounded-full text-sm bg-purple-50 text-[#8417bb] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20 transition"
            >
              Mark All Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-1.5 rounded-full text-sm text-red-500 hover:text-red-700 text-[13px] font-medium border border-red-300 bg-red-50 flex items-center gap-1 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
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

      {/* ERROR */}
      {error && <p className="text-center text-red-500 text-sm">{error}</p>}

      {/* NOTIFICATION LIST */}
      {!loading && !error && (
        <div className="space-y-5">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id, notif.redirect)}
              className={`w-full px-5 py-4 rounded-2xl bg-white shadow-md cursor-pointer transform transition hover:scale-[1.01] ${
                notif.unread ? "border-l-4 border-[#7A1CA9]" : "opacity-90"
              }`}
            >
              <div className="flex items-start gap-4">
                {renderIcon(notif.type)}

                <div className="flex-1">
                  <p className={`text-[15px] ${notif.unread ? "font-semibold" : "font-normal"}`}>
                    {notif.message}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                </div>

                {notif.unread && <Dot className="text-[#7A1CA9] w-6 h-6 mt-1" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredNotifications.length === 0 && (
        <div className="text-center text-gray-500 py-10 text-sm">No notifications found.</div>
      )}
    </div>
  );
};

export default NotificationsPage;
