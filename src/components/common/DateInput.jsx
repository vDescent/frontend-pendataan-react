export default function DateInput({ label, name, value, onChange, readOnly = false }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-lg mb-1 font-light">{label}</label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
        className={`border border-gray-300 rounded px-3 py-1 
          ${readOnly ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#D8D8D8] text-[#6c6c7d]"}`}
      />
    </div>
  );
}
