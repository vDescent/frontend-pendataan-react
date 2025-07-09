import { useState } from "react";

export default function StaffForm({ initialData, onSubmit, buttonText = "Simpan" }) {
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
      await onSubmit(formData); // Gunakan fungsi dari luar
      setStatus("✅ Data berhasil diproses!");
      setFormData(initialData); // Reset jika add
    } catch (err) {
      console.error(err);
      setStatus(
        "❌ Gagal memproses data: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key) => {
    const labelMap = {
      fullName: "Nama Lengkap",
      nim: "NIM",
      binusianId: "Binusian ID",
      gender: "Jenis Kelamin",
      email: "Email",
      phoneNumber: "No. HP",
      activeSemester: "Semester Aktif",
      binusianStatus: "Status Binusian",
      nik: "NIK",
      dateOfBirth: "Tanggal Lahir",
      address: "Alamat",
      npwp: "NPWP",
      bankAccountNumber: "No. Rekening",
      bankBranch: "Cabang Bank",
      accountHolderName: "Nama Pemilik Rekening",
      parentGuardianName: "Nama Orang Tua/Wali",
      parentGuardianPhone: "No. HP Orang Tua/Wali",
      emergencyContact: "Kontak Darurat",
      emergencyRelation: "Hubungan Darurat",
      startDate: "Tanggal Mulai",
      endDate: "Tanggal Selesai"
    };
    return labelMap[key] || key;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {Object.entries(initialData).map(([key, val]) => (
        <div key={key}>
          <label className="block font-semibold mb-1">
            {formatLabel(key)}
          </label>
          {key === "gender" ? (
            <select
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Male">Laki-laki</option>
              <option value="Female">Perempuan</option>
            </select>
          ) : (
            <input
              type={
                key.toLowerCase().includes("date")
                  ? "date"
                  : typeof val === "number"
                  ? "number"
                  : "text"
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}
        </div>
      ))}

      <div className="col-span-full mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : buttonText}
        </button>
      </div>

      {status && (
        <p className="col-span-full mt-4 text-center font-semibold">
          {status}
        </p>
      )}
    </form>
  );
}
