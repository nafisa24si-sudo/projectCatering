export default function ProgressBar({ label, value = 0, max = 100, className = "" }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-hijau transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
