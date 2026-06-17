import "./App.css";

function App() {
  const metrics = [
    { title: "Total Patients", value: "1,245" },
    { title: "Daily Appointments", value: "186" },
    { title: "Revenue", value: "$52,000" },
    { title: "Active Doctors", value: "48" },
    { title: "Bed Occupancy", value: "82%" },
  ];

  return (
    <div className="container">
      <h1>Hospital Administration Dashboard</h1>

      <div className="dashboard-grid">
        {metrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <h3>{metric.title}</h3>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;