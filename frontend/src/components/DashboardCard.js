export default function DashboardCard({ icon, label, value, color }) {
  return (
    <div className="bg-white flex items-center gap-3 p-4 rounded shadow hover:shadow-md transition">
      <div className={`p-2 rounded-full ${color}`}>
        <img src={icon} alt={label} className="w-6 h-6" />
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}
