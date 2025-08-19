import { useEffect, useState } from "react";
import TextInput from "../common/TextInput";
import RadioGroup from "../common/RadioGroup";
import DateInput from "../common/DateInput";
import { IoInformationCircle } from "react-icons/io5";
import validateStaffForm from "../../utils/validateStafForm";
import { useLocation } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isDetailPage = location.pathname.includes("display-data");
  const isEditPage = location.pathname.includes("edit-data");

  useEffect(() => {
    setFormData({ ...defaultForm, ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus("");

    const validationErrors = validateStaffForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="bg-[#2e2b30] text-white rounded-lg mx-4 p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6 md:pr-6">
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
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <RadioGroup label="9. Binusian Status" name="binusianStatus" options={["Associate Member (AM)", "Associate Member (AM) / Junior Staff under", "Non-Associate Member (Non-AM)"]} selected={formData.binusianStatus} onChange={handleChange} direction="column" readOnly={readOnly} error={errors.binusianStatus}/>
                  {/* Lg kebawah */}
                  <div className="block lg:hidden bg-[#434045] p-4 rounded-2xl text-sm">
                    <div className="flex justify-end">
                      <IoInformationCircle className="size-6 fill-[#9C94E8]" />
                    </div>
                    <p>AM = Bekerja di IT Div sebagai Associate Member</p>
                    <br />
                    <p>AM / Junior Staff = Bekerja under Software House sebagai Associate Member atau Junior Staff</p>
                    <br />
                    <p>Non-AM = bukan bagian dari IT Div sebagai Associate Member (AM) maupun Junior Staff</p>
                  </div>
                  <DateInput label="10. Start Date" name="startDate" value={formData.startDate} onChange={handleChange} readOnly={readOnly} error={errors.startDate}/>
                  <DateInput label="11. End Date" name="endDate" value={formData.endDate} onChange={handleChange} readOnly={readOnly} error={errors.endDate}/>
                </div>
                {/* ketika lg keatas */}
                <div className="hidden lg:block bg-[#434045] p-4 rounded-2xl xl:w-1/2 text-sm">
                  <div className="flex justify-end">
                    <IoInformationCircle className="size-6 fill-[#9C94E8]" />
                  </div>
                  <p>AM = Bekerja di IT Div sebagai Associate Member</p>
                  <br />
                  <p>AM / Junior Staff = Bekerja under Software House sebagai Associate Member atau Junior Staff</p>
                  <br />
                  <p>Non-AM = bukan bagian dari IT Div sebagai Associate Member (AM) maupun Junior Staff</p>
                </div>
              </div>
            </div>
            {/* <DateInput label="10. Start Date" name="startDate" value={formData.startDate} onChange={handleChange} readOnly={readOnly}/>
            <DateInput label="11. End Date" name="endDate" value={formData.endDate} onChange={handleChange} readOnly={readOnly}/> */}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 md:pl-6 mt-6 md:mt-0">
            {/* <h3 className="text-lg font-semibold invisible">Spacer</h3>  */}
            <p className="text-xl mb-2 font-medium">Legal / Citizen Data</p>
            <TextInput label="12. Nomor Induk Kewarganegaraan (NIK) KTP " name="nik" value={formData.nik} onChange={handleChange} readOnly={readOnly} error={errors.nik}/>
            <TextInput label="13. Domisili (Sesuai KTP)" name="address" value={formData.address} onChange={handleChange} readOnly={readOnly} error={errors.address}/>
            <TextInput label="14. No NPWP (Must be made)" name="npwp" value={formData.npwp} onChange={handleChange} readOnly={readOnly} error={errors.npwp}/>
            <p className="text-xl mb-2 font-medium">Bank Account Data</p>
            <TextInput label="15. BCA Account Number" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} readOnly={readOnly} error={errors.bankAccountNumber}/>
            <TextInput label="16. BCA Bank Branch Account Opening (Example: KCP Bina Nusantara)" name="bankBranch" value={formData.bankBranch} onChange={handleChange} readOnly={readOnly} error={errors.bankBranch}/>
            <TextInput label="17. BCA Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} readOnly={readOnly} error={errors.accountHolderName}/>
            <p className="text-xl mb-2 font-medium">Relative Data</p>
            <TextInput label="18. Parent / Guardian's Name" name="parentGuardianName" value={formData.parentGuardianName} onChange={handleChange} readOnly={readOnly} error={errors.parentGuardianName}/>
            <TextInput label="19. Parent/Guardian Phone Number" name="parentGuardianPhone" value={formData.parentGuardianPhone} onChange={handleChange} readOnly={readOnly} error={errors.parentGuardianPhone}/>
            <TextInput label="20. Emergency Contact Number" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} readOnly={readOnly} error={errors.emergencyContact}/>
            <TextInput label="21. Relationship with Emergency Contact" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} readOnly={readOnly} error={errors.emergencyRelation}/>
            {!isDetailPage && (
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
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
                  {loading ? "Processing..." : isEditPage ? "Edit Data" : buttonText}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
