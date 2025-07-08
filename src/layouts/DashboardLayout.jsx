import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/dashboard/upload" className="block hover:underline">Upload Excel</Link>
          <Link to="/dashboard/add-data" className="block hover:underline">Add Data</Link>
          <Link to="/dashboard/manage" className="block hover:underline">Manage Staff</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
