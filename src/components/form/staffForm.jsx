import { useEffect, useState } from "react";
import TextInput from "../common/TextInput";
import RadioGroup from "../common/RadioGroup";
import DateInput from "../common/DateInput";

export default function StaffForm({ initialData = {}, onSubmit, buttonText = "Add Data" }) {
  const defaultForm = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    nim: "",
    binusianId: "",
    email: "",
    activeSemester: "",
    binusianStatus: "",
    startDate: "",
    endDate: "",
    nik: "",
    address: "",
    npwp: "",
    bankAccountNumber: "",
    bankBranch: "",
    accountHolderName: "",
    parentGuardianName: "",
    parentGuardianPhone: "",
    emergencyContact: "",
    emergencyRelation: "",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...defaultForm, ...initialData });
  }, [initialData]);

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
      setStatus("Data berhasil ditambahkan!");
      // setFormData({ ...defaultForm, ...initialData });
    } catch (err) {
      console.error(err);
      setStatus("Gagal menambahkan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit} className="bg-[#39363b] text-white p-6 rounded-lg mx-4 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Staff Data Form</h2>

        {/* MAIN WRAPPER GRID: dua kolom dengan garis vertikal lurus */}
        <div className="hidden md:grid md:grid-cols-2 md:divide-x md:gap-6">
          {/* LEFT COLUMN */}
          <div className="pr-6 space-y-6">
            <p className="text-xl mb-2 font-medium">GENERAL Data</p>
            <TextInput label="1. Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <DateInput label="2. Birth Date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <RadioGroup label="3. Gender" name="gender" options={["Male", "Female"]} selected={formData.gender} onChange={handleChange} />
            <TextInput label="4. Phone Number (WhatsApp)" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

            <p className="text-xl mb-2 font-medium">BINUSIAN Data</p>
            <TextInput label="5. Nomor Induk Mahasiswa (NIM)" name="nim" value={formData.nim} onChange={handleChange} />
            <TextInput label="6. Binusian ID" name="binusianId" value={formData.binusianId} onChange={handleChange} />  
            <TextInput label="7. Email Address (binus.edu or binus.ac.id for those who don't have one)" name="email" value={formData.email} onChange={handleChange} />
            <TextInput label="8. Active Semester (Counting Even Semester Period - February)" name="activeSemester" value={formData.activeSemester} onChange={handleChange} />
            <TextInput label="9. Binusian Status" name="binusianStatus" value={formData.binusianStatus} onChange={handleChange} />
            <DateInput label="11. End Date" name="endDate" value={formData.endDate} onChange={handleChange} />
            <TextInput label="12. NIK" name="nik" value={formData.nik} onChange={handleChange} />
            <TextInput label="14. NPWP" name="npwp" value={formData.npwp} onChange={handleChange} />
            <TextInput label="15. Bank Account Number" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
            <TextInput label="17. Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
            <TextInput label="18. Parent / Guardian Name" name="parentGuardianName" value={formData.parentGuardianName} onChange={handleChange} />
            <TextInput label="20. Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="pl-6 space-y-6">
            <h3 className="text-lg font-semibold invisible">Spacer</h3>
            <DateInput label="10. Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />
            <TextInput label="13. Address" name="address" value={formData.address} onChange={handleChange} />
            <TextInput label="16. Bank Branch" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
            <TextInput label="19. Parent / Guardian Phone" name="parentGuardianPhone" value={formData.parentGuardianPhone} onChange={handleChange} />
            <TextInput label="21. Emergency Relation" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} />
          </div>
        </div>

        {/* MOBILE VERSION: 1 kolom */}
        <div className="md:hidden space-y-6">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "gender") {
              return <RadioGroup key={key} label={key} name={key} options={["Male", "Female"]} selected={value} onChange={handleChange} />;
            }
            const isDateField = ["dateOfBirth", "startDate", "endDate"].includes(key);
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            const InputComponent = isDateField ? DateInput : TextInput;
            return <InputComponent key={key} label={label} name={key} value={value} onChange={handleChange} />;
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...defaultForm, ...initialData })}
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

        {status && <p className="mt-4 text-center font-medium text-white">{status}</p>}
      </form>
    </div>
  );
}
