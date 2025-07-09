import { useEffect, useState } from "react";
import { getRecentStaff } from "../../services/staffService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecentStaff();
        setStaff(data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">10 Data Terbaru</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">NIM</th>
              <th className="border px-4 py-2">Binusian ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.fullName}</td>
                <td className="border px-4 py-2">{item.nim}</td>
                <td className="border px-4 py-2">{item.binusianId}</td>
                <td className="border px-4 py-2">{item.binusianStatus}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.phoneNumber}</td>
                <td className="border px-4 py-2">{item.startDate}</td>
                <td className="border px-4 py-2">{item.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
    </div>
  );
}
