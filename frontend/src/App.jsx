import { useState } from "react";
import "./App.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  // State for AI Appointment Assistant
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Admin Dashboard Metrics Data
  const metrics = [
    { title: "Total Patients", value: "1,245" },
    { title: "Daily Appointments", value: "186" },
    { title: "Revenue", value: "$52,000" },
    { title: "Active Doctors", value: "48" },
    { title: "Bed Occupancy", value: "82%" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter your appointment request.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/appointment-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setQuery(""); 
      } else {
        alert(data.message || "Failed to get suggestions.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Admin Dashboard Section */}
      <h1>Hospital Administration Dashboard</h1>
      <div className="dashboard-grid">
        {metrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <h3>{metric.title}</h3>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>

      <hr style={{ margin: "40px 0", border: "0", borderTop: "1px solid var(--border)" }} />

      {/* AI Assistant Section */}
      <h2>AI Appointment Assistant</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="Example: I need a heart specialist next week"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Finding..." : "Find Appointment"}
        </button>
      </form>

      {result && (
        <div className="summary-box">
          <h2>Suggested Department</h2>
          <p>{result.department}</p>

          <h2>Available Doctors</h2>
          <ul>
            {result.doctors?.map((doctor, index) => (
              <li key={index}>{doctor}</li>
            ))}
          </ul>

          <h2>Available Slots</h2>
          <ul>
            {result.slots?.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
