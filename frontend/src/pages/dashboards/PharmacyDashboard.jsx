import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function ExpiryBadge({ expiryDate }) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return <span className="expiry-badge expired">⚠️ Expired</span>;
  } else if (diffDays <= 30) {
    return <span className="expiry-badge warning">⏰ {diffDays}d left</span>;
  } else {
    return <span className="expiry-badge safe">✅ {diffDays}d left</span>;
  }
}

export default function PharmacyDashboard() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchExpiry = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/expiry-tracking');
        setMedicines(data.data || []);
      } catch {
        setError('Failed to load expiry tracking data.');
      } finally {
        setLoading(false);
      }
    };
    fetchExpiry();
  }, []);

  const today = new Date();
  const filtered = medicines.filter((m) => {
    const diffDays = Math.ceil((new Date(m.expiryDate) - today) / (1000 * 60 * 60 * 24));
    if (filter === 'expired') return diffDays < 0;
    if (filter === 'critical') return diffDays >= 0 && diffDays <= 30;
    if (filter === 'safe') return diffDays > 30;
    return true;
  });

  const expired = medicines.filter((m) => Math.ceil((new Date(m.expiryDate) - today) / 86400000) < 0).length;
  const critical = medicines.filter((m) => { const d = Math.ceil((new Date(m.expiryDate) - today) / 86400000); return d >= 0 && d <= 30; }).length;
  const safe = medicines.filter((m) => Math.ceil((new Date(m.expiryDate) - today) / 86400000) > 30).length;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Pharmacy Dashboard</h1>
              <p className="page-subtitle">Welcome, {user?.fullName} · Pharmacist</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{ '--accent-color': '#ef4444' }}>
              <div className="stat-icon">⚠️</div>
              <div className="stat-body"><span className="stat-label">Expired</span><span className="stat-value">{loading ? '...' : expired}</span></div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#f59e0b' }}>
              <div className="stat-icon">⏰</div>
              <div className="stat-body"><span className="stat-label">Expiring Soon (&lt;30d)</span><span className="stat-value">{loading ? '...' : critical}</span></div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#10b981' }}>
              <div className="stat-icon">✅</div>
              <div className="stat-body"><span className="stat-label">Safe Stock</span><span className="stat-value">{loading ? '...' : safe}</span></div>
            </div>
            <div className="stat-card" style={{ '--accent-color': '#3b82f6' }}>
              <div className="stat-icon">💊</div>
              <div className="stat-body"><span className="stat-label">Total Medicines</span><span className="stat-value">{loading ? '...' : medicines.length}</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Medicine Expiry Tracking</h2>
              <div className="filter-tabs" id="expiry-filter-tabs">
                {['all', 'expired', 'critical', 'safe'].map((f) => (
                  <button
                    key={f}
                    id={`filter-${f}`}
                    className={`filter-tab ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="table-loading"><div className="spinner" /> Loading medicines...</div>
            ) : error ? (
              <div className="error-msg">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state"><span className="empty-icon">💊</span><p>No medicines match this filter.</p></div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table" id="pharmacy-expiry-table">
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Batch No.</th>
                      <th>Quantity</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m) => (
                      <tr key={m._id}>
                        <td><strong>{m.name || m.medicineName || '—'}</strong></td>
                        <td className="table-muted">{m.batchNumber || m.batch || '—'}</td>
                        <td>{m.quantity ?? '—'}</td>
                        <td>{m.expiryDate ? new Date(m.expiryDate).toLocaleDateString() : '—'}</td>
                        <td><ExpiryBadge expiryDate={m.expiryDate} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
              

          {/* Supplier Management */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Supplier Management</h2>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Supplier Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>MediCare Pharma</td>
                    <td>9876543210</td>
                    <td>contact@medicare.com</td>
                    <td>Hyderabad</td>
                  </tr>

                  <tr>
                    <td>HealthPlus Distributors</td>
                    <td>9123456780</td>
                    <td>support@healthplus.com</td>
                    <td>Bangalore</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
