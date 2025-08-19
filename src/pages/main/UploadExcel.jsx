import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import SimpleModal from "../../components/modal/SuccessModal";

export default function UploadExcelPage() {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setModalMessage("Silakan pilih file terlebih dahulu.");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5077/api/staff/upload/excel", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const message = await response.text();
        setModalMessage(message || "Data berhasil masuk ke database.");
      } else {
        setModalMessage("Data tidak berhasil masuk ke database. Kemungkinan NIM dan Binusian ID sudah ada");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setModalMessage("Terjadi kesalahan saat upload.");
    } finally {
      setShowModal(true);
    }
  };

  return (
    <div className="bg-[#2e2b30] text-white rounded-lg border border-[#444]">
      <h1 className="text-2xl font-thin m-4">Upload Excel</h1>
      <hr className="border-t border-gray-600 mb-6" />

      <h1 className="text-2xl font-bold m-4">Upload Excel File</h1>
      <div className="border-2 border-dashed border-purple-400 rounded-lg p-12 flex flex-col items-center justify-center bg-[#434045] m-4">
        <FiUpload className="w-20 h-20 text-[#9C94E8] mb-2" />
        <p className="text-lg mb-2">Choose File to Upload</p>
        <p className="text-sm mb-4 text-gray-400">or</p>
        <button
          onClick={handleBrowseClick}
          className="bg-[#3D2C51] text-white font-semibold px-6 py-2 rounded-3xl border-2 border-[#9C94E8] hover:bg-[#9C94E8] cursor-pointer"
        >
          Browse Files
        </button>

        <input
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files[0]) {
              setFileName(e.target.files[0].name);
              setSelectedFile(e.target.files[0]);
            }
          }}
        />

        {fileName && (
          <p className="mt-4 text-sm text-purple-300">
            Uploaded file: <span className="font-medium">{fileName}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="bg-[#3D2C51] text-white font-semibold px-6 py-2 my-2 rounded-3xl border-2 border-[#9C94E8] hover:bg-[#9C94E8] cursor-pointer"
        >
          Upload
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Max file size: <strong>10MB</strong>
        </p>
        <p className="text-xs text-gray-400">
          Supported file types: <strong>XLSX, XLS</strong>
        </p>
      </div>

      {/* Modal */}
      <SimpleModal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
