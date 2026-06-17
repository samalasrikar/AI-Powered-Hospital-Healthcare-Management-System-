import React, { useState } from "react";
import "./App.css";

function App() {
  // --- 1. Department Performance Data ---
  const departments = [
    {
      name: "Cardiology",
      patients: 320,
      revenue: "₹8,50,000",
      waitTime: "15 min",
    },
    {
      name: "Neurology",
      patients: 240,
      revenue: "₹6,20,000",
      waitTime: "20 min",
    },
    {
      name: "Orthopedics",
      patients: 280,
      revenue: "₹7,10,000",
      waitTime: "12 min",
    },
  ];

  // --- 2. Bed Occupancy Logic ---
  const totalBeds = 200;
  const occupiedBeds = 164;
  const availableBeds = totalBeds - occupiedBeds;
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100);

  // --- 3. Revenue Data Logic ---
  const revenueData = {
    Daily: "₹25,000",
    Weekly: "₹1,75,000",
    Monthly: "₹7,50,000",
  };

  const [selected, setSelected] = useState("Daily");

  // --- 4. Report Export Action Handlers (feature branch) ---
  const exportPDF = () => {
    alert("PDF Report Downloaded");
  };

  const exportExcel = () => {
    alert("Excel Report Downloaded");
  };

  return (
    <div className="container">
      <h1>Hospital Management Dashboard</h1>

      {/* --- Section 1: Report Export System --- */}
      <div className="section-block export-container-center" style={{ marginBottom: "50px" }}>
        <div className="report-card">
          <h2>Hospital Analytics Export Utility</h2>
          <p><strong>Total Active Departments:</strong> {departments.length}</p>
          <p><strong>Current Selected Revenue Track:</strong> {revenueData[selected]} ({selected})</p>
          <p><strong>Live Bed Occupancy Rate:</strong> {occupancyPercentage}%</p>
          
          <div className="button-group">
            <button className="btn-export" onClick={exportPDF}>
              Export PDF
            </button>
            <button className="btn-export" onClick={exportExcel}>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "40px 0" }} />

      {/* --- Section 2: Department Performance Reports --- */}
      <div className="section-block" style={{ marginBottom: "50px" }}>
        <h2>Department Performance Reports</h2>
        <div className="department-grid">
          {departments.map((dept, index) => (
            <div className="department-card" key={index}>
              <h2>{dept.name}</h2>
              <p>Patient Volume: {dept.patients}</p>
              <p>Revenue: {dept.revenue}</p>
              <p>Average Wait Time: {dept.waitTime}</p>
            </div>
          ))}
        </div>

        <div className="department-chart-box">
          <h2>Department Comparison</h2>
          <div className="dept-bar cardiology">Cardiology</div>
          <div className="dept-bar neurology">Neurology</div>
          <div className="dept-bar ortho">Orthopedics</div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "40px 0" }} />

      {/* --- Section 3: Revenue Analytics --- */}
      <div className="section-block" style={{ marginBottom: "50px" }}>
        <h2>Revenue Analytics Dashboard</h2>
        <div className="filters">
          <button onClick={() => setSelected("Daily")}>Daily</button>
          <button onClick={() => setSelected("Weekly")}>Weekly</button>
          <button onClick={() => setSelected("Monthly")}>Monthly</button>
        </div>

        <div className="revenue-card">
          <h2>{selected} Revenue</h2>
          <p>{revenueData[selected]}</p>
        </div>

        <div className="chart-box">
          <h2>Revenue Chart</h2>
          <div className="bar daily"></div>
          <div className="bar weekly"></div>
          <div className="bar monthly"></div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "40px 0" }} />

      {/* --- Section 4: Bed Occupancy Reports --- */}
      <div className="section-block">
        <h2>Bed Occupancy Reports</h2>
        <div className="cards">
          <div className="card">
            <h3>Available Beds</h3>
            <p>{availableBeds}</p>
          </div>

          <div className="card">
            <h3>Occupied Beds</h3>
            <p>{occupiedBeds}</p>
          </div>

          <div className="card">
            <h3>Occupancy Percentage</h3>
            <p>{occupancyPercentage}%</p>
          </div>
        </div>

        <div className="report-box">
          <h2>Occupancy Overview</h2>
          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${occupancyPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
