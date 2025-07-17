// pages/AddData.jsx
import StaffForm from "../../components/form/staffForm";
import axios from "axios";
import { useMemo } from "react";

// ✅ Gunakan useMemo untuk mencegah initialData dibuat ulang setiap render
export default function AddData() {
  const initialData = useMemo(() => ({
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
    endDate: "",
  }), []); // ⬅️ hanya dibuat sekali

  const handleSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5077/api/staff/add", data);
    } catch (error) {
      console.error("Gagal submit dari AddData.jsx", error);
      throw error;
    }
  };

  return (
    <div className="max-w-12xl mx-auto">
      <h1 className="text-2xl font-thin m-4">Dashboard</h1>
      <hr className="border-t border-gray-600 mb-6" />
      <StaffForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
