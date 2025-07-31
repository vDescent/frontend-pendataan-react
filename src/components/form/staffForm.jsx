import { useEffect, useState } from "react";
import TextInput from "../common/TextInput";
import RadioGroup from "../common/RadioGroup";
import DateInput from "../common/DateInput";
import { IoInformationCircle } from "react-icons/io5";
import validateStaffForm from "../../utils/validateStafForm";

export default function StaffForm({ initialData = {}, onSubmit, buttonText = "Add Data", readOnly = false}) {
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

  const [errors, setErrors] = useState({});
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

    const validationErrors = validateStaffForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("Form tidak valid. Silakan cek kembali.");
      return;
    }

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
    <div className="">
      <form onSubmit={handleSubmit} className="bg-[#2e2b30] text-white rounded-lg mx-6 space-y-6">
        {/* <h2 className="text-2xl font-semibold mb-4">Staff Data Form</h2> */}
        {/* MAIN WRAPPER GRID: dua kolom dengan garis vertikal lurus */}
        <div className="hidden md:grid md:grid-cols-2 md:divide-x md:gap-6">
          {/* LEFT COLUMN */}
          <div className="pr-6 space-y-6">
            <p className="text-xl mb-2 font-medium">GENERAL Data</p>
            <TextInput label="1. Full Name" name="fullName" value={formData.fullName} onChange={handleChange} readOnly={readOnly} error={errors.fullName}/>
            <DateInput label="2. Birth Date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} readOnly={readOnly} error={errors.dateOfBirth}/>
            <RadioGroup label="3. Gender" name="gender" options={["Male", "Female"]} selected={formData.gender} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="4. Phone Number (WhatsApp)" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} readOnly={readOnly} error={errors.phoneNumber}/>

            <p className="text-xl mb-2 font-medium">BINUSIAN Data</p>
            <TextInput label="5. Nomor Induk Mahasiswa (NIM)" name="nim" value={formData.nim} onChange={handleChange} readOnly={readOnly} error={errors.nim}/>
            <TextInput label="6. Binusian ID" name="binusianId" value={formData.binusianId} onChange={handleChange} readOnly={readOnly} error={errors.binusianId}/>  
            <TextInput label="7. Email Address (binus.edu or binus.ac.id for those who don't have one)" name="email" value={formData.email} onChange={handleChange} readOnly={readOnly} error={errors.email}/>
            <TextInput label="8. Active Semester (Counting Even Semester Period - February)" name="activeSemester" value={formData.activeSemester} onChange={handleChange} readOnly={readOnly} error={errors.activeSemester}/>
            <div className="flex flex-row">
            {/* bagian kiri */}
            <div className="flex flex-col">
              <RadioGroup label="9. Binusian Status" name="binusianStatus" options={["Associate Member (AM)", "Associate Member (AM) / Junior Staff under", "Non-Associate Member (Non-AM)"]} selected={formData.binusianStatus} onChange={handleChange} direction="column" readOnly={readOnly} error={errors.binusianStatus}/>
              <DateInput label="10. Start Date" name="startDate" value={formData.startDate} onChange={handleChange} readOnly={readOnly}/>
              <DateInput label="11. End Date" name="endDate" value={formData.endDate} onChange={handleChange} readOnly={readOnly}/>
            </div>
            {/* bagian kanan */}
            <div className="bg-[#434045] p-5 flex flex-col flex-1/2 text-justify rounded-2xl">
              <div className="flex justify-end">
                <IoInformationCircle className="size-8 fill-[#9C94E8]"/>
              </div>
              <p>AM = Bekerja di IT Div sebagai Associate Member</p>
              <br />
              <p>AM / Junior Staff = Bekerja under Software House sebagai Associate Member atau Junior Staff</p>
              <br />
              <p>Non-AM = bukan bagian dari IT Div sebagai Associate Member (AM) maupun Junior Staff</p>
            </div>
            </div>
            {/* <DateInput label="10. Start Date" name="startDate" value={formData.startDate} onChange={handleChange} readOnly={readOnly}/>
            <DateInput label="11. End Date" name="endDate" value={formData.endDate} onChange={handleChange} readOnly={readOnly}/> */}
          </div>

          {/* RIGHT COLUMN */}
          <div className="pl-6 space-y-6">
            {/* <h3 className="text-lg font-semibold invisible">Spacer</h3>  */}
            <p className="text-xl mb-2 font-medium">Legal / Citizen Data</p>
            <TextInput label="12. Nomor Induk Kewarganegaraan (NIK) KTP " name="nik" value={formData.nik} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="13. Domisili (Sesuai KTP)" name="address" value={formData.address} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="14. No NPWP (Must be made)" name="npwp" value={formData.npwp} onChange={handleChange} readOnly={readOnly}/>
            <p className="text-xl mb-2 font-medium">Bank Account Data</p>
            <TextInput label="15. BCA Account Number" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="16. BCA Bank Branch Account Opening (Example: KCP Bina Nusantara)" name="bankBranch" value={formData.bankBranch} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="17. BCA Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} readOnly={readOnly}/>
            <p className="text-xl mb-2 font-medium">Relative Data</p>
            <TextInput label="18. Parent / Guardian's Name" name="parentGuardianName" value={formData.parentGuardianName} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="19. Parent/Guardian Phone Number" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="20. Emergency Contact Number" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} readOnly={readOnly}/>
            <TextInput label="21. Relationship with Emergency Contact" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} readOnly={readOnly}/>
            <div className="flex justify-between my-10">
              <button
                type="button"
                onClick={() => setFormData({ ...defaultForm, ...initialData })}
                className="px-6 py-2 bg-[#512C2C] border-3 border-[#FF5A51] rounded-4xl hover:bg-[#FF5A51] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border-2 border-[#9C94E8] bg-[#3D2C51] text-white rounded-4xl hover:bg-[#9C94E8] cursor-pointer"
              >
                {loading ? "Processing..." : buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE VERSION: 1 kolom */}
        <div className="md:hidden space-y-6">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "gender") {
              return <RadioGroup key={key} label={key} name={key} options={["Male", "Female"]} selected={value} onChange={handleChange} readOnly={readOnly}/>;
            }
            const isDateField = ["dateOfBirth", "startDate", "endDate"].includes(key);
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            const InputComponent = isDateField ? DateInput : TextInput;
            return <InputComponent key={key} label={label} name={key} value={value} onChange={handleChange} readOnly={readOnly}/>;
          })}
        </div>

        {/* Buttons */}
        {/* <div className="flex justify-end gap-90">
          <button
            type="button"
            onClick={() => setFormData({ ...defaultForm, ...initialData })}
            className="px-6 py-2 bg-[#512C2C] border-3 border-[#FF5A51] rounded-4xl hover:bg-[#FF5A51] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 border-2 border-[#9C94E8] bg-[#3D2C51] text-white rounded-4xl hover:bg-[#9C94E8] cursor-pointer"
          >
            {loading ? "Processing..." : buttonText}
          </button>
        </div> */}

        {status && <p className="mt-4 text-center font-medium text-white">{status}</p>}
      </form>
    </div>
  );
}
