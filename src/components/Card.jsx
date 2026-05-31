export default function Card({ title, subtitle, icon, children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_20px_40px_rgba(231,111,81,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(231,111,81,0.15)] ${className}`}>
      <div className="mb-5 flex items-center gap-4">
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F4A261]/15 text-[#E76F51]">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="text-lg font-semibold text-[#2D2D2D]">{title}</h3>
          {subtitle ? <p className="text-sm text-[#7D5A50]">{subtitle}</p> : null}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
