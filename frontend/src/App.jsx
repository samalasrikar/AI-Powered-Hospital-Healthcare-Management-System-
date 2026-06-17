import { useState } from "react";
import "./App.css";

function App() {
  const revenueData = {
    Daily: "₹25,000",
    Weekly: "₹1,75,000",
    Monthly: "₹7,50,000",
  };

  const [selected, setSelected] = useState("Daily");

  return (
    <div className="container">
      <h1>Revenue Analytics Dashboard</h1>

      <div className="filters">
        <button onClick={() => setSelected("Daily")}>
          Daily
        </button>

        <button onClick={() => setSelected("Weekly")}>
          Weekly
        </button>

        <button onClick={() => setSelected("Monthly")}>
          Monthly
        </button>
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
  );
}

export default App;