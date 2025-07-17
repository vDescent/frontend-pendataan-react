export default function RadioGroup({ label, name, options, selected, onChange, direction = "row" }) {
  const isColumn = direction === "column";

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-2">{label}</label>
      <div className={`flex ${isColumn ? "flex-col gap-3" : "flex-row items-center gap-6"}`}>
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected === opt}
              onChange={onChange}
              className="hidden"
            />
            <div
              className={`w-7 h-7 rounded-full border-3 flex items-center justify-center
                ${selected === opt ? "border-[#9C94E8]" : "border-[#d8d8d8]"}
              `}
            >
              {selected === opt && <div className="w-4 h-4 bg-[#9C94E8] rounded-full" />}
            </div>
            <span className="text-white-800">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
