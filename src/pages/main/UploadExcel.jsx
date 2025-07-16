import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";

export default function UploadExcelPage() {
  // const [uploadProgress, setUploadProgress] = useState(50);
  const [fileName, setFileName] = useState("StaffData1.XLSX");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
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
        alert(message);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="bg-[#2e2b30] text-white rounded-lg border border-[#444]">
      <h1 className="text-2xl font-thin m-4">Upload Excel</h1>
      <hr className="border-t border-gray-600 mb-6" />
      <div></div>
      <h1 className="text-2xl font-bold m-4">Upload Excel File</h1>
      <div className="border-2 border-dashed border-purple-400 rounded-lg p-12 flex flex-col items-center justify-center bg-[#434045] m-4">
        <FiUpload className="w-20 h-20 text-[#9C94E8] mb-2" />
        <p className="text-lg mb-2">Drag and Drop File to Upload</p>
        <p className="text-sm mb-4 text-gray-400">or</p>
        <button
          onClick={handleBrowseClick}
          className="bg-[#3D2C51] hover:bg-[#6d4fa7] text-white font-semibold px-6 py-2 rounded-3xl border border-[#9C94E8]"
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
          className="bg-[#3D2C51] hover:bg-[#6d4fa7] text-white font-semibold px-6 py-2 my-2 rounded-3xl border border-[#9C94E8]"
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

      {/* <div className="bg-[#1f1d23] rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-purple-300">⏳</div>
          <span className="text-sm">{fileName}</span>
        </div>
        <div className="flex items-center space-x-4 w-1/2">
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-400 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <span className="text-sm text-purple-300">{uploadProgress}%</span>
          <button className="text-red-400 text-xl hover:text-red-600">✖</button>
        </div>
      </div> */}
    </div>
  );
}
