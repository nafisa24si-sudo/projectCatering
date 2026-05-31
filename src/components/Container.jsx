export default function Container({ title, subtitle, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-gray-500 sm:max-w-xl">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
