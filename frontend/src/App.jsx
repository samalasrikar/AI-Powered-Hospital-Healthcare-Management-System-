import React, { useState } from "react";
import "./App.css";

function App() {
  // --- Bed Occupancy Logic (feature branch) ---
  const totalBeds = 200;
  const occupiedBeds = 164;
  const availableBeds = totalBeds - occupiedBeds;
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100);

  // --- Revenue Data Logic (develop branch) ---
  const revenueData = {
    Daily: "₹25,000",
    Weekly: "₹1,75,000",
    Monthly: "₹7,50,000",
  };

  const [selected, setSelected] = useState("Daily");

  return (
    <div className="container">
      <h1>Hospital Management Dashboard</h1>

      {/* --- Section 1: Revenue Analytics --- */}
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

      {/* --- Section 2: Bed Occupancy Reports --- */}
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
