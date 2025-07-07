export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Selamat datang di aplikasi Anda!</p>
      <ul className="list-disc ml-5 mt-3 text-gray-700">
        <li>Menampilkan 10 data terakhir</li>
        <li>Upload via Excel</li>
        <li>Tambah data manual</li>
        <li>Cari dan tampilkan data</li>
        <li>Edit data</li>
      </ul>
    </div>
  );
}
