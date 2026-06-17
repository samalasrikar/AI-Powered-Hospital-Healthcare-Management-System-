import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="stat-card" style={{ '--accent-color': color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {sub && <span className="stat-sub">{sub}</span>}
      </div>
    </div>
  );
}

function Badge({ role }) {
  const colors = {
    Doctor: '#10b981', Nurse: '#06b6d4', Receptionist: '#8b5cf6',
    LabTechnician: '#f97316', Pharmacist: '#ec4899',
    HospitalAdmin: '#3b82f6', BillingExecutive: '#6366f1',
  };
  return (
    <span className="role-badge" style={{ background: colors[role] + '22', color: colors[role] }}>
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status === 'Active' ? 'active' : 'inactive'}`}>
      <span className="status-dot" /> {status}
    </span>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [staffError, setStaffError] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ fullName: '', email: '', password: '', role: 'Doctor' });
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchStaff = async () => {
    setStaffLoading(true);
    setStaffError('');
    try {
      const { data } = await api.get('/staff');
      setStaff(data.data?.items || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load staff.';
      const status = err.response?.status;
      setStaffError(`Error ${status ? `(${status})` : ''}: ${msg}`);
    } finally {
      setStaffLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const { data } = await api.get('/revenue-analytics');
      setAnalytics(data.data || data);
    } catch {
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchAnalytics();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setCreateSuccess('');
    try {
      await api.post('/staff', createForm);
      setCreateSuccess('Staff member created successfully!');
      setCreateForm({ fullName: '', email: '', password: '', role: 'Doctor' });
      fetchStaff();
      setTimeout(() => { setShowCreateModal(false); setCreateSuccess(''); }, 1500);
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create staff.');
    } finally {
      setCreating(false);
    }
  };

  const activeStaff = staff.filter((s) => s.status === 'Active').length;
  const inactiveStaff = staff.filter((s) => s.status !== 'Active').length;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-subtitle">Welcome back, {user?.fullName} · {user?.role}</p>
            </div>
            <button
              id="create-staff-btn"
              className="btn-primary btn-sm"
              onClick={() => setShowCreateModal(true)}
            >
              + Add Staff
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <StatCard icon="👥" label="Total Staff" value={staff.length} color="#3b82f6" sub={`${activeStaff} active`} />
            <StatCard icon="✅" label="Active" value={activeStaff} color="#10b981" />
            <StatCard icon="⚠️" label="Inactive" value={inactiveStaff} color="#f59e0b" />
            <StatCard icon="🏥" label="Departments" value="3+" color="#8b5cf6" sub="Cardiology, Neuro..." />
          </div>

          {/* Staff Table */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Staff Members</h2>
              <span className="card-badge">{staff.length} total</span>
            </div>
            {staffLoading ? (
              <div className="table-loading">
                <div className="spinner" /> Loading staff...
              </div>
            ) : staffError ? (
              <div className="error-msg">{staffError}</div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table" id="staff-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.length === 0 ? (
                      <tr><td colSpan="5" className="table-empty">No staff found. Add your first team member.</td></tr>
                    ) : staff.map((s) => (
                      <tr key={s._id}>
                        <td>
                          <div className="table-user">
                            <div className="table-avatar">{s.fullName?.charAt(0)}</div>
                            <span>{s.fullName}</span>
                          </div>
                        </td>
                        <td className="table-muted">{s.email}</td>
                        <td><Badge role={s.role} /></td>
                        <td><StatusBadge status={s.status} /></td>
                        <td className="table-muted">{new Date(s.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Analytics */}
          {!analyticsLoading && analytics && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Revenue Analytics</h2>
              </div>
              <pre className="analytics-pre">{JSON.stringify(analytics, null, 2)}</pre>
            </div>
          )}
        </main>
      </div>

      {/* Create Staff Modal */}
      {showCreateModal && (
        <div className="modal-overlay" id="create-staff-modal">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Add New Staff</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)} id="close-modal-btn">✕</button>
            </div>
            <form onSubmit={handleCreateStaff} className="auth-form">
              {createError && <div className="auth-error">{createError}</div>}
              {createSuccess && <div className="auth-success-inline">{createSuccess}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="staff-fullName">Full Name</label>
                <input id="staff-fullName" type="text" className="form-input" placeholder="Dr. Jane Doe"
                  value={createForm.fullName} onChange={(e) => setCreateForm(p => ({ ...p, fullName: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="staff-email">Email</label>
                <input id="staff-email" type="email" className="form-input" placeholder="staff@hospital.com"
                  value={createForm.email} onChange={(e) => setCreateForm(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="staff-password">Temporary Password</label>
                <input id="staff-password" type="password" className="form-input" placeholder="Min 8 chars..."
                  value={createForm.password} onChange={(e) => setCreateForm(p => ({ ...p, password: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="staff-role">Role</label>
                <select id="staff-role" className="form-input form-select"
                  value={createForm.role} onChange={(e) => setCreateForm(p => ({ ...p, role: e.target.value }))}>
                  {['Doctor','Nurse','Receptionist','LabTechnician','Pharmacist','BillingExecutive','HospitalAdmin'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <button type="submit" id="submit-create-staff-btn" className={`btn-primary ${creating ? 'loading' : ''}`} disabled={creating}>
                {creating ? <><span className="btn-spinner" /> Creating...</> : 'Create Staff Member'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
