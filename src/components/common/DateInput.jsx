export default function DateInput({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium mb-1">{label}</label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 bg-white text-black rounded px-3 py-2"
      />
    </div>
  );
}
