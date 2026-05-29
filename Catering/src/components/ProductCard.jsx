import Badge from "./Badge";

export default function ProductCard({ item }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-3xl">
          {item.emoji}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
      </div>
      <p className="mb-5 text-sm leading-6 text-gray-500">{item.description}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{item.price}</p>
          <p className="text-sm text-gray-500">{item.serving}</p>
        </div>
        <Badge label={item.status} status={item.status} />
      </div>
    </div>
  );
}
