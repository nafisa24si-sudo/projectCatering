export default function NotificationCard({ title, message, date, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-[#F4A261]/30 bg-white p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#2D2D2D]">{title}</p>
          <p className="mt-1 text-sm text-[#7D5A50]">{message}</p>
        </div>
        <span className="rounded-full bg-[#FFE3D6] px-3 py-1 text-xs font-semibold text-[#E76F51]">{date}</span>
      </div>
    </div>
  );
}
