import { useState } from "react";

export default function StaffForm({ initialData, onSubmit, buttonText = "Add Data" }) {
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
      await onSubmit(formData);
      setStatus("✅ Data berhasil ditambahkan!");
      setFormData(initialData);
    } catch (err) {
      console.error(err);
      setStatus("❌ Gagal menambahkan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ label, name, type = "text" }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border border-gray-300 bg-white text-black rounded px-3 py-2"
      />
    </div>
  );

  return (
    <>
    <p>Hello world</p>
    <form onSubmit={handleSubmit} className="bg-[#1e1e2f] text-white p-6 rounded-lg">
      {/* General Data */}
      <h2 className="text-lg font-semibold mb-4">General Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="1. Full Name" name="fullName" />
        <Input label="2. Birth Date" name="dateOfBirth" type="date" />
        <div className="flex flex-col">
          <label className="font-medium mb-1">3. Gender</label>
          <div className="flex items-center gap-6">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-1"
                />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-1"
                />
              Female
            </label>
          </div>
        </div>
        <Input label="4. Phone Number (WhatsApp)" name="phoneNumber" />
      </div>

      {/* BINUSIAN Data */}
      <h2 className="text-lg font-semibold mb-4">BINUSIAN Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="5. Nomor Induk Mahasiswa (NIM)" name="nim" />
        <Input label="6. BINUSIAN ID" name="binusianId" />
        <Input label="7. Email Address" name="email" />
        <Input label="8. Active Semester" name="activeSemester" type="number" />
        <div className="flex flex-col">
          <label className="font-medium mb-1">9. BINUSIAN Status</label>
          <select
            name="binusianStatus"
            value={formData.binusianStatus}
            onChange={handleChange}
            className="border border-gray-300 text-black rounded px-3 py-2"
            >
            <option value="">Pilih Status</option>
            <option value="AM">Associate Member (AM)</option>
            <option value="AM/Junior">Associate Member (AM) / Junior Staff</option>
            <option value="Non-AM">Non Associate Member (Non-AM)</option>
          </select>
        </div>
        <Input label="10. Start Date" name="startDate" type="date" />
        <Input label="11. Start Date" name="endDate" type="date" />
      </div>

      {/* Legal / Citizen Data */}
      <h2 className="text-lg font-semibold mb-4">Legal / Citizen Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="12. Nomor Induk Kewarganegaraan (NIK) KTP" name="nik" />
        <Input label="13. Domisili (Sesuai KTP)" name="address" />
        <Input label="14. No NPWP (Must be made)" name="npwp" />
      </div>

      {/* Bank Account Data */}
      <h2 className="text-lg font-semibold mb-4">Bank Account Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="15. BCA Account Number" name="bankAccountNumber" />
        <Input label="16. BCA Bank Branch Account Opening" name="bankBranch" />
        <Input label="17. BCA Account Holder Name" name="accountHolderName" />
      </div>

      {/* Relative Data */}
      <h2 className="text-lg font-semibold mb-4">Relative Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="18. Parent / Guardian's Name" name="parentGuardianName" />
        <Input label="19. Parent/Guardian Phone Number" name="parentGuardianPhone" />
        <Input label="20. Emergency Contact Number" name="emergencyContact" />
        <Input label="21. Relationship with Emergency Contact" name="emergencyRelation" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setFormData(initialData)}
          className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
          >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
          {loading ? "Processing..." : buttonText}
        </button>
      </div>

      {status && (
        <p className="mt-4 text-center font-medium text-white">{status}</p>
      )}
    </form>
    </>
  );
}
