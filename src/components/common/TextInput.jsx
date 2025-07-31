export default function TextInput({ label, name, value, onChange, readOnly=false, error }) {
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
        readOnly={readOnly}
        className={`w-full p-2 rounded bg-white text-black ${readOnly ? "bg-gray-200 cursor-not-allowed" : ""} ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
