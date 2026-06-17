import "./App.css";

function App() {
  const totalBeds = 200;
  const occupiedBeds = 164;
  const availableBeds = totalBeds - occupiedBeds;
  const occupancyPercentage = Math.round(
    (occupiedBeds / totalBeds) * 100
  );

  return (
    <div className="container">
      <h1>Bed Occupancy Reports</h1>

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
  );
}

export default App;