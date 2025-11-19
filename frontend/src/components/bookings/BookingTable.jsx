import { HiOutlineCalendar } from "react-icons/hi";

const statusMap = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-100 text-gray-500",
};

export default function BookingTable({ bookings, onViewDetails }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-white text-xs font-bold text-gray-600">
            <th className="px-7 py-4 text-left">Item</th>
            <th className="px-7 py-4 text-left">Renter</th>
            <th className="px-7 py-4 text-left">Price</th>
            <th className="px-7 py-4 text-left">Booked Dates</th>
            <th className="px-7 py-4 text-left">Status</th>
            <th className="px-7 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className={`border-t last:border-b hover:bg-purple-50 transition group ${
                booking.status === "Completed" ? "bg-gray-50" : ""
              }`}
            >
              <td className="px-7 py-4 flex gap-3 items-center">
                <img 
                  src={booking.itemImage} 
                  alt={booking.item} 
                  className="w-10 h-10 object-cover rounded shadow bg-gray-100"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40?text=Item";
                  }}
                />
                <div>
                  <div className="font-bold text-sm text-gray-900">{booking.item}</div>
                  <div className="text-xs text-gray-400">{booking.category}</div>
                </div>
              </td>
              <td className="px-7 py-4">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                    {booking.renter.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{booking.renter.name}</div>
                    <div className="text-xs text-gray-400">{booking.renter.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-7 py-4 min-w-[110px]">
                <div className="font-bold text-purple-700">{booking.price}</div>
                {booking.discount && <div className="text-xs text-green-500">{booking.discount}</div>}
              </td>
              <td className="px-7 py-4 text-xs font-medium text-gray-800">
                <div className="flex gap-2 items-center">
                  <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
                  {formatDate(booking.bookedDates)} - {formatDate(booking.bookedDateEnd)}
                </div>
              </td>
              <td className="px-7 py-4">
                <span className={`px-4 py-2 rounded-lg font-bold text-xs ${statusMap[booking.status]}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-7 py-4 text-right">
                <button 
                  className="px-3 py-1 text-sm font-semibold text-purple-700 hover:bg-purple-100 border border-purple-300 rounded transition"
                  onClick={() => onViewDetails(booking)}
                  aria-label={`View details for ${booking.item}`}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
