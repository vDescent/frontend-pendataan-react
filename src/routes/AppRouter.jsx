import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/main/Dashboard";
import UploadExcel from "../pages/main/UploadExcel";
import AddData from "../pages/main/AddData";
import ManageStaff from "../pages/main/ManageData";
import DisplayData from "../pages/main/DisplayData";
import EditData from "../pages/main/EditData";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<UploadExcel />} />
        <Route path="add-data" element={<AddData />} />
        <Route path="manage" element={<ManageStaff />} />
        <Route path="display-data/:id" element={<DisplayData />} />
        <Route path="edit-data/:id" element={<EditData />} />
      </Route>

      {/* Unknown routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
