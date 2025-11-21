import { 
  MdEventNote, 
  MdCalendarToday, 
  MdPendingActions 
} from "react-icons/md";

export default function BookingStatsBar({ stats }) {
  const icons = [
    <MdEventNote className="w-5 h-5 text-white" />,
    <MdCalendarToday className="w-5 h-5 text-white" />,
    <MdPendingActions className="w-5 h-5 text-white" />
  ];

  return (
    <div className="flex gap-6 w-full">
      {stats.map((card, idx) => (
        <div
          key={card.label}
          className="
            bg-white
            rounded-xl
            border border-gray-200
            shadow-sm
            px-6 py-5
            min-w-[260px]
            flex flex-col
            justify-between
          "
        >
          {/* Header Row */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {card.label}
            </span>

            {/* Icon Badge */}
            <span className="
              bg-purple-600 
              p-1.5
              rounded-lg
              flex items-center justify-center
            ">
              {icons[idx]}
            </span>
          </div>

          {/* Value */}
          <div className={`text-2xl font-bold ${card.valueColor}`}>
            {card.value}
          </div>

          {/* Subtext */}
          <div className={`text-xs mt-1 ${card.subColor}`}>
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
