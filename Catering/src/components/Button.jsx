export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  const variantClasses = {
    primary: "bg-[#E76F51] text-white hover:bg-[#cf5f49]",
    secondary: "bg-[#F4A261] text-[#2D2D2D] hover:bg-[#e69a54]",
    success: "bg-[#E76F51] text-white hover:bg-[#cf5f49]",
    danger: "bg-[#c93f31] text-white hover:bg-[#a33a2d]",
    warning: "bg-[#F4A261] text-[#2D2D2D] hover:bg-[#e69a54]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-[2rem] font-semibold transition duration-300 ${variantClasses[variant] ?? variantClasses.primary} ${sizeClasses[size] ?? sizeClasses.md} ${disabled ? "cursor-not-allowed opacity-60" : "hover:-translate-y-0.5"} ${className}`}
    >
      {children}
    </button>
  );
}
