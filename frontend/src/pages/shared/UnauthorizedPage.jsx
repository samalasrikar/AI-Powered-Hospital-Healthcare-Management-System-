import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardByRole } from '../../components/ProtectedRoute';

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
      </div>
      <div className="error-page-content">
        <div className="error-code">403</div>
        <h1 className="error-title">Access Denied</h1>
        <p className="error-description">
          You don't have permission to view this page.
          {user && ` Your current role (${user.role}) does not have access to this section.`}
        </p>
        <div className="error-actions">
          <button
            id="go-dashboard-btn"
            className="btn-primary"
            onClick={() => navigate(getDashboardByRole(user?.role))}
          >
            Go to My Dashboard
          </button>
          <button
            id="go-login-btn"
            className="btn-secondary"
            onClick={() => navigate('/login')}
          >
            Sign In as Different User
          </button>
        </div>
      </div>
    </div>
  );
}
