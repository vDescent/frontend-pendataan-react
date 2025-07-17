export default function DateInput({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-lg mb-1 font-light">{label}</label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 bg-[#D8D8D8] text-[#6c6c7d] rounded px-3 py-1"
      />
    </div>
  );
}
