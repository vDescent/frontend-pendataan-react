import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navigate / to /dashboard instead */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Layout Auth Login & Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Layout Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
