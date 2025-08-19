import { useEffect, useState } from "react";
import { getRecentStaff } from "../../services/staffService";

export default function Dashboard() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecentStaff();
        // console.log("Data staff dari API:", data); // cek data
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

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2e2b30]">
        <div className="w-12 h-12 border-4 border-[#6E4F90] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#2e2b30] min-h-screen p-2 sm:p-4 text-white">
      <h1 className="text-xl sm:text-2xl font-thin mb-2">Dashboard</h1>
      <hr className="border-t border-gray-600 mb-4" />
      <h2 className="text-lg sm:text-xl font-thin mb-4">Recently Added Data</h2>

      <div className="overflow-x-auto rounded-lg border border-[#d8d8d8]">
        <table className="min-w-full text-xs sm:text-sm md:text-base bg-[#434045]">
          <thead className="bg-[#6E4F90] text-white text-center">
            <tr>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">Full Name</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">WA Number</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">NIM</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">BINUSIAN ID</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">Email</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">BINUSIAN Status</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">Start Date</th>
              <th className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">End Date</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item, index) => (
              <tr
                key={item.id ? `${item.id}-${index}` : index} // ✅ key unik
                className="text-center border-t border-[#444] hover:bg-[#373753] font-light"
              >
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.fullName}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.phoneNumber}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.nim}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.binusianId}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.email}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.binusianStatus}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.startDate}</td>
                <td className="px-2 sm:px-4 py-2 border border-[#d8d8d8]">{item.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
