const statusClasses = {
  Online: "bg-emerald-500",
  Away: "bg-yellow-400",
  Offline: "bg-gray-400",
};

export default function Avatar({ name, image, status = "Available", className = "" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`flex items-center gap-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}>
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-14 w-14 rounded-3xl object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-green-50 text-xl font-bold text-hijau">
            {initials}
          </div>
        )}
        <span className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white ${statusClasses[status] ?? statusClasses.Offline}`} />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{status}</p>
      </div>
    </div>
  );
}
