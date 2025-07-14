export default function EditStaffForm({
  formData,
  onChange,
  onSubmit,
  status,
  loading,
}) {
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
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {Object.entries(formData).map(([key, val]) => (
        <div key={key}>
          <label className="block font-semibold mb-1">
            {labelMap[key] || key}
          </label>
          {key === "gender" ? (
            <select
              name={key}
              value={formData[key]}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}
        </div>
      ))}

      <div className="col-span-full mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
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
