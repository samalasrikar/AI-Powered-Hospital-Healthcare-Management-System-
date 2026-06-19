import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Role → dashboard path mapping
const ROLE_DASHBOARD = {
  SuperAdmin: '/dashboard/superadmin',
  HospitalAdmin: '/dashboard/admin',
  Doctor: '/dashboard/doctor',
  Nurse: '/dashboard/doctor',
  Receptionist: '/dashboard/doctor',
  LabTechnician: '/dashboard/lab',
  Pharmacist: '/dashboard/pharmacy',
  BillingExecutive: '/dashboard/billing',
  Patient: '/dashboard/patient',
};

export function getDashboardByRole(role) {
  return ROLE_DASHBOARD[role] || '/dashboard/patient';
}

/**
 * Wraps a route and ensures:
 * 1. User is authenticated (else → /login)
 * 2. User has one of the `allowedRoles` (else → /unauthorized)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
