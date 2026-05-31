export default function Dropdown({ label, options = [], className = "" }) {
  return (
    <label className={`block text-sm font-medium text-[#2D2D2D] ${className}`}>
      {label}
      <select className="mt-2 w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none transition duration-200 focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
