import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard page */}
          <Route index element={<Dashboard />} />

          {/* Nested inside /dashboard */}
          <Route path="upload" element={<UploadExcel />} />
          <Route path="add-data" element={<AddData />} />
          <Route path="manage" element={<ManageStaff />} />
          <Route path="display-data" element={<DisplayData />} />
          <Route path="edit-data" element={<EditData />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
