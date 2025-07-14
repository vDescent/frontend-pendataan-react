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

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#2e2b30] min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Recently Added Data</h1>

      <div className="overflow-x-auto rounded-lg border border-[#d8d8d8]">
        <table className="min-w-full bg-[#434045] text-sm">
          <thead className="bg-[#6e4f90] text-white text-left">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">WA Number</th>
              <th className="px-4 py-3">NIM</th>
              <th className="px-4 py-3">BINUSIAN ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">BINUSIAN Status</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item.id} className="border-t border-[#444] hover:bg-[#373753]">
                <td className="px-4 py-2">{item.fullName}</td>
                <td className="px-4 py-2">{item.phoneNumber}</td>
                <td className="px-4 py-2">{item.nim}</td>
                <td className="px-4 py-2">{item.binusianId}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.binusianStatus}</td>
                <td className="px-4 py-2">{item.startDate}</td>
                <td className="px-4 py-2">{item.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
