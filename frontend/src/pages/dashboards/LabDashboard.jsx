import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const STATUS_COLORS = {
  Pending: '#f59e0b',
  'In Progress': '#3b82f6',
  Completed: '#10b981',
  Cancelled: '#ef4444',
};

export default function LabDashboard() {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTestId, setUploadTestId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const fetchTests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/lab-dashboard');
      setTests(data.data || []);
    } catch {
      setError('Failed to load lab dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTests(); }, []);

  const updateStatus = async (testId, newStatus) => {
    try {
      await api.put(`/lab-workflow/${testId}`, { status: newStatus });
      fetchTests();
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTestId) return;
    setUploading(true);
    setUploadMsg('');
    const formData = new FormData();
    formData.append('report', uploadFile);
    formData.append('testId', uploadTestId);
    try {
      await api.post('/lab-report-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadMsg('Report uploaded successfully!');
      setUploadFile(null);
      setUploadTestId('');
      fetchTests();
    } catch (err) {
      setUploadMsg(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const pending = tests.filter((t) => t.status === 'Pending').length;
  const inProgress = tests.filter((t) => t.status === 'In Progress').length;
  const completed = tests.filter((t) => t.status === 'Completed').length;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Lab Dashboard</h1>
              <p className="page-subtitle">Welcome, {user?.fullName} · Lab Technician</p>
            </div>
            <button className="btn-primary btn-sm" onClick={fetchTests} id="refresh-lab-btn">↻ Refresh</button>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{ '--accent-color': '#f59e0b' }}>
              <div className="stat-icon">⏳</div>
              <div className="stat-body"><span className="stat-label">Pending</span><span className="stat-value">{loading ? '...' : pending}</span></div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#3b82f6' }}>
              <div className="stat-icon">🔬</div>
              <div className="stat-body"><span className="stat-label">In Progress</span><span className="stat-value">{loading ? '...' : inProgress}</span></div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#10b981' }}>
              <div className="stat-icon">✅</div>
              <div className="stat-body"><span className="stat-label">Completed</span><span className="stat-value">{loading ? '...' : completed}</span></div>
            </div>
          </div>

          {/* Test Queue */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Test Queue</h2>
              <span className="card-badge">{tests.length} tests</span>
            </div>
            {loading ? (
              <div className="table-loading"><div className="spinner" /> Loading...</div>
            ) : error ? (
              <div className="error-msg">{error}</div>
            ) : tests.length === 0 ? (
              <div className="empty-state"><span className="empty-icon">🧫</span><p>No tests in queue.</p></div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table" id="lab-test-table">
                  <thead><tr><th>Test Name</th><th>Patient</th><th>Ordered By</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {tests.map((t) => (
                      <tr key={t._id}>
                        <td>{t.testName || t.name || '—'}</td>
                        <td>{t.patientId?.fullName || t.patientId || '—'}</td>
                        <td>{t.orderedBy?.fullName || t.orderedBy || '—'}</td>
                        <td>
                          <span className="status-badge" style={{ background: (STATUS_COLORS[t.status] || '#64748b') + '22', color: STATUS_COLORS[t.status] || '#64748b' }}>
                            <span className="status-dot" style={{ background: STATUS_COLORS[t.status] }} /> {t.status}
                          </span>
                        </td>
                        <td>
                          {t.status !== 'Completed' && (
                            <select
                              className="form-input form-select btn-sm"
                              style={{ width: 'auto', padding: '4px 8px', fontSize: '13px' }}
                              defaultValue=""
                              id={`status-select-${t._id}`}
                              onChange={(e) => { if (e.target.value) updateStatus(t._id, e.target.value); }}
                            >
                              <option value="">Update...</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Upload Report */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📤 Upload Lab Report</h2>
            </div>
            <form onSubmit={handleUpload} className="auth-form" id="lab-upload-form">
              {uploadMsg && (
                <div className={uploadMsg.includes('success') ? 'auth-success-inline' : 'auth-error'}>{uploadMsg}</div>
              )}
              <div className="form-group">
                <label className="form-label" htmlFor="upload-test-id">Test / Lab ID</label>
                <input id="upload-test-id" type="text" className="form-input" placeholder="Enter Test ID"
                  value={uploadTestId} onChange={(e) => setUploadTestId(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="upload-file">Report File (PDF / Image)</label>
                <input id="upload-file" type="file" className="form-input"
                  accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setUploadFile(e.target.files[0])} required />
              </div>
              <button type="submit" id="upload-report-btn" className={`btn-primary ${uploading ? 'loading' : ''}`} disabled={uploading}>
                {uploading ? <><span className="btn-spinner" /> Uploading...</> : 'Upload Report'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
