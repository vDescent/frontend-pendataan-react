import { useState, useMemo } from "react";
import StaffForm from "../../components/form/staffForm";
import axios from "axios";
import SimpleModal from "../../components/modal/SuccessModal";

export default function AddData() {
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
  }), []);

  const handleSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5077/api/staff/add", data);
      setModalMessage("Berhasil menambahkan data!");
      setShowModal(true);
    } catch (error) {
      console.error("Gagal submit dari AddData.jsx", error);
      if(error.response){
        setModalMessage(error.response.data.message || "Gagal Menambahkan Data!");
      } else{
        setModalMessage("Tidak bisa terhubung ke server")
      }
      setShowModal(true);
      // throw error;
    }
  };

  return (
    <div className="max-w-12xl mx-auto">
      <h1 className="text-2xl font-thin m-4">Add Data</h1>
      <hr className="border-t border-gray-600 mb-6" />
      <StaffForm initialData={initialData} onSubmit={handleSubmit} />

      {/* modal */}
      <SimpleModal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
