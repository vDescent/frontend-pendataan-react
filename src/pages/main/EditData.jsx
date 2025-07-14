import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditStaffForm from "../../components/form/editStaffForm";

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
  endDate: "",
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

        const formatDate = (date) => (date ? date.substring(0, 10) : "");

        setFormData({
          ...data,
          dateOfBirth: formatDate(data.dateOfBirth),
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        });
      } catch (err) {
        setStatus("Gagal memuat data staff.");
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
      setStatus("Data berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setStatus(
        "Gagal memperbarui data: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) return <p className="text-center">🔄 Memuat data...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Data Staff</h1>
      <EditStaffForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        status={status}
        loading={false}
      />
    </div>
  );
}
