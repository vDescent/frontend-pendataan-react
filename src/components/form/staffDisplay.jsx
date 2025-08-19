import labelMap from "../common/labelMap";

export default function StaffDisplay({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(data).map(([key, val]) => (
        <div key={key}>
          <label className="block font-semibold mb-1">{labelMap[key] || key}</label>
          <input
            type="text"
            readOnly
            value={
              typeof val === "boolean" ? val ? "Aktif" : "Tidak Aktif" : val || "-"}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
      ))}
    </div>
  );
}
