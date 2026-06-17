import "./App.css";

function App() {
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

  return (
    <div className="container">
      <h1>Department Performance Reports</h1>

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

      <div className="chart-box">
        <h2>Department Comparison</h2>

        <div className="bar cardiology">Cardiology</div>
        <div className="bar neurology">Neurology</div>
        <div className="bar ortho">Orthopedics</div>
      </div>
    </div>
  );
}

export default App;