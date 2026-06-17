import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = {
  SuperAdmin: [
    { path: '/dashboard/superadmin', label: 'Overview',         icon: '📊' },
    { path: '/dashboard/superadmin', label: 'Hospitals',        icon: '🏥' },
    { path: '/dashboard/superadmin', label: 'Hospital Admins',  icon: '👤' },
    { path: '/dashboard/superadmin', label: 'All Staff',        icon: '👥' },
  ],
  Patient: [
    { path: '/dashboard/patient', label: 'My Dashboard', icon: '🏠' },
    { path: '/dashboard/patient/symptoms', label: 'Symptom Analyzer', icon: '🔬' },
    { path: '/dashboard/patient/prescriptions', label: 'Prescriptions', icon: '💊' },
    { path: '/dashboard/patient/appointments', label: 'Appointments', icon: '📅' },
  ],
  Doctor: [
    { path: '/dashboard/doctor', label: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/doctor/patients', label: 'My Patients', icon: '👥' },
    { path: '/dashboard/doctor/emr', label: 'EMR Records', icon: '📋' },
    { path: '/dashboard/doctor/lab-reports', label: 'Lab Reports', icon: '🧪' },
  ],
  HospitalAdmin: [
    { path: '/dashboard/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/admin/staff', label: 'Staff Management', icon: '👤' },
    { path: '/dashboard/admin/analytics', label: 'Analytics', icon: '📊' },
  ],
  SuperAdmin: [
    { path: '/dashboard/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/admin/staff', label: 'Staff Management', icon: '👤' },
    { path: '/dashboard/admin/analytics', label: 'Analytics', icon: '📊' },
  ],
  BillingExecutive: [
    { path: '/dashboard/admin', label: 'Dashboard', icon: '🏠' },
  ],
  LabTechnician: [
    { path: '/dashboard/lab', label: 'Lab Dashboard', icon: '🏠' },
    { path: '/dashboard/lab/workflow', label: 'Test Workflow', icon: '🔬' },
    { path: '/dashboard/lab/upload', label: 'Upload Reports', icon: '📤' },
  ],
  Pharmacist: [
    { path: '/dashboard/pharmacy', label: 'Pharmacy', icon: '🏠' },
    { path: '/dashboard/pharmacy/expiry', label: 'Expiry Tracking', icon: '⏰' },
  ],
  Nurse: [
    { path: '/dashboard/doctor', label: 'Dashboard', icon: '🏠' },
  ],
  Receptionist: [
    { path: '/dashboard/doctor', label: 'Dashboard', icon: '🏠' },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const navItems = NAV_ITEMS[user?.role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-section-label">Navigation</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === navItems[0]?.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <span>MedCore HMS</span>
          <span className="sidebar-version">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
