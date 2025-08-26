import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoubleConfirmModal from "../../components/modal/DoubleConfirm";
import ActionBtn from "../../components/common/ActionBtn";
import NoDataFound from "../../components/common/NoDataFound";


export default function ManageStaff() {
  const [keywordName, setKeywordName] = useState("");
  const [keywordNIM, setKeywordNIM] = useState("");
  const [results, setResults] = useState([]);
  const [actionType, setActionType] = useState(""); // terminate | unterminate
  const [terminateStep, setTerminateStep] = useState(0);
  const [staffToTerminate, setStaffToTerminate] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [deleteStep, setDeleteStep] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const searchByName = async () => {
    setHasSearched(true);
    try {
      const res = await axios.get(
        `http://localhost:5077/api/staff/search?keyword=${keywordName}`
      );
      setResults(res.data);
    } catch (err) {
      // alert("Gagal mencari staff");
    }
  };

  const searchByNIM = async () => {
    setHasSearched(true);
    try {
      const res = await axios.get(
        `http://localhost:5077/api/staff/search-nim?nim=${keywordNIM}`
      );
      setResults(res.data);
    } catch (err) {
      // alert("Gagal mencari staff");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-thin m-4">Manage Staff Data</h1>
      <hr className="border-t border-gray-600 mb-2" />

      {/* Search Form */}
      <div className="flex flex-col gap-8 mb-4 p-4 lg:flex-row">
        {/* Kiri Full Name */}
        <div className="w-full lg:w-1/2">
          <p className="text-xl font-thin mb-2">Staff Full Name</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full"
              placeholder="Cari nama atau email..."
              value={keywordName}
              onChange={(e) => setKeywordName(e.target.value)}
            />
            <button
              className="bg-[#3D2C51] text-white px-4 py-2 rounded-4xl border-2 border-[#9C94E8] whitespace-nowrap hover:bg-[#9C94E8] cursor-pointer"
              onClick={searchByName}
            >
              Search By Name
            </button>
          </div>
        </div>

        {/* Kanan NIM */}
        <div className="w-full lg:w-1/2">
          <p className="text-xl font-thin mb-2">Staff NIM</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full"
              placeholder="Cari NIM staff..."
              value={keywordNIM}
              onChange={(e) => setKeywordNIM(e.target.value)}
            />
            <button
              className="bg-[#3D2C51] text-white px-4 py-2 rounded-4xl border-2 border-[#9C94E8] whitespace-nowrap hover:bg-[#9C94E8] cursor-pointer"
              onClick={searchByNIM}
            >
              Search By NIM
            </button>
          </div>
        </div>
      </div>

      {/* Hasil */}
      {/* Kosong */}
      {hasSearched && results.length === 0 && (
        <NoDataFound message="No staff data found" />
      )}

      {/* Ada */}
      {results.length > 0 && (
        <div className="mx-4 mt-4 rounded-lg overflow-hidden space-y-4">
          <div className="bg-[#434045] text-white text-sm p-4">
            {results.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col w-full h-full lg:flex-row items-stretch border border-[#9C94E8] rounded-md mb-4"
              >
                {/* Info Staff */}
                <div className="flex flex-1 flex-col h-full w-full">
                  <div className="flex justify-between text-gray-300 font-medium bg-[#39363B] p-3 border-b border-[#717171]-50">
                    <div className="w-1/3 break-words">Name</div>
                    <div className="w-1/3 break-words">NIM</div>
                    <div className="w-1/3 break-words">Binusian ID</div>
                  </div>
                  <div className="flex justify-between text-white font-semibold p-3 border-b border-[#717171]-50">
                    <div className="w-1/3 break-words">{staff.fullName}</div>
                    <div className="w-1/3 break-words">{staff.nim}</div>
                    <div className="w-1/3 break-words">{staff.binusianId}</div>
                  </div>

                  {/* Tombol Mobile */}
                  <div className="flex lg:hidden p-4 md:flex justify-evenly">
                    <ActionBtn
                      staff={staff}
                      navigate={navigate}
                      setStaffToDelete={setStaffToDelete}
                      setDeleteStep={setDeleteStep}
                      setStaffToTerminate={setStaffToTerminate}
                      setActionType={setActionType}
                      setTerminateStep={setTerminateStep}
                    />
                  </div>
                </div>

                {/* Tombol Desktop */}
                <div className="hidden lg:flex items-center p-4 w-[400px] xl:w-[500px] shrink-0">
                  <ActionBtn
                    staff={staff}
                    navigate={navigate}
                    setStaffToDelete={setStaffToDelete}
                    setDeleteStep={setDeleteStep}
                    setStaffToTerminate={setStaffToTerminate}
                    setActionType={setActionType}
                    setTerminateStep={setTerminateStep}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal terminate */}
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
            await axios.delete(
              `http://localhost:5077/api/staff/delete/${staffToDelete.id}`
            );
            // alert("Data berhasil dihapus");
            setDeleteStep(0);
            setStaffToDelete(null);
            // searchByNIM(); 
          } catch (err) {
            // alert("Gagal menghapus data");
          }
        }}
        actionType="delete"
      />
    </div>
  );
}
