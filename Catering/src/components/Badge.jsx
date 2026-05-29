const statusStyles = {
  Available: "bg-[#FFF0E6] text-[#E76F51]",
  Cooking: "bg-[#FFE3D6] text-[#D1593B]",
  Delivered: "bg-[#FFE7DC] text-[#BD4A2D]",
  Cancelled: "bg-[#F2B8A0] text-[#A63F2C]",
  default: "bg-[#FFEAD8] text-[#2D2D2D]",
};

export default function Badge({ label, status, className = "" }) {
  const style = statusStyles[status] ?? statusStyles.default;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${style} ${className}`}>
      {label ?? status}
    </span>
  );
}
