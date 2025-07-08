import { useState } from "react";
import axios from "axios";

const initialData = {
  fullName: "",
  nim: "",
  binusianId: "",
  gender: "Male",
  email: "",
  phoneNumber: "",
  activeSemester: 1,
  binusianStatus: "",
  nik: "",
  dateOfBirth: "",
  address: "",
  npwp: "",
  bankAccountNumber: "",
  bankBranch: "",
  accountHolderName: "",
  parentGuardianName: "",
  parentGuardianPhone: "",
  emergencyContact: "",
  emergencyRelation: ""
};

export default function AddData() {
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5077/api/staff/add", formData);
      setStatus("✅ Data berhasil ditambahkan");
      setFormData(initialData); // reset
    } catch (err) {
      console.error(err);
      setStatus("❌ Gagal menambahkan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Data Staff</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(initialData).map(([key, val]) => (
          <div key={key}>
            <label className="block font-semibold mb-1 capitalize">{key}</label>
            {key === "gender" ? (
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <input
                type={key.toLowerCase().includes("date") ? "date" : typeof val === "number" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            )}
          </div>
        ))}
        <div className="col-span-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
