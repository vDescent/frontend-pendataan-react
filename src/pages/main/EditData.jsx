// pages/EditData.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import StaffForm from "../../components/form/staffForm";

export default function EditData() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format tanggal agar cocok dengan input type="date"
  const formatDate = (date) => (date ? date.substring(0, 10) : "");

  // Ambil data staff berdasarkan ID
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`http://localhost:5077/api/staff/${id}`);
        const data = res.data;

        setInitialData({
          ...data,
          dateOfBirth: formatDate(data.dateOfBirth),
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        });
      } catch (error) {
        console.error("Gagal memuat data staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5077/api/staff/edit/${id}`, data);
    } catch (error) {
      console.error("Gagal submit dari EditData.jsx", error);
      throw error;
    }
  };

  if (loading || !initialData) return <p className="text-center">🔄 Memuat data...</p>;

  return (
    <div className="max-w-12xl mx-auto">
      <h1 className="text-2xl font-thin m-4">Edit Data</h1>
      <hr className="border-t border-gray-600 mb-6" />
      <StaffForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
