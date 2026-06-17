import "./App.css";

function App() {
  const insights = [
    {
      title: "Highest Patient Load",
      value: "Cardiology",
    },
    {
      title: "Peak Appointment Hours",
      value: "10 AM - 1 PM",
    },
    {
      title: "Revenue Trend",
      value: "-12% This Month",
    },
  ];

  const recommendations = [
    "Increase staffing during peak appointment hours.",
    "Promote preventive care programs.",
    "Optimize scheduling in Cardiology department.",
  ];

  return (
    <div className="container">
      <h1>AI Insights Dashboard</h1>

      <div className="cards">
        {insights.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="trend-box">
        <h2>Trend Analysis</h2>
        <p>
          Patient visits increased during morning
          hours while revenue showed a slight
          decrease compared to last month.
        </p>
      </div>

      <div className="recommendation-box">
        <h2>AI Recommendations</h2>

        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;