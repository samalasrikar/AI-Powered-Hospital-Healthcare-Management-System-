import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute, { getDashboardByRole } from './components/ProtectedRoute';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import LabDashboard from './pages/dashboards/LabDashboard';
import PharmacyDashboard from './pages/dashboards/PharmacyDashboard';
import UnauthorizedPage from './pages/shared/UnauthorizedPage';
import LandingPage from './pages/LandingPage';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';

// Smart redirect: authenticated users go to their role's dashboard
function DashboardRedirect() {
  const { user } = useAuth();
  return <Navigate to={getDashboardByRole(user?.role)} replace />;
}

const ADMIN_ROLES = ['HospitalAdmin', 'BillingExecutive'];
const DOCTOR_ROLES = ['Doctor', 'Nurse', 'Receptionist'];

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Dashboard smart redirect */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* SuperAdmin — dedicated console */}
          <Route
            path="/dashboard/superadmin/*"
            element={
              <ProtectedRoute allowedRoles={['SuperAdmin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Hospital Admin / Billing */}
          <Route
            path="/dashboard/admin/*"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Doctor / Nurse / Receptionist */}
          <Route
            path="/dashboard/doctor/*"
            element={
              <ProtectedRoute allowedRoles={DOCTOR_ROLES}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Patient */}
          <Route
            path="/dashboard/patient/*"
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Lab Technician */}
          <Route
            path="/dashboard/lab/*"
            element={
              <ProtectedRoute allowedRoles={['LabTechnician']}>
                <LabDashboard />
              </ProtectedRoute>
            }
          />

          {/* Pharmacist */}
          <Route
            path="/dashboard/pharmacy/*"
            element={
              <ProtectedRoute allowedRoles={['Pharmacist']}>
                <PharmacyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Catch-all → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
