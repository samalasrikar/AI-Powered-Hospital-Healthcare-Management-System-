import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getDashboardByRole } from './ProtectedRoute';

const ROLE_LABELS = {
  SuperAdmin: 'Super Admin',
  HospitalAdmin: 'Hospital Admin',
  Doctor: 'Doctor',
  Nurse: 'Nurse',
  Receptionist: 'Receptionist',
  LabTechnician: 'Lab Technician',
  Pharmacist: 'Pharmacist',
  BillingExecutive: 'Billing Executive',
  Patient: 'Patient',
};

const ROLE_COLORS = {
  SuperAdmin: '#f59e0b',
  HospitalAdmin: '#3b82f6',
  Doctor: '#10b981',
  Nurse: '#06b6d4',
  Receptionist: '#8b5cf6',
  LabTechnician: '#f97316',
  Pharmacist: '#ec4899',
  BillingExecutive: '#6366f1',
  Patient: '#64748b',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleColor = ROLE_COLORS[user?.role] || '#64748b';
  const roleLabel = ROLE_LABELS[user?.role] || user?.role;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="navbar-title">MedCore HMS</span>
        </div>
      </div>

      <div className="navbar-center">
        <span className="navbar-subtitle">AI-Powered Hospital Management</span>
      </div>

      <div className="navbar-right">
        {user && (
          <div className="navbar-user" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="user-avatar" style={{ background: roleColor }}>
              {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user.fullName}</span>
              <span className="user-role" style={{ color: roleColor }}>{roleLabel}</span>
            </div>
            <svg className={`dropdown-arrow ${showDropdown ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link
                  to={getDashboardByRole(user.role)}
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
                  Dashboard
                </Link>
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
