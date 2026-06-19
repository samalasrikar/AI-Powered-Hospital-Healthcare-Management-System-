import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card" style={{ '--accent-color': color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

export default function BillingDashboard() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Billing Dashboard</h1>
              <p className="page-subtitle">
                Revenue and payment analytics
              </p>
            </div>
          </div>

          <div className="stats-grid">
            <StatCard
              icon="💰"
              label="Daily Revenue"
              value="₹25,000"
              color="#10b981"
            />

            <StatCard
              icon="⏳"
              label="Pending Payments"
              value="12"
              color="#f59e0b"
            />

            <StatCard
              icon="✅"
              label="Paid Invoices"
              value="148"
              color="#3b82f6"
            />

            <StatCard
              icon="📈"
              label="Monthly Revenue"
              value="₹7,50,000"
              color="#8b5cf6"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Billing Summary</h2>
            </div>

            <div style={{ padding: '1rem' }}>
              <p>Total Revenue Generated This Month: ₹7,50,000</p>
              <p>Pending Collections: ₹1,20,000</p>
              <p>Invoices Paid: 148</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}