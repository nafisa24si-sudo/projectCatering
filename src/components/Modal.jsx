import Button from "./Button";

export default function Modal({ title, description, actionLabel = "Tutup", onAction, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_20px_50px_rgba(231,111,81,0.12)] ${className}`}>
      <h3 className="text-xl font-bold text-[#2D2D2D]">{title}</h3>
      <p className="mt-3 text-sm text-[#7D5A50]">{description}</p>
      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
