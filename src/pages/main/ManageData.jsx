import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoubleConfirmModal from "../../components/modal/DoubleConfirm";

export default function ManageStaff() {
  const [keywordName, setKeywordName] = useState("");
  const [keywordNIM, setKeywordNIM] = useState("");
  const [results, setResults] = useState([]);
  const [actionType, setActionType] = useState(""); // terminate | unterminate
  const [terminateStep, setTerminateStep] = useState(0);
  const [staffToTerminate, setStaffToTerminate] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [deleteStep, setDeleteStep] = useState(0);
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

      {results.length > 0 && (
      <div className="mx-4 mt-4 rounded-lg overflow-hidden space-y-4">
        <div className="bg-[#434045] text-white text-sm p-4">
          {results.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center justify-between border border-[#9C94E8] rounded-md mb-4"
            >
              {/* Info Staff */}
              <div className="flex flex-col flex-1 ">
                <div className="flex justify-between text-gray-300 font-medium bg-[#39363B] p-3 border-r border-b border-[#717171]-50">
                  <div className="w-1/3">Name</div>
                  <div className="w-1/3">NIM</div>
                  <div className="w-1/3">Binusian ID</div>
                  
                </div>
                <div className="flex justify-between text-white font-semibold p-3 border-r border-b border-[#717171]-50">
                  <div className="w-1/3">{staff.fullName}</div>
                  <div className="w-1/3">{staff.nim}</div>
                  <div className="w-1/3">{staff.binusianId}</div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex pl-6 flex-1 gap-10 mx-4">
                <button
                  className="w-28 px-4 py-2 border bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] transition"
                  onClick={() => navigate(`/dashboard/display-data/${staff.id}`)}
                >
                  Details
                </button>
                <button
                  className="w-28 px-4 py-2 border bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] transition"
                  onClick={() => navigate(`/dashboard/edit-data/${staff.id}`)}
                >
                  Edit
                </button>
                <button
                  className="w-28 px-4 py-2 border bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] transition"
                  onClick={() => {
                    setStaffToDelete(staff);
                    setDeleteStep(1);
                  }}
                >
                  Delete
                </button>
                <button
                  className="w-28 px-4 py-2 border bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] transition"
                  onClick={() => {
                    setStaffToTerminate(staff);
                    setActionType(staff.isActive ? "terminate" : "unterminate");
                    setTerminateStep(1);
                  }}
                >
                  {staff.isActive ? "Terminate" : "Unterminate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}



      <DoubleConfirmModal
        showStep={terminateStep}
        data={staffToTerminate}
        onCancel={() => {
          setTerminateStep(0);
          setStaffToTerminate(null);
        }}
        onFirstConfirm={() => setTerminateStep(2)}
        onSecondCancel={() => setTerminateStep(1)}
        onSecondConfirm={async () => {
          try {
            await axios.post(
              `http://localhost:5077/api/staff/${actionType}/${staffToTerminate.id}`
            );
            alert(`${actionType} berhasil`);
            setTerminateStep(0);
            setStaffToTerminate(null);
            searchByName(); // Refresh
          } catch (err) {
            alert(`${actionType} gagal`);
          }
        }}
        actionType={actionType}
      />

      {/* Modal hapus */}
      <DoubleConfirmModal
        showStep={deleteStep}
        data={staffToDelete}
        onCancel={() => {
          setDeleteStep(0);
          setStaffToDelete(null);
        }}
        onFirstConfirm={() => setDeleteStep(2)}
        onSecondCancel={() => setDeleteStep(1)}
        onSecondConfirm={async () => {
          try {
            await axios.delete(`http://localhost:5077/api/staff/delete/${staffToDelete.id}`);
            alert("Data berhasil dihapus");
            setDeleteStep(0);
            setStaffToDelete(null);
            searchByName(); // Refresh data
          } catch (err) {
            alert("Gagal menghapus data");
          }
        }}
        actionType="delete"
      />

    </div>
  );
}
