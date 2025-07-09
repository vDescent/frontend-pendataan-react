import StaffForm from "../../components/common/staffForm";
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

export default function AddData() {
  const handleSubmit = async (data) => {
    await axios.post("http://localhost:5077/api/staff/add", data);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Data Staff</h1>
      <StaffForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
