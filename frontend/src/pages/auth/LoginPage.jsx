import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardByRole } from '../../components/ProtectedRoute';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const user = await login(form);
      navigate(getDashboardByRole(user.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
      </div>

      <div className="auth-card">
        <div className="auth-card-header">
          <div className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="auth-title">MedCore HMS</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} id="login-form">
          {error && (
            <div className="auth-error" id="login-error-msg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/></svg>
              <input
                id="login-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@hospital.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/></svg>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
                id="toggle-password-btn"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            className={`btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <><span className="btn-spinner" /> Signing in...</>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="auth-card-footer">
          <p>
            New patient?{' '}
            <Link to="/register" className="auth-link" id="goto-register-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
