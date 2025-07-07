import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow p-4 mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
