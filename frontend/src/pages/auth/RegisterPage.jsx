import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!PASSWORD_REGEX.test(form.password)) {
      newErrors.password = 'Password needs 8+ chars, uppercase, lowercase, number & special character.';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await register({ fullName: form.fullName, email: form.email, password: form.password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
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

      <div className="auth-card auth-card-wide">
        <div className="auth-card-header">
          <div className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Register as a new patient</p>
        </div>

        {success ? (
          <div className="auth-success" id="register-success-msg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h3>Account Created!</h3>
            <p>Redirecting you to login...</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} id="register-form">
            {serverError && (
              <div className="auth-error" id="register-error-msg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                {serverError}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="reg-fullName">Full Name</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                <input
                  id="reg-fullName"
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Dr. John Smith"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/></svg>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/></svg>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="Min 8 chars, mixed case + symbol"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button type="button" className="input-toggle" onClick={() => setShowPassword((v) => !v)} id="reg-toggle-password">
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M22 12a10 10 0 11-20 0 10 10 0 0120 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input
                  id="reg-confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              id="register-submit-btn"
              className={`btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? <><span className="btn-spinner" /> Creating Account...</> : 'Create Account'}
            </button>
          </form>
        )}

        <div className="auth-card-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link" id="goto-login-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
