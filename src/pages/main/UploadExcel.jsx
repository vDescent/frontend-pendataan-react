import { useState } from "react";

export default function UploadExcelPage() {
  const [uploadProgress, setUploadProgress] = useState(50);
  const [fileName, setFileName] = useState("StaffData1.XLSX");

  return (
    <div className="bg-[#2e2b30] text-white rounded-lg p-6 border border-[#444]">
      <h1 className="text-2xl font-bold mb-6">Upload Excel File</h1>
      <div className="border-2 border-dashed border-purple-400 rounded-lg p-12 flex flex-col items-center justify-center bg-[#1f1d23] mb-6">
        <div className="text-5xl mb-4">📤</div>
        <p className="text-lg mb-2">Drag and Drop File to Upload</p>
        <p className="text-sm mb-4 text-gray-400">or</p>
        <button className="bg-[#5a3e8b] hover:bg-[#6d4fa7] text-white font-semibold px-6 py-2 rounded">Browse Files</button>
        <p className="text-xs text-gray-400 mt-4">Max file size: <strong>10MB</strong></p>
        <p className="text-xs text-gray-400">Supported file types: <strong>XLSX, XLS</strong></p>
      </div>

      <div className="bg-[#1f1d23] rounded-md p-4 flex items-center justify-between">
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
      </div>
    </div>
  );
}
