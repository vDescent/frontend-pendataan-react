export default function RadioGroup({ label, name, options, selected, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <div className="flex items-center gap-6">
        {options.map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected === opt}
              onChange={onChange}
              className="mr-1"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
