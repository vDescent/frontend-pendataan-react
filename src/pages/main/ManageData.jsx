import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageStaff() {
  const [keywordName, setKeywordName] = useState("");
  const [keywordNIM, setKeywordNIM] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [actionType, setActionType] = useState(""); // terminate | unterminate
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const navigate = useNavigate();

  const searchByName = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5077/api/staff/search?keyword=${keywordName}`
      );
      setResults(res.data);
    } catch (err) {
      alert("Gagal mencari staff");
      console.error(err);
    }
  };

  const searchByNIM = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5077/api/staff/search?keyword=${keywordNIM}`
      );
      setResults(res.data);
    } catch (err) {
      alert("Gagal mencari staff");
      console.error(err);
    }
  };

  const handleTerminateToggle = async () => {
    try {
      await axios.post(
        `http://localhost:5077/api/staff/${actionType}/${selectedStaff.id}`
      );
      alert(`${actionType} berhasil`);
      setShowModal(false);
      searchByName(); // refresh
    } catch (err) {
      alert(`${actionType} gagal`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5077/api/staff/delete/${staffToDelete.id}`);
      alert("Data berhasil dihapus");
      setShowDeleteModal(false);
      searchByName(); // refresh
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-thin m-4">Manage Staff Data</h1>
      <hr className="border-t border-gray-600 mb-2" />

      {/* Search Form */}
      <div className="flex gap-8 mb-4 p-4">
        {/* Kolom kiri: Staff Full Name */}
        <div className="w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-thin">Staff Full Name</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full"
              placeholder="Cari nama atau email..."
              value={keywordName}
              onChange={(e) => setKeywordName(e.target.value)}
            />
            <button
              className="bg-[#3D2C51] text-white px-4 py-2 rounded-4xl border-2 border-[#9C94E8] whitespace-nowrap"
              onClick={searchByName}
            >
              Search By Name
            </button>
          </div>
        </div>

        {/* Kolom kanan: Staff NIM */}
        <div className="w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-thin">Staff NIM</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full"
              placeholder="Cari NIM staff..."
              value={keywordNIM}
              onChange={(e) => setKeywordNIM(e.target.value)}
            />
            <button
              className="bg-[#3D2C51] text-white px-4 py-2 rounded-4xl border-2 border-[#9C94E8] whitespace-nowrap"
              onClick={searchByNIM}
            >
              Search By NIM
            </button>
          </div>
        </div>
      </div>

      {/* Tabel hasil */}
      {results.length > 0 && (
        <div className="mx-4">
        <table className="min-w-full border text-sm mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Nama</th>
              <th className="border px-2 py-1">NIM</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {results.map((staff) => (
              <tr key={staff.id}>
                <td className="border px-2 py-1">{staff.fullName}</td>
                <td className="border px-2 py-1">{staff.nim}</td>
                <td className="border px-2 py-1">{staff.email}</td>
                <td className="border px-2 py-1">
                  {staff.isActive ? "Aktif" : "Tidak Aktif"}
                </td>
                <td className="border px-2 py-1 flex flex-wrap gap-2">
                  <button
                    className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
                    onClick={() => navigate(`/dashboard/display-data/${staff.id}`)}
                  >
                    Display
                  </button>
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                    onClick={() => navigate(`/dashboard/edit-data/${staff.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                    onClick={() => {
                      setStaffToDelete(staff);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    className={`${
                      staff.isActive ? "bg-red-700" : "bg-green-700"
                    } text-white px-2 py-1 rounded text-sm`}
                    onClick={() => {
                      setSelectedStaff(staff);
                      setActionType(staff.isActive ? "terminate" : "unterminate");
                      setShowModal(true);
                    }}
                  >
                    {staff.isActive ? "Terminate" : "Unterminate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {/* Modal konfirmasi terminate/unterminate */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Yakin ingin {actionType} {selectedStaff.fullName}?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  actionType === "terminate" ? "bg-red-600" : "bg-green-600"
                }`}
                onClick={handleTerminateToggle}
              >
                Ya, {actionType}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal hapus */}
      {showDeleteModal && staffToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Yakin ingin menghapus {staffToDelete.fullName}?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDelete}
              >
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
