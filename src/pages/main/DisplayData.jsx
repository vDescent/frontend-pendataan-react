import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import StaffForm from "../../components/form/staffForm";

export default function DisplayData() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`http://localhost:5077/api/staff/${id}`);
        console.log("staff data: ", res.data)
        setStaff(res.data);
      } catch (err) {
        setError("Gagal mengambil data staff");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!staff) return <p className="text-center">Data tidak ditemukan</p>;

  const customStatus = staff.isActive? "flex bg-[#76B743] w-30 h-6 my-2 rounded-lg border-2 border-[#BCDBA2] items-center justify-center": "flex bg-[#FF5A51] w-30 h-6 my-2 rounded-lg border-2 border-[#FF676A] items-center justify-center";

  return (
    <div className="max-w-12xl mx-auto">
      <h1 className="text-2xl font-thin m-4">Details Data</h1>
      <hr className="border-t border-gray-600" />
      <div className="flex flex-row">
        <p className="ml-6 mr-2 my-2">Status : </p>
        <div className={customStatus}>
          <p>{staff.isActive ? "Active" : "Non Active"}</p>
        </div>
      </div>
      <StaffForm initialData={staff} readOnly={true} />
    </div>
  );
}
