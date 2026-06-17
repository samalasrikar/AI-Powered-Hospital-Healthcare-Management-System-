import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './SuperAdminDashboard.css';

/* ─── tiny helpers ─── */
const StatusBadge = ({ status }) => (
  <span className={`sa-badge ${status === 'Active' ? 'sa-badge--green' : 'sa-badge--gray'}`}>
    <span className="sa-dot" />{status}
  </span>
);

const RoleBadge = ({ role }) => {
  const colors = { HospitalAdmin: '#3b82f6', Doctor: '#10b981', Nurse: '#06b6d4', LabTechnician: '#f97316', Pharmacist: '#ec4899', BillingExecutive: '#6366f1', Receptionist: '#8b5cf6' };
  const c = colors[role] || '#64748b';
  return <span className="sa-role-badge" style={{ background: c + '22', color: c }}>{role}</span>;
};

/* ─── Section tabs ─── */
const TABS = [
  { id: 'overview',   label: 'Overview',           icon: '📊' },
  { id: 'hospitals',  label: 'Hospitals',           icon: '🏥' },
  { id: 'admins',     label: 'Hospital Admins',     icon: '👤' },
  { id: 'staff',      label: 'All Staff',           icon: '👥' },
];

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');

  /* ── analytics ── */
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  /* ── hospitals ── */
  const [hospitals, setHospitals] = useState([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [hospitalForm, setHospitalForm] = useState({ name: '', code: '', address: '', phone: '', email: '' });
  const [hospitalFormError, setHospitalFormError] = useState('');
  const [hospitalSaving, setHospitalSaving] = useState(false);

  /* ── admins ── */
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ fullName: '', email: '', password: '', hospitalId: '' });
  const [adminFormError, setAdminFormError] = useState('');
  const [adminSaving, setAdminSaving] = useState(false);
  const [resetModal, setResetModal] = useState(null); // admin object
  const [newPassword, setNewPassword] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  /* ── all staff ── */
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffError, setStaffError] = useState('');

  /* ─── data fetchers ─── */
  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const { data } = await api.get('/hospitals/analytics/global');
      setAnalytics(data.data);
    } catch { setAnalytics(null); }
    finally { setAnalyticsLoading(false); }
  }, []);

  const fetchHospitals = useCallback(async () => {
    setHospitalsLoading(true);
    try {
      const { data } = await api.get('/hospitals');
      setHospitals(data.data || []);
    } catch { setHospitals([]); }
    finally { setHospitalsLoading(false); }
  }, []);

  const fetchAdmins = useCallback(async () => {
    setAdminsLoading(true);
    try {
      const { data } = await api.get('/admins');
      setAdmins(data.data || []);
    } catch { setAdmins([]); }
    finally { setAdminsLoading(false); }
  }, []);

  const fetchStaff = useCallback(async () => {
    setStaffLoading(true);
    setStaffError('');
    try {
      const { data } = await api.get('/staff');
      setStaff(data.data?.items || []);
    } catch (err) {
      setStaffError(err.response?.data?.message || 'Failed to load staff.');
    } finally { setStaffLoading(false); }
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);
  useEffect(() => {
    if (tab === 'hospitals') fetchHospitals();
    if (tab === 'admins')   { fetchAdmins(); fetchHospitals(); }
    if (tab === 'staff')    fetchStaff();
  }, [tab]);

  /* ─── actions ─── */
  const createHospital = async (e) => {
    e.preventDefault();
    setHospitalSaving(true); setHospitalFormError('');
    try {
      await api.post('/hospitals', hospitalForm);
      setShowHospitalModal(false);
      setHospitalForm({ name: '', code: '', address: '', phone: '', email: '' });
      fetchHospitals(); fetchAnalytics();
    } catch (err) {
      setHospitalFormError(err.response?.data?.message || 'Failed to create hospital.');
    } finally { setHospitalSaving(false); }
  };

  const toggleHospital = async (id) => {
    try {
      await api.patch(`/hospitals/${id}/status`);
      fetchHospitals(); fetchAnalytics();
    } catch (err) { alert(err.response?.data?.message || 'Failed.'); }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    setAdminSaving(true); setAdminFormError('');
    try {
      await api.post('/admins', adminForm);
      setShowAdminModal(false);
      setAdminForm({ fullName: '', email: '', password: '', hospitalId: '' });
      fetchAdmins();
    } catch (err) {
      setAdminFormError(err.response?.data?.message || 'Failed to create admin.');
    } finally { setAdminSaving(false); }
  };

  const toggleAdmin = async (id) => {
    try { await api.patch(`/admins/${id}/status`); fetchAdmins(); }
    catch (err) { alert(err.response?.data?.message || 'Failed.'); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMsg('');
    try {
      await api.patch(`/admins/${resetModal._id}/reset-password`, { newPassword });
      setResetMsg('✅ Password reset successfully!');
      setNewPassword('');
      setTimeout(() => { setResetModal(null); setResetMsg(''); }, 1500);
    } catch (err) { setResetMsg('❌ ' + (err.response?.data?.message || 'Failed.')); }
  };

  /* ─── render helpers ─── */
  const ov = analytics?.overview;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          {/* Page header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Super Admin Console</h1>
              <p className="page-subtitle">Platform-wide control · Logged in as {user?.fullName}</p>
            </div>
            <div className="sa-tab-pills">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  className={`sa-tab-pill ${tab === t.id ? 'active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ══════════ OVERVIEW TAB ══════════ */}
          {tab === 'overview' && (
            <>
              {analyticsLoading ? (
                <div className="table-loading"><div className="spinner" /> Loading analytics...</div>
              ) : !analytics ? (
                <div className="error-msg">Failed to load analytics. Check backend connection.</div>
              ) : (
                <>
                  {/* KPI Cards */}
                  <div className="stats-grid">
                    <div className="stat-card" style={{ '--accent-color': '#3b82f6' }}>
                      <div className="stat-icon">🏥</div>
                      <div className="stat-body">
                        <span className="stat-label">Total Hospitals</span>
                        <span className="stat-value">{ov.totalHospitals}</span>
                        <span className="stat-sub">{ov.activeHospitals} active · {ov.inactiveHospitals} inactive</span>
                      </div>
                    </div>
                    <div className="stat-card" style={{ '--accent-color': '#10b981' }}>
                      <div className="stat-icon">🙍</div>
                      <div className="stat-body">
                        <span className="stat-label">Total Patients</span>
                        <span className="stat-value">{ov.totalPatients.toLocaleString()}</span>
                        <span className="stat-sub">Across all hospitals</span>
                      </div>
                    </div>
                    <div className="stat-card" style={{ '--accent-color': '#8b5cf6' }}>
                      <div className="stat-icon">👨‍⚕️</div>
                      <div className="stat-body">
                        <span className="stat-label">Total Doctors</span>
                        <span className="stat-value">{ov.totalDoctors}</span>
                        <span className="stat-sub">Active physicians</span>
                      </div>
                    </div>
                    <div className="stat-card" style={{ '--accent-color': '#f59e0b' }}>
                      <div className="stat-icon">👥</div>
                      <div className="stat-body">
                        <span className="stat-label">Total Staff</span>
                        <span className="stat-value">{ov.totalStaff}</span>
                        <span className="stat-sub">All roles combined</span>
                      </div>
                    </div>
                  </div>

                  {/* Staff by Role breakdown */}
                  {analytics.staffByRole?.length > 0 && (
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">Staff Distribution by Role</h2>
                      </div>
                      <div className="sa-role-bars">
                        {analytics.staffByRole.map((r) => {
                          const pct = Math.round((r.count / ov.totalStaff) * 100);
                          return (
                            <div className="sa-role-bar-row" key={r._id}>
                              <span className="sa-role-bar-label">{r._id}</span>
                              <div className="sa-role-bar-track">
                                <div className="sa-role-bar-fill" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="sa-role-bar-count">{r.count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Hospital Performance Ranking */}
                  {analytics.hospitalPerformance?.length > 0 && (
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">🏆 Hospital Performance Ranking</h2>
                        <span className="card-badge">by staff count</span>
                      </div>
                      <div className="table-wrapper">
                        <table className="data-table" id="hospital-ranking-table">
                          <thead>
                            <tr><th>Rank</th><th>Hospital</th><th>Status</th><th>Staff Count</th></tr>
                          </thead>
                          <tbody>
                            {analytics.hospitalPerformance.map((h, i) => (
                              <tr key={h._id}>
                                <td>
                                  <span className={`sa-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>
                                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                                  </span>
                                </td>
                                <td><strong>{h.hospitalName || 'Unassigned'}</strong></td>
                                <td><StatusBadge status={h.hospitalStatus || 'Active'} /></td>
                                <td>
                                  <div className="sa-mini-bar-wrap">
                                    <div className="sa-mini-bar" style={{ width: `${Math.round((h.staffCount / (analytics.hospitalPerformance[0]?.staffCount || 1)) * 100)}%` }} />
                                    <span>{h.staffCount}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ══════════ HOSPITALS TAB ══════════ */}
          {tab === 'hospitals' && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">All Hospitals</h2>
                <button id="add-hospital-btn" className="btn-primary btn-sm" onClick={() => setShowHospitalModal(true)}>
                  + New Hospital
                </button>
              </div>
              {hospitalsLoading ? (
                <div className="table-loading"><div className="spinner" /> Loading...</div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table" id="hospitals-table">
                    <thead>
                      <tr><th>Name</th><th>Code</th><th>Email</th><th>Phone</th><th>Staff</th><th>Admins</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {hospitals.length === 0 ? (
                        <tr><td colSpan="8" className="table-empty">No hospitals yet. Create your first one.</td></tr>
                      ) : hospitals.map((h) => (
                        <tr key={h._id}>
                          <td><strong>{h.name}</strong><div className="table-muted" style={{ fontSize: 12 }}>{h.address}</div></td>
                          <td><span className="sa-code-badge">{h.code}</span></td>
                          <td className="table-muted">{h.email}</td>
                          <td className="table-muted">{h.phone}</td>
                          <td>{h.staffCount ?? 0}</td>
                          <td>{h.adminCount ?? 0}</td>
                          <td><StatusBadge status={h.status} /></td>
                          <td>
                            <button
                              id={`toggle-hospital-${h._id}`}
                              className={`sa-action-btn ${h.status === 'Active' ? 'danger' : 'success'}`}
                              onClick={() => toggleHospital(h._id)}
                            >
                              {h.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════ ADMINS TAB ══════════ */}
          {tab === 'admins' && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Hospital Admins</h2>
                <button id="add-admin-btn" className="btn-primary btn-sm" onClick={() => setShowAdminModal(true)}>
                  + Create Admin
                </button>
              </div>
              {adminsLoading ? (
                <div className="table-loading"><div className="spinner" /> Loading...</div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table" id="admins-table">
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Hospital</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {admins.length === 0 ? (
                        <tr><td colSpan="5" className="table-empty">No hospital admins found.</td></tr>
                      ) : admins.map((a) => (
                        <tr key={a._id}>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">{a.fullName?.charAt(0)}</div>
                              <span>{a.fullName}</span>
                            </div>
                          </td>
                          <td className="table-muted">{a.email}</td>
                          <td>
                            {a.hospitalId ? (
                              <span className="sa-hospital-chip">
                                🏥 {a.hospitalId?.name || '—'}
                                {a.hospitalId?.status === 'Inactive' && <span className="sa-chip-inactive"> (Inactive)</span>}
                              </span>
                            ) : <span className="table-muted">Unassigned</span>}
                          </td>
                          <td><StatusBadge status={a.status} /></td>
                          <td>
                            <div className="sa-actions-row">
                              <button
                                id={`toggle-admin-${a._id}`}
                                className={`sa-action-btn ${a.status === 'Active' ? 'danger' : 'success'}`}
                                onClick={() => toggleAdmin(a._id)}
                              >
                                {a.status === 'Active' ? 'Disable' : 'Enable'}
                              </button>
                              <button
                                id={`reset-pw-${a._id}`}
                                className="sa-action-btn info"
                                onClick={() => { setResetModal(a); setNewPassword(''); setResetMsg(''); }}
                              >
                                Reset PW
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════ ALL STAFF TAB ══════════ */}
          {tab === 'staff' && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">All Platform Staff</h2>
                <span className="card-badge">{staff.length} total</span>
              </div>
              {staffLoading ? (
                <div className="table-loading"><div className="spinner" /> Loading...</div>
              ) : staffError ? (
                <div className="error-msg">{staffError}</div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table" id="all-staff-table">
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Role</th><th>Hospital</th><th>Status</th><th>Joined</th></tr>
                    </thead>
                    <tbody>
                      {staff.length === 0 ? (
                        <tr><td colSpan="6" className="table-empty">No staff found.</td></tr>
                      ) : staff.map((s) => (
                        <tr key={s._id}>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">{s.fullName?.charAt(0)}</div>
                              <span>{s.fullName}</span>
                            </div>
                          </td>
                          <td className="table-muted">{s.email}</td>
                          <td><RoleBadge role={s.role} /></td>
                          <td className="table-muted">{s.hospitalId?.name || s.hospitalId || '—'}</td>
                          <td><StatusBadge status={s.status} /></td>
                          <td className="table-muted">{new Date(s.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ══ CREATE HOSPITAL MODAL ══ */}
      {showHospitalModal && (
        <div className="modal-overlay" id="create-hospital-modal">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">🏥 New Hospital</h2>
              <button className="modal-close" onClick={() => setShowHospitalModal(false)}>✕</button>
            </div>
            <form onSubmit={createHospital} className="auth-form" style={{ padding: 24 }}>
              {hospitalFormError && <div className="auth-error">{hospitalFormError}</div>}
              {[
                { id: 'h-name',    key: 'name',    label: 'Hospital Name',  placeholder: 'Apollo Hospitals Delhi' },
                { id: 'h-code',    key: 'code',    label: 'Hospital Code',  placeholder: 'APL-DEL' },
                { id: 'h-address', key: 'address', label: 'Address',        placeholder: 'Sarita Vihar, New Delhi' },
                { id: 'h-phone',   key: 'phone',   label: 'Phone',          placeholder: '+91 9999999999' },
                { id: 'h-email',   key: 'email',   label: 'Email',          placeholder: 'admin@apollo.com' },
              ].map(({ id, key, label, placeholder }) => (
                <div className="form-group" key={key}>
                  <label className="form-label" htmlFor={id}>{label}</label>
                  <input id={id} type={key === 'email' ? 'email' : 'text'} className="form-input" style={{ paddingLeft: 14 }}
                    placeholder={placeholder} value={hospitalForm[key]}
                    onChange={(e) => setHospitalForm(p => ({ ...p, [key]: e.target.value }))} required />
                </div>
              ))}
              <button type="submit" id="submit-hospital-btn" className={`btn-primary ${hospitalSaving ? 'loading' : ''}`} disabled={hospitalSaving}>
                {hospitalSaving ? <><span className="btn-spinner" /> Creating...</> : 'Create Hospital'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══ CREATE ADMIN MODAL ══ */}
      {showAdminModal && (
        <div className="modal-overlay" id="create-admin-modal">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">👤 Create Hospital Admin</h2>
              <button className="modal-close" onClick={() => setShowAdminModal(false)}>✕</button>
            </div>
            <form onSubmit={createAdmin} className="auth-form" style={{ padding: 24 }}>
              {adminFormError && <div className="auth-error">{adminFormError}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="a-name">Full Name</label>
                <input id="a-name" type="text" className="form-input" style={{ paddingLeft: 14 }} placeholder="Dr. Ravi Kumar"
                  value={adminForm.fullName} onChange={(e) => setAdminForm(p => ({ ...p, fullName: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="a-email">Email</label>
                <input id="a-email" type="email" className="form-input" style={{ paddingLeft: 14 }} placeholder="ravi@hospital.com"
                  value={adminForm.email} onChange={(e) => setAdminForm(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="a-password">Temporary Password</label>
                <input id="a-password" type="password" className="form-input" style={{ paddingLeft: 14 }} placeholder="Min 8 chars..."
                  value={adminForm.password} onChange={(e) => setAdminForm(p => ({ ...p, password: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="a-hospital">Assign to Hospital</label>
                <select id="a-hospital" className="form-input form-select"
                  value={adminForm.hospitalId} onChange={(e) => setAdminForm(p => ({ ...p, hospitalId: e.target.value }))} required>
                  <option value="">Select hospital...</option>
                  {hospitals.filter(h => h.status === 'Active').map(h => (
                    <option key={h._id} value={h._id}>{h.name} ({h.code})</option>
                  ))}
                </select>
              </div>
              <button type="submit" id="submit-admin-btn" className={`btn-primary ${adminSaving ? 'loading' : ''}`} disabled={adminSaving}>
                {adminSaving ? <><span className="btn-spinner" /> Creating...</> : 'Create Admin'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══ RESET PASSWORD MODAL ══ */}
      {resetModal && (
        <div className="modal-overlay" id="reset-password-modal">
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h2 className="modal-title">🔑 Reset Password</h2>
              <button className="modal-close" onClick={() => setResetModal(null)}>✕</button>
            </div>
            <form onSubmit={handleResetPassword} className="auth-form" style={{ padding: 24 }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
                Resetting password for <strong style={{ color: 'var(--text-primary)' }}>{resetModal.fullName}</strong>
              </p>
              {resetMsg && <div className={resetMsg.startsWith('✅') ? 'auth-success-inline' : 'auth-error'}>{resetMsg}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="new-password">New Password</label>
                <input id="new-password" type="password" className="form-input" style={{ paddingLeft: 14 }}
                  placeholder="Min 8 characters" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
              </div>
              <button type="submit" id="submit-reset-btn" className="btn-primary">Reset Password</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
