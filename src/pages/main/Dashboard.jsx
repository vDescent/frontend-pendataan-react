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
    <div className="bg-[#2e2b30] min-h-screen p-0 text-white">
      
      <h1 className="text-2xl font-thin m-4">Dashboard</h1>
      <hr className="border-t border-gray-600 mb-6" />
      <h1 className="text-xl font-thin m-4">Recently Added Data</h1>

      <div className="overflow-x-auto rounded-lg border border-[#d8d8d8] m-4">
        <table className="min-w-full bg-[#434045] text-sm">
          <thead className="bg-[#6E4F90] text-white text-center text-lg">
            <tr>
              <th className="px-4 py-3 border border-[#d8d8d8]">Full Name</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">WA Number</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">NIM</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">BINUSIAN ID</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">Email</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">BINUSIAN Status</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">Start Date</th>
              <th className="px-4 py-3 border border-[#d8d8d8]">End Date</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item.id} className="text-center border-t border-[#444] hover:bg-[#373753] font-light text-lg">
                <td className="px-6 py-4 border border-[#d8d8d8]">{item.fullName}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.phoneNumber}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.nim}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.binusianId}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.email}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.binusianStatus}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.startDate}</td>
                <td className="px-4 py-2 border border-[#d8d8d8]">{item.endDate}</td>
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
