import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  emergencyRelation: "",
  startDate: "",
  endDate: ""
};

export default function EditData() {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`http://localhost:5077/api/staff/${id}`);
        const data = res.data;

        // Format tanggal ke yyyy-MM-dd jika tidak null
        const formatDate = (date) => date ? date.substring(0, 10) : "";

        setFormData({
          ...data,
          dateOfBirth: formatDate(data.dateOfBirth),
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        });
      } catch (err) {
        setStatus("❌ Gagal memuat data staff.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await axios.put(`http://localhost:5077/api/staff/edit/${id}`, formData);
      setStatus("✅ Data berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setStatus(
        "❌ Gagal memperbarui data: " +
          (err.response?.data?.message || err.message)
      );
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

  if (loading) return <p className="text-center">🔄 Memuat data...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Data Staff</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.entries(formData).map(([key, val]) => (
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
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            )}
          </div>
        ))}

        <div className="col-span-full mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>

      {status && (
        <p className="mt-6 text-lg font-semibold text-center">{status}</p>
      )}
    </div>
  );
}
