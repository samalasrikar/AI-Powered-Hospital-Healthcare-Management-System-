import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [emrList, setEmrList] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [emrLoading, setEmrLoading] = useState(true);
  const [labLoading, setLabLoading] = useState(true);

  // AI Summarizer
  const [patientIdInput, setPatientIdInput] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  useEffect(() => {
    const fetchEmr = async () => {
      setEmrLoading(true);
      try {
        const { data } = await api.get('/emr-viewer');
        setEmrList(data.data || []);
      } catch { setEmrList([]); }
      finally { setEmrLoading(false); }
    };
    const fetchLab = async () => {
      setLabLoading(true);
      try {
        const { data } = await api.get('/lab-reports');
        setLabReports(data.data || []);
      } catch { setLabReports([]); }
      finally { setLabLoading(false); }
    };
    fetchEmr();
    fetchLab();
  }, []);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!patientIdInput.trim()) return;
    setSummaryLoading(true);
    setSummaryError('');
    setSummary('');
    try {
      const { data } = await api.post('/emr-summarizer', { patientId: patientIdInput.trim() });
      setSummary(data.data?.summary || data.summary || JSON.stringify(data));
    } catch (err) {
      setSummaryError(err.response?.data?.message || 'Summarizer failed. Check patient ID.');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Doctor Dashboard</h1>
              <p className="page-subtitle">Welcome, {user?.fullName}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{ '--accent-color': '#10b981' }}>
              <div className="stat-icon">📋</div>
              <div className="stat-body">
                <span className="stat-label">EMR Records</span>
                <span className="stat-value">{emrLoading ? '...' : emrList.length}</span>
              </div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#3b82f6' }}>
              <div className="stat-icon">🧪</div>
              <div className="stat-body">
                <span className="stat-label">Lab Reports</span>
                <span className="stat-value">{labLoading ? '...' : labReports.length}</span>
              </div>
            </div>
          </div>

          {/* AI EMR Summarizer */}
          <div className="card ai-card">
            <div className="card-header">
              <h2 className="card-title">🤖 AI Medical Record Summarizer</h2>
              <span className="ai-badge">Powered by AI</span>
            </div>
            <p className="card-description">
              Enter a patient ID to generate a concise AI summary of their full medical history, active conditions, allergies, and past surgeries.
            </p>
            <form onSubmit={handleSummarize} className="ai-form" id="emr-summarizer-form">
              <div className="ai-input-row">
                <input
                  id="patient-id-input"
                  type="text"
                  className="form-input"
                  placeholder="Enter Patient ID..."
                  value={patientIdInput}
                  onChange={(e) => setPatientIdInput(e.target.value)}
                />
                <button
                  type="submit"
                  id="summarize-btn"
                  className={`btn-primary ${summaryLoading ? 'loading' : ''}`}
                  disabled={summaryLoading}
                >
                  {summaryLoading ? <><span className="btn-spinner" /> Analyzing...</> : 'Summarize'}
                </button>
              </div>
            </form>
            {summaryError && <div className="auth-error">{summaryError}</div>}
            {summary && (
              <div className="ai-result" id="emr-summary-result">
                <div className="ai-result-header">
                  <span>📊 AI Summary</span>
                </div>
                <p className="ai-result-text">{summary}</p>
              </div>
            )}
          </div>

          {/* EMR Records */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Electronic Medical Records</h2>
              <span className="card-badge">{emrList.length} records</span>
            </div>
            {emrLoading ? (
              <div className="table-loading"><div className="spinner" /> Loading...</div>
            ) : emrList.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>No EMR records found.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table" id="emr-table">
                  <thead><tr><th>Patient</th><th>Type</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {emrList.map((r) => (
                      <tr key={r._id}>
                        <td>{r.patientId?.fullName || r.patientId || '—'}</td>
                        <td>{r.documentType || r.type || '—'}</td>
                        <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td><span className="status-badge active"><span className="status-dot" /> Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Lab Reports */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Lab Reports</h2>
              <span className="card-badge">{labReports.length} reports</span>
            </div>
            {labLoading ? (
              <div className="table-loading"><div className="spinner" /> Loading...</div>
            ) : labReports.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🧪</span>
                <p>No lab reports available.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table" id="lab-reports-table">
                  <thead><tr><th>Test</th><th>Patient</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {labReports.map((r) => (
                      <tr key={r._id}>
                        <td>{r.testName || r.name || '—'}</td>
                        <td>{r.patientId?.fullName || r.patientId || '—'}</td>
                        <td><span className={`status-badge ${r.status === 'Completed' ? 'active' : 'inactive'}`}><span className="status-dot" />{r.status || '—'}</span></td>
                        <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
