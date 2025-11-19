import { MdEventNote, MdCalendarToday, MdPendingActions, MdAttachMoney } from "react-icons/md";

export default function BookingStatsBar({ stats }) {
  const icons = [
    <MdEventNote className="w-6 h-6 text-white" />,
    <MdCalendarToday className="w-6 h-6 text-white" />,
    <MdPendingActions className="w-6 h-6 text-white" />,
    <MdAttachMoney className="w-6 h-6 text-white" />
  ];

  return (
    <div className="mb-8 flex gap-5 items-start w-full">
      {stats.map((card, idx) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-6 flex-1 flex flex-col justify-center min-w-[220px]"
        >
          <div className="flex justify-between mb-1 items-center">
            <span className="text-xs font-bold text-gray-500 uppercase">{card.label}</span>
            <span className={`rounded-lg p-2 ${card.iconColor} flex items-center justify-center`}>
              {icons[idx]}
            </span>
          </div>
          <div className={`font-bold text-2xl ${card.valueColor}`}>{card.value}</div>
          <div className={`text-xs mt-1 ${card.subColor}`}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
