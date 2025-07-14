import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StaffDisplay from "../../components/form/staffDisplay"; 

export default function DisplayData() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`http://localhost:5077/api/staff/${id}`);
        setStaff(res.data);
      } catch (err) {
        setError("Gagal mengambil data staff");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  if (loading) return <p className="text-center">🔄 Memuat data...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!staff) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Detail Staff</h1>
      <StaffDisplay data={staff} />
    </div>
  );
}
