export default function TextInput({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-light mb-1 text-lg">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter Your Answer"
        className="border border-gray-300 bg-[#D8D8D8] text-black rounded px-3 py-1 placeholder:"
      />
    </div>
  );
}
