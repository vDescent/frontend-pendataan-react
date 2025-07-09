import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DisplayData() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`http://localhost:5077/api/staff/${id}`);
        setStaff(res.data);
      } catch (err) {
        setError("Gagal mengambil data staff");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

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
      endDate: "Tanggal Selesai",
      isActive: "Status Aktif"
    };
    return labelMap[key] || key;
  };

  if (loading) return <p className="text-center">🔄 Memuat data...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!staff) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Detail Staff</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(staff).map(([key, val]) => (
          <div key={key}>
            <label className="block font-semibold mb-1">
              {formatLabel(key)}
            </label>
            <input
              type="text"
              readOnly
              value={
                typeof val === "boolean"
                  ? val ? "Aktif" : "Tidak Aktif"
                  : val || "-"
              }
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
